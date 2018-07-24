
import { ActionTypes, Actions  } from '../actions/main';
import { IWork } from '../models/work';

const initState: IWork = {
  items: [],
  loading: false,
  error: null
};

// TODO(zhoulj) modal目录添加state抽象对象集合， 页面渲染也读取这些对象集合
const work = (state = initState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      };

    case ActionTypes.FETCH_PRODUCTS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case ActionTypes.FETCH_PRODUCTS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      };
    default:
      return state;
  }
}

export default work;
