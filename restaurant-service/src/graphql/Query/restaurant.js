const config = require('../../../knexfile')
const knex = require('knex')(config)

const { attachPaginate } = require('knex-paginate');


const { getImages } = require('../../repositories/images/image')
const { getRestaurantsWithIamges } = require('../../repositories/restaurants/getRestaurantsWithImages')

attachPaginate();

const Restaurant = async (_, { name, haveImageOnly, perPage, currentPage }) => {
  if (haveImageOnly == true) {
    // return await knex('restaurant')
    //   .join('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
    //   .select('restaurant.restaurant_uuid as restaurantUuid',
    //     'restaurant.name as name',
    //     'restaurant.country_code as country_code',
    //     knex.raw('ARRAY_AGG (restaurant_has_image.image_uuid) images'))

    //   .where('name', 'like', '%' + (name ? name : '') + '%')
    //   .groupBy("restaurant.restaurant_uuid")
    //   .orderBy("restaurant.restaurant_uuid")

    //   .paginate({ perPage: perPage ? perPage : 50, currentPage: currentPage ? currentPage : 1 })
    //   .then(async function (resp) {
    //     let countries = await knex('country')

    //     return res = await getOrdredResponse(countries, resp);

    //   })

    return getRestaurantsWithIamges()


  } else {
    return await knex('restaurant')
      .fullOuterJoin('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
      .select('restaurant.restaurant_uuid as restaurantUuid',
        'restaurant.name as name',
        'restaurant.country_code as country_code',
        knex.raw('ARRAY_AGG (restaurant_has_image.image_uuid) images'))
      .where('name', 'like', '%' + (name ? name : '') + '%')
      .groupBy("restaurant.restaurant_uuid")
      .orderBy("restaurant.restaurant_uuid")
      .paginate({ perPage: perPage ? perPage : 50, currentPage: currentPage ? currentPage : 1 })
      .then(async function (resp) {
        let countries = await knex('country')

        return  res = await getOrdredResponse(countries, resp);

      })

  }
  
}



const getOrdredResponse = async (countries, resp) => {
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

// export default Restaurant
module.exports = Restaurant