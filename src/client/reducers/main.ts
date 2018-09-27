// Action
import { ActionTypes, Actions } from '@actions/main';
// Model
import { IMain } from '../models/main';

const getCurrentMonth = () => {
  return (new Date().getMonth() + 1).toString();
};
const getCurrentTaiwanYear = () => {
  return (new Date().getFullYear() - 1911).toString();
};
const getDaysInMonth = (getDays: number[], month: number, year: number) => {
  for (let i = 1; i <= getLastDayInMonth(month, year); i++) {
    getDays.push(i);
  }
  return getDays;
};
const getLastDayInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};
const getCommonEra = (year: number) => {
  return year + 1911;
};
// let getList = (lists: number[], value: number) => {
//   lists.push(value);
//   return lists;
// }
const initState: IMain = {
  isLoading: true,
  isCompleted: false,
  getSelectShiftYear: getCurrentTaiwanYear(),
  getSelectShiftMonth: getCurrentMonth(),
  getShiftDays: getDaysInMonth([], parseInt(getCurrentMonth()), parseInt(getCurrentTaiwanYear())),
  getSelectShiftArea: 'all',
  getShift: [],
  getShiftPage: 1,
  getSelectCountYear: getCurrentTaiwanYear(),
  getSelectCountMonth: getCurrentMonth(),
  getDays: getDaysInMonth([], parseInt(getCurrentMonth()), parseInt(getCurrentTaiwanYear())),
  getSelectArea: 'all',
  getSelectWorker: [],
  modalLoading: false
};

const main = (state = initState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOADING_STATUS: {
      return { ...state, isLoading: false };
    }
    case ActionTypes.TOGGLE_STEP_STATUS: {
      return { ...state, isCompleted: !state.isCompleted };
    }
    case ActionTypes.SELECTSHIFTYEAR: {
      state.getShiftDays = getDaysInMonth([], parseInt(state.getSelectShiftMonth), getCommonEra(parseInt(action.payload)));
      return { ...state, getSelectShiftYear: action.payload, getShiftDays: state.getShiftDays };
    }
    case ActionTypes.SELECTSHIFTMONTH: {
      state.getShiftDays = getDaysInMonth([], parseInt(action.payload), getCommonEra(parseInt(state.getSelectShiftYear)));
      return { ...state, getSelectShiftMonth: action.payload, getShiftDays: state.getShiftDays };
    }
    case ActionTypes.SELECTSHIFTAREA: {
      return { ...state, getSelectShiftArea: action.payload};
    }
    case ActionTypes.SHIFTPAGINATION: {
      return { ...state, getShiftPage: action.payload };
    }
    case ActionTypes.SELECTCOUNTYEAR: {
      return { ...state, getSelectCountYear: action.payload };
    }
    case ActionTypes.SELECTCOUNTMONTH: {
      return { ...state, getSelectCountMonth: action.payload };
    }
    case ActionTypes.SELECTAREA: {
      return { ...state, getSelectArea: action.payload };
    }
    case ActionTypes.EDITSHIFT: {
      const getItems = state.getShift;
      // tslint:disable-next-line:prefer-conditional-expression
      if (action.payload.shiftType === '休') {
        getItems[parseInt(action.payload.day) - 1] = { 'type': '休', 'coverWorkerId': action.payload.id, 'coverWorkerName': action.payload.name };
      } else {
        getItems[parseInt(action.payload.day) - 1] = { 'type': action.payload.shiftType };
      }
      return { ...state, getShift: getItems, isCompleted: !state.isCompleted };
    }
    case ActionTypes.SELECTWORKER: {
      return { ...state, getSelectWorker: action.payload };
    }
    case ActionTypes.MODAL_FETCH_BEGIN: {
      return {
        ...state,
        modalLoading: true
      };
    }
    case ActionTypes.MODAL_FETCH_GET_DATA_SUCCESS: {
      return {
        ...state,
        modalLoading: false,
        getShift: action.payload.data
      };
    }
    default: {
      return state;
    }
  }
};

export default main;
