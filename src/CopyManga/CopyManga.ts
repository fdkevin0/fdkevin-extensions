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

import { 
    convertImageQuality,
    getCopymangaAPI,
    getImageQuality,
    getPageSize,
    homeSections,
    trimCoverLimit,
} from './Common';

export const CopyMangaInfo: SourceInfo = {
    version: '0.0.1',
    name: 'CopyManga',
    description: 'Extension that pulls manga from copymanga.com',
    author: 'FDKevin',
    authorWebsite: 'http://github.com/fdkevin0',
    icon: 'icon.png',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: "https://copymanga.com",
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
    stateManager: SourceStateManager = createSourceStateManager({})

    requestManager = createRequestManager({
        requestsPerSecond: 5,
        requestTimeout: 80000,
    })

    RETRY = 5

    override async getSourceMenu(): Promise<Section> {
        return Promise.resolve(createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => [

            ]
        }))
    }

    async getMangaDetails(mangaId: string): Promise<Manga> {
        const copymangaAPI = await getCopymangaAPI(this.stateManager);

        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/comic2/${mangaId}`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
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
        const copymangaAPI = await getCopymangaAPI(this.stateManager);

        const mangaDetailrequest = createRequestObject({
            url: `${copymangaAPI}/api/v3/comic2/${mangaId}`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
        })

        const mangaDetailresponse = await this.requestManager.schedule(mangaDetailrequest, this.RETRY)
        const mangaDetailjsonData = JSON.parse(mangaDetailresponse.data)

        const chapters: Chapter[] = []

        for (const [, groupItem] of Object.entries(mangaDetailjsonData.results.groups)) {
            const groupData: any = groupItem
            const groupId: string = groupData.path_word 
            const request = createRequestObject({
                url: `${copymangaAPI}/api/v3/comic/${mangaId}/group/${groupId}/chapters?limit=500&offset=0`,
                method: 'GET',
                headers: {
                    'platform': '3'
                }
            })
    
            const response = await this.requestManager.schedule(request, this.RETRY)
            const jsonData = JSON.parse(response.data)
    
            for (const item of jsonData.results.list) {
                chapters.push(
                    createChapter({
                        id: item.uuid,
                        mangaId: mangaId,
                        name: item.name,
                        chapNum: Number(item.index +1 ?? '-1'),
                        time: new Date(item.datetime_created),
                        langCode: LanguageCode.CHINEESE,
                        group: groupData.name,
                    })
                )
            }
        }

        return chapters
    }

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const copymangaAPI = await getCopymangaAPI(this.stateManager);

        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/comic/${mangaId}/chapter2/${chapterId}?platform=3`,
            method: 'GET',
            headers: {
                'platform': '3',
                'webp': '1'
            }
        })

        const response = await this.requestManager.schedule(request, this.RETRY)
        const jsonData = JSON.parse(response.data)

        const pages: string[] = []

        for (var page = 0; page < jsonData.results.chapter.size; page++) {
            for (var i = 0; i < jsonData.results.chapter.words.length; i++) {
                if (jsonData.results.chapter.words[i] === page) {
                    pages.push(convertImageQuality(jsonData.results.chapter.contents[i].url, getImageQuality()))
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
        const copymangaAPI = await getCopymangaAPI(this.stateManager);
        const page: number = metadata?.page ?? 0;
        const pageSize: number = getPageSize(this.stateManager);
        const offset: number = page * pageSize;
        const keyword: string = encodeURI(query.title ?? '');

        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/search/comic?format=json&platform=3&limit=${pageSize}&offset=${offset}&q=${keyword}`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
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
        const copymangaAPI = await getCopymangaAPI(this.stateManager);

        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/h5/homeIndex?platform=3`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
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
        
        for (const [keyword, nameStr] of Object.entries(homeSections)) {
            const mangaTiles: MangaTile[] = []
            for (const item of jsonData.results[keyword].list) {
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
                    id: keyword,
                    title: nameStr,
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
