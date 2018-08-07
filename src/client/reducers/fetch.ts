
import { ActionTypes, Actions  } from '../actions/main';
import { IFetch } from '../models/fetch';

const initState: IFetch = {
  workerListItems: {},
  stationListItems: [],
  workerEditShiftItems: [],
  stationShiftItems: [],
  shiftEditItems: {},
  items: [],
  loading: false,
  error: null,
  sendfinish: false,
};

const fetch = (state = initState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_BEGIN:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.FETCH_GET_DATA_SUCCESS:
      if (action.payload.type === 'workerList') {
        return {
          ...state,
          loading: false,
          sendfinish: false,
          workerListItems: action.payload.data
        };
      } else if (action.payload.type === 'stationList') {
        return {
          ...state,
          loading: false,
          sendfinish: false,
          stationListItems: action.payload.data
        };
      } else if (action.payload.type === 'shiftList') {
        return {
          ...state,
          loading: false,
          sendfinish: false,
          stationShiftItems: action.payload.data.shiftList,
          workerEditShiftItems: action.payload.data.worker
        };
      } else if (action.payload.type === 'shiftEdit') {
        return {
          ...state,
          modalLoading: false,
          sendfinish: false,
          shiftEditItems: action.payload.data,
        };
      } else {
        return {
          ...state,
          loading: false,
          sendfinish: false,
          items: action.payload.data
        };
      }
    case ActionTypes.FETCH_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        sendfinish: true,
      };
    case ActionTypes.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      };
    default:
      return state;
  }
};

export default fetch;
