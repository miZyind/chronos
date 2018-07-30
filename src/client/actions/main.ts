// Helper
import createAction from '@helpers/create-action';
import { ActionsUnion } from '@helpers/actions-union';

import { IFetch } from '../models/fetch';

enum ActionTypes {
  TOGGLE_LOADING_STATUS = '[main] toggle loading status',
  TOGGLE_STEP_STATUS = '[main] toggle step status',
  INCREMENT = '[main] increment',
  DECREMENT = '[main] decrement',
  SELECTYEAR = '[dayline] selectyear',
  SELECTMONTH = '[dayline] selectmonth',
  SELECTAREA = '[stationlist] selectarea',
  ADDSHILT = '[add] addshift',
  FETCH_BEGIN = '[fetch] FETCH  BEGIN',
  FETCH_GET_DATA_SUCCESS = '[fetch] FETCH GET DATA SUCCESS',
  FETCH_SEND_SUCCESS = '[fetch] FETCH SEND SUCCESS',
  FETCH_FAILURE = '[fetch] FETCH FAILURE'
}

const Actions = {
  toggleLoadingStatus: () => createAction(ActionTypes.TOGGLE_LOADING_STATUS),
  toggleStepStatue: () => createAction(ActionTypes.TOGGLE_STEP_STATUS),
  increment: () => createAction(ActionTypes.INCREMENT),
  decrement: () => createAction(ActionTypes.DECREMENT),
  selectyear: (val: string) => createAction(ActionTypes.SELECTYEAR, val),
  selectmonth: (val: string) => createAction(ActionTypes.SELECTMONTH, val),
  selectarea: (val: string) => createAction(ActionTypes.SELECTAREA, val),
  fetchBegin: () => createAction(ActionTypes.FETCH_BEGIN),
  fetchGetDataSuccess: (data: IFetch) => createAction(ActionTypes.FETCH_GET_DATA_SUCCESS, data),
  fetchSendSuccess: () => createAction(ActionTypes.FETCH_SEND_SUCCESS),
  fetchFailure: (error: IFetch) => createAction(ActionTypes.FETCH_FAILURE, error),
};

type Actions = ActionsUnion<typeof Actions>;

export {
  ActionTypes,
  Actions
};
