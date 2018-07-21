// Helper
import createAction from '@helpers/create-action';
import { ActionsUnion } from '@helpers/actions-union';


enum ActionTypes {
  FETCH_PRODUCTS_BEGIN = '[fetch] FETCH PRODUCTS BEGIN',
  FETCH_PRODUCTS_SUCCESS = '[fetch] FETCH PRODUCTS SUCCESS',
  FETCH_PRODUCTS_FAILURE = '[fetch] FETCH PRODUCTS FAILURE'
}

const Actions = {
  fetchProductsBegin: () => createAction(ActionTypes.FETCH_PRODUCTS_BEGIN),
  fetchProductsSuccess: (products: any) => createAction(ActionTypes.FETCH_PRODUCTS_SUCCESS, products),
  fetchProductsFailure: (error: any) => createAction(ActionTypes.FETCH_PRODUCTS_FAILURE, error)
};

type Actions = ActionsUnion<typeof Actions>;

export {
  ActionTypes,
  Actions
};
