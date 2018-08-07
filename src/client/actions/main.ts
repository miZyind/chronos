// Helper
import createAction from '@helpers/create-action';
import { ActionsUnion } from '@helpers/actions-union';

import { IMain } from '../models/main';
import { IFetch } from '../models/fetch';

enum ActionTypes {
  TOGGLE_LOADING_STATUS = '[main] toggle loading status',
  TOGGLE_STEP_STATUS = '[main] toggle step status',
  INCREMENT = '[main] increment',
  DECREMENT = '[main] decrement',
  SELECTYEAR = '[dayline] selectyear',
  SELECTMONTH = '[dayline] selectmonth',
  SELECTAREA = '[stationlist] selectarea',
  EDITSHIFT = '[shift] editshift',
  FETCH_BEGIN = '[fetch] FETCH  BEGIN',
  FETCH_GET_DATA_SUCCESS = '[fetch] FETCH GET DATA SUCCESS',
  FETCH_SEND_SUCCESS = '[fetch] FETCH SEND SUCCESS',
  FETCH_FAILURE = '[fetch] FETCH FAILURE',
  SELECTWORKER = '[fetch] SELECT WORKER',
  MODAL_FETCH_BEGIN = '[modal] MODAL FETCH  BEGIN',
  MODAL_FETCH_GET_DATA_SUCCESS = '[modal] MODAL FETCH GET DATA SUCCESS',
  MODAL_FETCH_FAILURE = '[modal] MODAL FETCH FAILURE',
  COVER_MODAL_SHOW = '[cover] COVER MODAL SHOW',
}

const Actions = {
  toggleLoadingStatus: () => createAction(ActionTypes.TOGGLE_LOADING_STATUS),
  toggleStepStatue: () => createAction(ActionTypes.TOGGLE_STEP_STATUS),
  increment: () => createAction(ActionTypes.INCREMENT),
  decrement: () => createAction(ActionTypes.DECREMENT),
  selectyear: (val: IMain) => createAction(ActionTypes.SELECTYEAR, val),
  selectmonth: (val: IMain) => createAction(ActionTypes.SELECTMONTH, val),
  selectarea: (val: IMain) => createAction(ActionTypes.SELECTAREA, val),
  editshift: (obj: object) => createAction(ActionTypes.EDITSHIFT, obj),
  fetchBegin: () => createAction(ActionTypes.FETCH_BEGIN),
  fetchGetDataSuccess: (obj: object) => createAction(ActionTypes.FETCH_GET_DATA_SUCCESS, obj),
  fetchSendSuccess: () => createAction(ActionTypes.FETCH_SEND_SUCCESS),
  fetchFailure: (error: IFetch) => createAction(ActionTypes.FETCH_FAILURE, error),
  selectworker: (obj: object) => createAction(ActionTypes.SELECTWORKER, obj),
  modalfetchBegin: () => createAction(ActionTypes.MODAL_FETCH_BEGIN),
  modalfetchGetDataSuccess: (obj: object) => createAction(ActionTypes.MODAL_FETCH_GET_DATA_SUCCESS, obj),
  modalfetchFailure: (error: IFetch) => createAction(ActionTypes.MODAL_FETCH_FAILURE, error),
};

type Actions = ActionsUnion<typeof Actions>;

export {
  ActionTypes,
  Actions
};
