import {
    Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    HomeSectionType,
    Manga,
    MangaStatus,
    MangaTile,
    LanguageCode,
    PagedResults,
    SearchRequest,
    Section,
    Source,
    SourceInfo,
    SourceStateManager,
    TagType,
    Tag,
} from 'paperback-extensions-common'

const COPYMANGA_DOMAIN = 'https://copymanga.site/'
const COPYMANGA_API_DOMAIN = 'https://api.copymanga.site'
// Number of items requested for paged requests
const PAGE_SIZE = 30;

export const CopyMangaInfo: SourceInfo = {
    version: '0.0.1',
    name: 'CopyManga',
    description: 'Extension that pulls manga from copymanga.com',
    author: 'FDKevin',
    authorWebsite: 'http://github.com/fdkevin0',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: COPYMANGA_DOMAIN,
    sourceTags: [
        {
            text: 'Chinese',
            type: TagType.GREY,
        },
        {
            text: 'Experimental',
            type: TagType.YELLOW,
        },
    ],
}

export class CopyManga extends Source {
    requestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 80000,
    })

    RETRY = 5
    stateManager: SourceStateManager = createSourceStateManager({})

    override getMangaShareUrl(mangaId: string): string {
        return `${COPYMANGA_DOMAIN}/comic/${mangaId}`
    }

    override async getSourceMenu(): Promise<Section> {
        return Promise.resolve(createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => []
        }))
    }

    async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = createRequestObject({
            url: `${COPYMANGA_API_DOMAIN}/api/v3/comic2/${mangaId}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, this.RETRY)
        const jsonData = JSON.parse(response.data)

        let status = MangaStatus.UNKNOWN

        const arrayTags: Tag[] = []
        for (const item of jsonData.results.comic.theme) {
            arrayTags.push(
                createTag({
                    id: item.path_word,
                    label: item.name,
                })
            )
        }

        const trimedCover = trimCoverLimit(jsonData.results.comic.cover)
        console.log(trimedCover)
        return createManga({
            id: mangaId,
            titles: String(jsonData.results.comic.name).split(','),
            image: trimedCover,
            author: jsonData.results.comic.author.name,
            status: status,
            langFlag: LanguageCode.CHINEESE,
            lastUpdate: new Date(jsonData.results.comic.datetime_updated),
            views: jsonData.results.comic.popular,
            desc: jsonData.results.comic.brief,
            // tags: [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })]
        })
    }

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = createRequestObject({
            url: `${COPYMANGA_API_DOMAIN}/api/v3/comic/${mangaId}/group/default/chapters?limit=500&offset=0`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, this.RETRY)
        const jsonData = JSON.parse(response.data)

        const chapters: Chapter[] = []
        for (const item of jsonData.results.list) {
            chapters.push(
                createChapter({
                    id: item.uuid,
                    mangaId: mangaId,
                    name: item.name,
                    chapNum: Number(item.index +1 ?? '-1'),
                    time: new Date(item.datetime_created),
                    langCode: LanguageCode.CHINEESE,
                })
            )
        }
        return chapters
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${COPYMANGA_API_DOMAIN}/api/v3/comic/${mangaId}/chapter2/${chapterId}?platform=3`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, this.RETRY)
        const jsonData = JSON.parse(response.data)

        const pages: string[] = []

        for (var page = 0; page < jsonData.results.chapter.size; page++) {
            for (var i = 0; i < jsonData.results.chapter.words.length; i++) {
                if (jsonData.results.chapter.words[i] === page) {
                    pages.push(convertToImageMode(jsonData.results.chapter.contents[i].url, 'c1500x'))
                }
            }
        }
        
        return createChapterDetails({
            id: chapterId,
            mangaId,
            pages,
            longStrip: jsonData.results.chapter.is_long ?? false,
        })
    }

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 0;

        const request = createRequestObject({
            url: `${COPYMANGA_API_DOMAIN}/api/v3/search/comic?format=json&platform=3&limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}&q=${(query.title ?? '')}`,
            method: 'GET',
        })

        const response = await this.requestManager.schedule(request, this.RETRY)
        const jsonData = JSON.parse(response.data)
        console.log(jsonData)

        const mangaTiles: MangaTile[] = []
        for (const item of jsonData.results.list) {
            mangaTiles.push(
                createMangaTile({
                    id: item.path_word,
                    title: createIconText({text: item.name}),
                    image: item.cover,
                })
            )
        }

        // If no series were returned we are on the last page
        metadata = mangaTiles.length === 0 ? undefined : { page: page + 1 };

        return createPagedResults({
            results: mangaTiles,
            metadata,
        })
    }

    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const request = createRequestObject({
            url: `${COPYMANGA_API_DOMAIN}/api/v3/h5/homeIndex?platform=3`,
            method: 'GET',
        })
        const response = await this.requestManager.schedule(request, this.RETRY)
        const jsonData = JSON.parse(response.data)

        const sections: HomeSection[] = [];

        const bannerTiles: MangaTile[] = []
        for (const item of jsonData.results.banners) {
            if (item.type === 1) {
                bannerTiles.push(
                    createMangaTile({
                        id: item.comic.path_word,
                        title: createIconText({ text: item.brief }),
                        image: item.cover,
                    })
                )
            }
        }
        sections.push(
            createHomeSection({
                id: 'banner',
                title: 'Banner',
                items: bannerTiles,
                type: HomeSectionType.featured,
                view_more: false,
            })
        )

        const HomeSectionKeys = ['recComics', 'rankDayComics', 'rankWeekComics', 'rankMonthComics']
        for (const key of HomeSectionKeys) {
            const mangaTiles: MangaTile[] = []
            for (const item of jsonData.results[key].list) {
                mangaTiles.push(
                    createMangaTile({
                        id: item.comic.path_word,
                        title: createIconText({ text: item.comic.name }),
                        image: item.comic.cover,
                    })
                )
            }
            sections.push(
                createHomeSection({
                    id: key,
                    title: key,
                    items: mangaTiles,
                    view_more: false,
                })
            )
        }

        for (const section of sections) {
            sectionCallback(section);
        }
    }
}

export function convertToImageMode(url: string, mode: string): string {
    return url.replace('c800x', mode);
}

export function trimCoverLimit(url: string): string {
    const limitType = url.split('.').slice(-2).join('.');
    return url.replace(`.${limitType}`,'');
}