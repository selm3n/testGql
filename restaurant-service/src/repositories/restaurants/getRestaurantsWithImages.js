const config = require('../../../knexfile')
const knex = require('knex')(config)

const { attachPaginate } = require('knex-paginate');

const { getOrdredResponse } = require('./restaurantsHelper')
attachPaginate();

const getRestaurantsWithIamges = async(name, perPage, currentPage) => {

    return await knex('restaurant')
        .join('restaurant_has_image', 'restaurant.restaurant_uuid', 'restaurant_has_image.restaurant_uuid')
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

            return res = await getOrdredResponse(countries, resp);

        })
}

export default  getRestaurantsWithIamges