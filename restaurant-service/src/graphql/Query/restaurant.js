const config = require('../../../knexfile')
const knex = require('knex')(config)

const { attachPaginate } = require('knex-paginate');
const { default: axios } = require('axios');
attachPaginate();

var Restaurant = async (_, { name, haveImageOnly, perPage, currentPage }) => {
  if (name !== undefined && haveImageOnly == true) {
    return await knex('restaurant')
      .join('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
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
        
        var ordredCountries = [];

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


  } else if (name == undefined && haveImageOnly !== true) {
    return await knex('restaurant')
      .fullOuterJoin('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
      .select('restaurant.restaurant_uuid as restaurantUuid',
        'restaurant.name as name',
        'restaurant.country_code as country_code',
        knex.raw('ARRAY_AGG (restaurant_has_image.image_uuid) images'))

      .groupBy("restaurant.restaurant_uuid")
      .orderBy("restaurant.restaurant_uuid")
      .paginate({ perPage: perPage ? perPage : 50, currentPage: currentPage ? currentPage : 1 })
      .then(async function (resp) {
        let countries = await knex('country')
        var ordredCountries = [];

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
        var ordredCountries = [];

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
        var ordredCountries = [];

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
    // .get('http://localhost:3010/images')
    .get('http://image-service:3010/images')
    .then(res => {
      console.log('res', res)
      return res.data
    }
    )
    .catch(err => {
      console.log('err', err);
    }
    );
}
module.exports = Restaurant