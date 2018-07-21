// Helper
import createAction from '@helpers/create-action';
import { ActionsUnion } from '@helpers/actions-union';

import { IWork } from '../models/work';

enum ActionTypes {
  TOGGLE_LOADING_STATUS = '[main] toggle loading status',
  TOGGLE_STEP_STATUS = '[main] toggle step status',
  INCREMENT = '[main] increment',
  DECREMENT = '[main] decrement',
  SELECTYEAR = '[dayline] selectyear',
  SELECTMONTH = '[dayline] selectmonth',
  ADDSHILT = '[add] addshift',
  FETCH_PRODUCTS_BEGIN = '[fetch] FETCH PRODUCTS BEGIN',
  FETCH_PRODUCTS_SUCCESS = '[fetch] FETCH PRODUCTS SUCCESS',
  FETCH_PRODUCTS_FAILURE = '[fetch] FETCH PRODUCTS FAILURE'
}

const Actions = {
  toggleLoadingStatus: () => createAction(ActionTypes.TOGGLE_LOADING_STATUS),
  toggleStepStatue: () => createAction(ActionTypes.TOGGLE_STEP_STATUS),
  increment: () => createAction(ActionTypes.INCREMENT),
  decrement: () => createAction(ActionTypes.DECREMENT),
  selectyear: (val: string) => createAction(ActionTypes.SELECTYEAR, val),
  selectmonth: (val: string) => createAction(ActionTypes.SELECTMONTH, val),
  addshift: (val1: string, val2: number) => createAction(ActionTypes.ADDSHILT, val1 + '-' + val2),
  fetchProductsBegin: () => createAction(ActionTypes.FETCH_PRODUCTS_BEGIN),
  fetchProductsSuccess: (products: IWork) => createAction(ActionTypes.FETCH_PRODUCTS_SUCCESS, products),
  fetchProductsFailure: (error: IWork) => createAction(ActionTypes.FETCH_PRODUCTS_FAILURE, error)
};

type Actions = ActionsUnion<typeof Actions>;

export {
  ActionTypes,
  Actions
};
