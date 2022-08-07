export interface Comic {
    type:  number;
    comic: ComicClass;
}

export interface ComicClass {
    uuid: string;
    name:      string;
    alias:     string;
    females:   Character[];
    males:     Character[];
    theme:     Theme[];
    path_word: string;
    author:    Author[];
    img_type:  number;
    cover:     string;
    popular:   number;
    datetime_updated: Date;
}

export interface Character {
    name: string;
    path_word: string;
    gender: number;
}

export interface Author {
    name:      string;
    path_word: string;
}

export interface Theme {
    name:      string;
    path_word: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toComic(json: string): Comic {
        return JSON.parse(json);
    }

    public static comicToJson(value: Comic): string {
        return JSON.stringify(value);
    }
}