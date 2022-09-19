(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":1,"./Tracker":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);

},{"./base":3,"./models":47}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],6:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],7:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],8:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],9:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],10:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],11:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],14:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],15:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],16:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],17:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],20:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],23:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":8,"./Form":9,"./FormRow":10,"./Header":11,"./InputField":12,"./Label":13,"./Link":14,"./MultilineLabel":15,"./NavigationButton":16,"./OAuthButton":17,"./Section":18,"./Select":19,"./Stepper":20,"./Switch":21,"./WebViewButton":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],27:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],28:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],30:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],31:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],32:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],33:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],34:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],35:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],36:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],37:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],41:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],44:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],45:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],46:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);
__exportStar(require("./SearchFilter"), exports);

},{"./Chapter":5,"./ChapterDetails":6,"./Constants":7,"./DynamicUI":23,"./HomeSection":24,"./Languages":25,"./Manga":26,"./MangaTile":27,"./MangaUpdate":28,"./PagedResults":29,"./RawData":30,"./RequestHeaders":31,"./RequestInterceptor":32,"./RequestManager":33,"./RequestObject":34,"./ResponseObject":35,"./SearchField":36,"./SearchFilter":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeSections = exports.setStateData = exports.trimCoverLimit = exports.getImageQuality = exports.convertImageQuality = exports.getPageSize = exports.getCopymangaAPI = exports.getCopymangaWebsite = exports.getCopymangaDomain = void 0;
// 
// COPYMANGA API STATE METHODS
//
const DEFAULT_COPYMANGA_SERVER_DOMAIN = 'copymanga.site';
async function getCopymangaDomain(stateManager) {
    return await stateManager.retrieve('copymangaDomain') ?? DEFAULT_COPYMANGA_SERVER_DOMAIN;
}
exports.getCopymangaDomain = getCopymangaDomain;
async function getCopymangaWebsite(stateManager) {
    return `https://${await getCopymangaDomain(stateManager)}`;
}
exports.getCopymangaWebsite = getCopymangaWebsite;
async function getCopymangaAPI(stateManager) {
    return `https://api.${await getCopymangaDomain(stateManager)}`;
}
exports.getCopymangaAPI = getCopymangaAPI;
// Number of items requested for paged requests
const PAGE_SIZE = 30;
function getPageSize(stateManager) {
    return PAGE_SIZE;
}
exports.getPageSize = getPageSize;
const DEFAULT_IMAGE_QUALITY = 'c800x';
const BEST_IMAGE_QUALITY = 'c1500x';
function convertImageQuality(url, mode) {
    return url.replace(DEFAULT_IMAGE_QUALITY, mode);
}
exports.convertImageQuality = convertImageQuality;
function getImageQuality() {
    return BEST_IMAGE_QUALITY;
}
exports.getImageQuality = getImageQuality;
function trimCoverLimit(url) {
    const limitType = url.split('.').slice(-2).join('.');
    return url.replace(`.${limitType}`, '');
}
exports.trimCoverLimit = trimCoverLimit;
async function setStateData(stateManager, data) {
    await setKomgaServerAddress(stateManager, data['copymangaDomain'] ?? DEFAULT_COPYMANGA_SERVER_DOMAIN);
}
exports.setStateData = setStateData;
async function setKomgaServerAddress(stateManager, domain) {
    await stateManager.store('copymangaDomain', domain);
}
// HOME SECTION
exports.homeSections = {
    'recComics': '漫畫推薦',
    'rankDayComics': '上升最快',
    'rankWeekComics': '近七天',
    'rankMonthComics': '近三十天',
};

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyManga = exports.CopyMangaInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Common_1 = require("./Common");
exports.CopyMangaInfo = {
    version: '0.0.1',
    name: 'CopyManga',
    description: 'Extension that pulls manga from copymanga.com',
    author: 'FDKevin',
    authorWebsite: 'http://github.com/fdkevin0',
    icon: 'icon.png',
    contentRating: paperback_extensions_common_1.ContentRating.EVERYONE,
    websiteBaseURL: "https://copymanga.com",
    sourceTags: [
        {
            text: 'Chinese',
            type: paperback_extensions_common_1.TagType.GREY,
        },
        {
            text: 'Experimental',
            type: paperback_extensions_common_1.TagType.YELLOW,
        },
    ],
};
class CopyManga extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.stateManager = createSourceStateManager({});
        this.requestManager = createRequestManager({
            requestsPerSecond: 5,
            requestTimeout: 80000,
        });
        this.RETRY = 5;
    }
    async getSourceMenu() {
        return Promise.resolve(createSection({
            id: 'main',
            header: 'Source Settings',
            rows: async () => []
        }));
    }
    async getMangaDetails(mangaId) {
        const copymangaAPI = await (0, Common_1.getCopymangaAPI)(this.stateManager);
        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/comic2/${mangaId}`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        const jsonData = JSON.parse(response.data);
        let status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
        const arrayTags = [];
        for (const item of jsonData.results.comic.theme) {
            arrayTags.push(createTag({
                id: item.path_word,
                label: item.name,
            }));
        }
        const trimedCover = (0, Common_1.trimCoverLimit)(jsonData.results.comic.cover);
        console.log(trimedCover);
        return createManga({
            id: mangaId,
            titles: String(jsonData.results.comic.name).split(','),
            image: trimedCover,
            author: jsonData.results.comic.author.name,
            status: status,
            langFlag: paperback_extensions_common_1.LanguageCode.CHINEESE,
            lastUpdate: new Date(jsonData.results.comic.datetime_updated),
            views: jsonData.results.comic.popular,
            desc: jsonData.results.comic.brief,
            // tags: [createTagSection({ id: '0', label: 'genres', tags: arrayTags.map(x => createTag(x)) })]
        });
    }
    async getChapters(mangaId) {
        const copymangaAPI = await (0, Common_1.getCopymangaAPI)(this.stateManager);
        const mangaDetailrequest = createRequestObject({
            url: `${copymangaAPI}/api/v3/comic2/${mangaId}`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
        });
        const mangaDetailresponse = await this.requestManager.schedule(mangaDetailrequest, this.RETRY);
        const mangaDetailjsonData = JSON.parse(mangaDetailresponse.data);
        const chapters = [];
        for (const [, groupItem] of Object.entries(mangaDetailjsonData.results.groups)) {
            const groupData = groupItem;
            const groupId = groupData.path_word;
            const request = createRequestObject({
                url: `${copymangaAPI}/api/v3/comic/${mangaId}/group/${groupId}/chapters?limit=500&offset=0`,
                method: 'GET',
                headers: {
                    'platform': '3'
                }
            });
            const response = await this.requestManager.schedule(request, this.RETRY);
            const jsonData = JSON.parse(response.data);
            for (const item of jsonData.results.list) {
                chapters.push(createChapter({
                    id: item.uuid,
                    mangaId: mangaId,
                    name: item.name,
                    chapNum: Number(item.index + 1 ?? '-1'),
                    time: new Date(item.datetime_created),
                    langCode: paperback_extensions_common_1.LanguageCode.CHINEESE,
                    group: groupData.name,
                }));
            }
        }
        return chapters;
    }
    async getChapterDetails(mangaId, chapterId) {
        const copymangaAPI = await (0, Common_1.getCopymangaAPI)(this.stateManager);
        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/comic/${mangaId}/chapter2/${chapterId}?platform=3`,
            method: 'GET',
            headers: {
                'platform': '3',
                'webp': '1'
            }
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        const jsonData = JSON.parse(response.data);
        const pages = [];
        for (var page = 0; page < jsonData.results.chapter.size; page++) {
            for (var i = 0; i < jsonData.results.chapter.words.length; i++) {
                if (jsonData.results.chapter.words[i] === page) {
                    pages.push((0, Common_1.convertImageQuality)(jsonData.results.chapter.contents[i].url, (0, Common_1.getImageQuality)()));
                }
            }
        }
        return createChapterDetails({
            id: chapterId,
            mangaId,
            pages,
            longStrip: jsonData.results.chapter.is_long ?? false,
        });
    }
    async getSearchResults(query, metadata) {
        const copymangaAPI = await (0, Common_1.getCopymangaAPI)(this.stateManager);
        const page = metadata?.page ?? 0;
        const pageSize = (0, Common_1.getPageSize)(this.stateManager);
        const offset = page * pageSize;
        const keyword = encodeURI(query.title ?? '');
        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/search/comic?format=json&platform=3&limit=${pageSize}&offset=${offset}&q=${keyword}`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        const jsonData = JSON.parse(response.data);
        console.log(jsonData);
        const mangaTiles = [];
        for (const item of jsonData.results.list) {
            mangaTiles.push(createMangaTile({
                id: item.path_word,
                title: createIconText({ text: item.name }),
                image: item.cover,
            }));
        }
        // If no series were returned we are on the last page
        metadata = mangaTiles.length === 0 ? undefined : { page: page + 1 };
        return createPagedResults({
            results: mangaTiles,
            metadata,
        });
    }
    async getHomePageSections(sectionCallback) {
        const copymangaAPI = await (0, Common_1.getCopymangaAPI)(this.stateManager);
        const request = createRequestObject({
            url: `${copymangaAPI}/api/v3/h5/homeIndex?platform=3`,
            method: 'GET',
            headers: {
                'platform': '3'
            }
        });
        const response = await this.requestManager.schedule(request, this.RETRY);
        const jsonData = JSON.parse(response.data);
        const sections = [];
        const bannerTiles = [];
        for (const item of jsonData.results.banners) {
            if (item.type === 1) {
                bannerTiles.push(createMangaTile({
                    id: item.comic.path_word,
                    title: createIconText({ text: item.brief }),
                    image: item.cover,
                }));
            }
        }
        sections.push(createHomeSection({
            id: 'banner',
            title: 'Banner',
            items: bannerTiles,
            type: paperback_extensions_common_1.HomeSectionType.featured,
            view_more: false,
        }));
        for (const [keyword, nameStr] of Object.entries(Common_1.homeSections)) {
            const mangaTiles = [];
            for (const item of jsonData.results[keyword].list) {
                mangaTiles.push(createMangaTile({
                    id: item.comic.path_word,
                    title: createIconText({ text: item.comic.name }),
                    image: item.comic.cover,
                }));
            }
            sections.push(createHomeSection({
                id: keyword,
                title: nameStr,
                items: mangaTiles,
                view_more: false,
            }));
        }
        for (const section of sections) {
            sectionCallback(section);
        }
    }
}
exports.CopyManga = CopyManga;

},{"./Common":48,"paperback-extensions-common":4}]},{},[49])(49)
});
