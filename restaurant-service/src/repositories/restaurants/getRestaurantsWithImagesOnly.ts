const config = require('../../../knexfile')
const knex = require('knex')(config)
import { getOrdredResponse } from './restaurantsHelper';
import { ICountry } from '../../interfaces/restaurant'

export const getRestaurantsWithImagesOnly = async (name: string, perPage: number, currentPage: number) => {

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
        .then(async function (resp: any) {
            let countries: ICountry[] = await knex('country')
            return await getOrdredResponse(countries, resp);
        })
}
