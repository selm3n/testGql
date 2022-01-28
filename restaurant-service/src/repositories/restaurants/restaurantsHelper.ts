
const { getImages } = require('../../repositories/images/image');
import { ICountry, IOrdredCountries, IImage, IResp } from '../../interfaces/restaurant'


export const getOrdredResponse = async (countries: ICountry[], resp: any) => {
    let ordredCountries: IOrdredCountries = { UK: { code: '', locales: [] }, FR: { code: '', locales: [] }, ES: { code: '', locales: [] } };


    countries.forEach((e: ICountry) => {
        if (e.country_code == 'UK') {
            ordredCountries.UK = {
                code: e.country_code,
                locales: e.locales
            }
        }
        if (e.country_code == 'FR') {
            ordredCountries.FR = {
                code: e.country_code,
                locales: e.locales
            }
        }
        if (e.country_code == 'ES') {
            ordredCountries.ES = {
                code: e.country_code,
                locales: e.locales
            }
        }
    })

    const images = await getImages();

    resp.data.forEach((e: IResp) => {

        if (['ES', 'FR', 'UK'].includes(e.country_code)) {
            e.country = ordredCountries[e.country_code];
        }

        if (e.images[0] !== null) {
            let imgs: string[] = []
            e.images.forEach((eim: string) => {
                images.images.forEach((im: IImage) => {
                    if (im.imageUuid === eim) {
                        imgs.push(im.url)
                    }
                })
            });
            e.images = imgs;
        }

    });

    const res = {
        restaurants: resp.data,
        pagination: resp.pagination
    }

    return res;

}