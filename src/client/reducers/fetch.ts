
import { ActionTypes, Actions  } from '../actions/main';
import { IFetch } from '../models/fetch';

const initState: IFetch = {
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
      return {
        ...state,
        loading: false,
        sendfinish: false,
        items: action.payload
      };
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
