import {
    SourceStateManager,
} from "paperback-extensions-common";
// 
// COPYMANGA API STATE METHODS
//

const DEFAULT_COPYMANGA_SERVER_DOMAIN = 'copymanga.site'

export async function getCopymangaDomain(stateManager: SourceStateManager): Promise<string> {
    return (await stateManager.retrieve('copymangaDomain') as string | undefined) ?? DEFAULT_COPYMANGA_SERVER_DOMAIN
}

export async function getCopymangaWebsite(stateManager: SourceStateManager): Promise<string> {
    return `https://${await getCopymangaDomain(stateManager)}`
}

export async function getCopymangaAPI(stateManager: SourceStateManager): Promise<string> {
    return `https://api.${await getCopymangaDomain(stateManager)}`
}

// Number of items requested for paged requests
const PAGE_SIZE = 30;

export function getPageSize(stateManager: SourceStateManager): number {
    return PAGE_SIZE
}

const DEFAULT_IMAGE_QUALITY = 'c800x'
const BEST_IMAGE_QUALITY = 'c1500x'

export function convertImageQuality(url: string, mode: string): string {
    return url.replace(DEFAULT_IMAGE_QUALITY, mode);
}

export function getImageQuality(): string {
    return BEST_IMAGE_QUALITY
}

export function trimCoverLimit(url: string): string {
    const limitType = url.split('.').slice(-2).join('.');
    return url.replace(`.${limitType}`, '');
}

export async function setStateData(stateManager: SourceStateManager, data: Record<string, any>) {
    await setKomgaServerAddress(
        stateManager,
        data['copymangaDomain'] ?? DEFAULT_COPYMANGA_SERVER_DOMAIN
    )
}

async function setKomgaServerAddress(stateManager: SourceStateManager, domain: string) {
    await stateManager.store('copymangaDomain', domain)
}

// HOME SECTION

export const homeSections = {
    'recComics': '漫畫推薦',
    'rankDayComics': '上升最快',
    'rankWeekComics': '近七天',
    'rankMonthComics': '近三十天',
}