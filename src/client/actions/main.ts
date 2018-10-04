// Helper
import createAction from '@helpers/create-action';
import { ActionsUnion } from '@helpers/actions-union';
import { IMain } from '../models/main';
import { IFetch } from '../models/fetch';

enum ActionTypes {
  TOGGLE_LOADING_STATUS = '[main] toggle loading status',
  TOGGLE_STEP_STATUS = '[main] toggle step status',
  SELECTSHIFTYEAR = '[shift] selectshiftyear',
  SELECTSHIFTMONTH = '[shift] selectshiftmonth',
  SELECTSHIFTAREA = '[shift] selectshiftarea',
  SHIFTPAGINATION = '[shift] shiftpagination',
  SELECTCOUNTYEAR = '[count] selectcountyear',
  SELECTCOUNTMONTH = '[count] selectcountmonth',
  SELECTAREA = '[stationlist] selectarea',
  EDITSHIFT = '[shift] editshift',
  SELECTWORKER = '[fetch] SELECT WORKER',
  MODAL_FETCH_BEGIN = '[modal] MODAL FETCH  BEGIN',
  MODAL_FETCH_GET_DATA_SUCCESS = '[modal] MODAL FETCH GET DATA SUCCESS',
  MODAL_FETCH_FAILURE = '[modal] MODAL FETCH FAILURE',
  COVER_MODAL_SHOW = '[cover] COVER MODAL SHOW',
  FETCH_BEGIN = '[fetch] FETCH  BEGIN',
  FETCH_GET_SUCCESS = '[fetch] FETCH GET DATA SUCCESS',
  FETCH_SEND_SUCCESS = '[fetch] FETCH SEND SUCCESS',
  FETCH_FAILURE = '[fetch] FETCH FAILURE'
}

const Actions = {
  toggleLoadingStatus: () => createAction(ActionTypes.TOGGLE_LOADING_STATUS),
  toggleStepStatue: () => createAction(ActionTypes.TOGGLE_STEP_STATUS),
  selectshiftyear: (val: IMain) => createAction(ActionTypes.SELECTSHIFTYEAR, val),
  selectshiftmonth: (val: IMain) => createAction(ActionTypes.SELECTSHIFTMONTH, val),
  selectshiftarea: (val: IMain) => createAction(ActionTypes.SELECTSHIFTAREA, val),
  shiftpagination: (val: IMain) => createAction(ActionTypes.SHIFTPAGINATION, val),
  selectcountyear: (val: IMain) => createAction(ActionTypes.SELECTCOUNTYEAR, val),
  selectcountmonth: (val: IMain) => createAction(ActionTypes.SELECTCOUNTMONTH, val),
  selectarea: (val: IMain) => createAction(ActionTypes.SELECTAREA, val),
  editshift: (obj: object) => createAction(ActionTypes.EDITSHIFT, obj),
  selectworker: (obj: object) => createAction(ActionTypes.SELECTWORKER, obj),
  modalfetchBegin: () => createAction(ActionTypes.MODAL_FETCH_BEGIN),
  modalfetchGetDataSuccess: (obj: object) => createAction(ActionTypes.MODAL_FETCH_GET_DATA_SUCCESS, obj),
  modalfetchFailure: (error: IFetch) => createAction(ActionTypes.MODAL_FETCH_FAILURE, error),
  fetchBegin: () => createAction(ActionTypes.FETCH_BEGIN),
  fetchGetSuccess: (obj: object) => createAction(ActionTypes.FETCH_GET_SUCCESS, obj),
  fetchSendSuccess: () => createAction(ActionTypes.FETCH_SEND_SUCCESS),
  fetchFailure: (error: IFetch) => createAction(ActionTypes.FETCH_FAILURE, error),
  fetchStep: (fetchType: string, fetchService: any, getContainerName?: string) => {
    return (dispatch: any) => {
      dispatch(Actions.fetchBegin());
      return fetchService
        .then(
          (response: any) => {
            if (fetchType === 'GET') {
              dispatch(Actions.fetchGetSuccess({ 'type': getContainerName, 'data': response }));
            } else {
              if (response === 'yes') {
                dispatch(Actions.fetchSendSuccess());
              }
            }
          },
          (error: any) => {
            Actions.fetchFailure(error);
          }
        );
    };
  }
};

type Actions = ActionsUnion<typeof Actions>;

export {
  ActionTypes,
  Actions
};
