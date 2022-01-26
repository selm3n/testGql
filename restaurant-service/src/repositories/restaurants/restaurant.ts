const config = require('../../../knexfile')
const knex = require('knex')(config)
import {IVariablesType, ICountry, IOrdredCountries, IImage, IResp} from '../../interfaces/restaurant'

const { attachPaginate } = require('knex-paginate');
const { default: axios } = require('axios');
attachPaginate();



const Restaurant = async (_:any, variables: IVariablesType) => {
  if (variables.name !== undefined && variables.haveImageOnly == true) {
    return await knex('restaurant')
      .join('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
      .select('restaurant.restaurant_uuid as restaurantUuid',
        'restaurant.name as name',
        'restaurant.country_code as country_code',
        knex.raw('ARRAY_AGG (restaurant_has_image.image_uuid) images'))
      .where('name', 'like', '%' + variables.name + '%')
      .groupBy("restaurant.restaurant_uuid")
      .orderBy("restaurant.restaurant_uuid")

      .paginate({ perPage: variables.perPage ? variables.perPage : 50, currentPage: variables.currentPage ? variables.currentPage : 1 })
      .then(async function (resp:any) {
        let countries: ICountry[] = await knex('country')
        
        let ordredCountries: IOrdredCountries;

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

        resp.data.forEach((e:IResp) => {
          

          if( ['ES', 'FR', 'UK'].includes(e.country_code)){
            e.country = ordredCountries[e.country_code];
          }
          

          if (e.images[0] !== null) {
            let imgs:string[] = []
            e.images.forEach((eim: string) => {
              images.images.forEach((im:IImage) => {
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
      })


  } else if (variables.name == undefined && variables.haveImageOnly !== true) {
    return await knex('restaurant')
      .fullOuterJoin('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
      .select('restaurant.restaurant_uuid as restaurantUuid',
        'restaurant.name as name',
        'restaurant.country_code as country_code',
        knex.raw('ARRAY_AGG (restaurant_has_image.image_uuid) images'))

      .groupBy("restaurant.restaurant_uuid")
      .orderBy("restaurant.restaurant_uuid")
      .paginate({ perPage: variables.perPage ? variables.perPage : 50, currentPage: variables.currentPage ? variables.currentPage : 1 })
      .then(async function (resp:any) {
        let countries = await knex('country')
        let ordredCountries: IOrdredCountries;

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
        resp.data.forEach((e:IResp) => {
          if (e.country_code == 'UK') {
            e.country = ordredCountries.UK
          }
          if (e.country_code == 'FR') {
            e.country = ordredCountries.FR
          }
          if (e.country_code == 'ES') {
            e.country = ordredCountries.ES
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
      })

  }
  else if (name !== undefined && haveImageOnly !== true) {

    return await knex('restaurant')
      .fullOuterJoin('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
      .select('restaurant.restaurant_uuid as restaurantUuid',
        'restaurant.name as name',
        'restaurant.country_code as country_code',
        knex.raw('ARRAY_AGG (restaurant_has_image.image_uuid) images'))
      .where('name', 'like', '%' + name + '%')
      .groupBy("restaurant.restaurant_uuid")
      .orderBy("restaurant.restaurant_uuid")
      .paginate({ perPage: perPage ? perPage : 50, currentPage: currentPage ? currentPage : 1 })
      .then(async function (resp) {
        let countries = await knex('country')
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
          if (e.country_code == 'UK') {
            e.country = ordredCountries.UK
          }
          if (e.country_code == 'FR') {
            e.country = ordredCountries.FR
          }
          if (e.country_code == 'ES') {
            e.country = ordredCountries.ES
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
      })


  }
  else if (name == undefined && haveImageOnly == true) {
    return await knex('restaurant')
      .join('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
      .select('restaurant.restaurant_uuid as restaurantUuid',
        'restaurant.name as name',
        'restaurant.country_code as country_code',
        knex.raw('ARRAY_AGG (restaurant_has_image.image_uuid) images'))
      .groupBy("restaurant.restaurant_uuid")
      .orderBy("restaurant.restaurant_uuid")
      .paginate({ perPage: perPage ? perPage : 50, currentPage: currentPage ? currentPage : 1 })
      .then(async function (resp) {
        let countries = await knex('country')
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
          if (e.country_code == 'UK') {
            e.country = ordredCountries.UK
          }
          if (e.country_code == 'FR') {
            e.country = ordredCountries.FR
          }
          if (e.country_code == 'ES') {
            e.country = ordredCountries.ES
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
      })
  }
}
const getImages = () => {
  return axios
    .get('http://localhost:3010/images')
    // .get('http://image-service:3010/images')
    .then(res => {
      // console.log('res', res)
      return res.data
    }
    )
    .catch(err => {
      console.log('err', err);
    }
    );
}

// export default Restaurant
module.exports = Restaurant