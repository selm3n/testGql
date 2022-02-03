import { CountryCode, IOrdredCountry } from './country'

export interface IResp {
    country_code: CountryCode;
    country: IOrdredCountry;
    images: string[];
}