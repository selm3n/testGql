export interface ICountry {
    country_code: string;
    locales: string[];
}

export type CountryCode = "UK" | "FR" | "ES";

export type IOrdredCountries = Record<CountryCode, IOrdredCountry>

export interface IOrdredCountry {
    code: string;
    locales: string[];
}