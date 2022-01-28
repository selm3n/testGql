
const { getImages } = require('../../repositories/images/image');

export const getOrdredResponse = async (countries, resp) => {
    let ordredCountries = [];

    countries.forEach(e => {
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

    resp.data.forEach(e => {

        if (['ES', 'FR', 'UK'].includes(e.country_code)) {
            e.country = ordredCountries[e.country_code];
        }

        if (e.images[0] !== null) {
            let imgs = []
            e.images.forEach(eim => {
                images.images.forEach(im => {
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