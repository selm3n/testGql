const { attachPaginate } = require('knex-paginate');

import { getRestaurantsWithImagesOnly } from '../../repositories/restaurants/getRestaurantsWithImagesOnly'
import { getRestaurants } from '../../repositories/restaurants/getRestaurants';
import { IVariablesType } from '../../interfaces/variablesRestaurant';

attachPaginate();

export const restaurant = async (_: any, variables: IVariablesType) => {
    if (variables.haveImageOnly) {
        return getRestaurantsWithImagesOnly(variables.name, variables.perPage, variables.currentPage)
    }
    return getRestaurants(variables.name, variables.perPage, variables.currentPage)

}
