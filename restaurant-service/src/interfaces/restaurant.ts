export interface IVariablesType {
    name: string;
    haveImageOnly: boolean;
    perPage: number;
    currentPage: number;

}

export interface ICountry {
    country_code: string;
    locales: string[];
}

type CountryCode = "UK" | "FR" | "ES";

export type IOrdredCountries = Record<CountryCode, IOrdredCountry>

export interface IOrdredCountry {
    code: string;
    locales: string[];
}

export interface IResp {
    country_code: CountryCode;
    country: IOrdredCountry;
    images: string[];
}

export interface IImage {
    imageUuid: string;
    url: string;
}