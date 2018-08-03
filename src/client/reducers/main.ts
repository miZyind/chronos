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
  counterCaption: 0,
  getSelectYear: getCurrentTaiwanYear(),
  getSelectMonth: getCurrentMonth(),
  getDays: getDaysInMonth([], parseInt(getCurrentMonth()), parseInt(getCurrentTaiwanYear())),
  getSelectArea: 'all',
  getShift: {},
  getSelectWorker: []
};

const main = (state = initState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOADING_STATUS: {
      return { ...state, isLoading: false };
    }
    case ActionTypes.TOGGLE_STEP_STATUS: {
      return { ...state, isCompleted: !state.isCompleted };
    }
    case ActionTypes.INCREMENT: {
      return { ...state, counterCaption: state.counterCaption + 1 };
    }
    case ActionTypes.DECREMENT: {
      return { ...state, counterCaption: state.counterCaption - 1 };
    }
    case ActionTypes.SELECTYEAR: {
      state.getDays = getDaysInMonth([], parseInt(state.getSelectMonth), getCommonEra(parseInt(action.payload)));
      return { ...state, getSelectYear: action.payload, getDays: state.getDays };
    }
    case ActionTypes.SELECTMONTH: {
      state.getDays = getDaysInMonth([], parseInt(action.payload), getCommonEra(parseInt(state.getSelectYear)));
      return { ...state, getSelectMonth: action.payload, getDays: state.getDays};
    }
    case ActionTypes.SELECTAREA: {
      return { ...state, getSelectArea: action.payload};
    }
    case ActionTypes.EDITSHIFT: {
      const getItems: {
        [index: string]: {
          shiftType: string,
          cover: {
            name: string,
            id: string
          }
        }
      } = state.getShift;
      // tslint:disable-next-line:prefer-conditional-expression
      if (action.payload.status === 'on') {
        let coverId = '';
        let coverName = '';
        if (action.payload.id) {
          coverId = action.payload.id;
        }
        if (action.payload.name) {
          coverName = action.payload.name;
        }
        getItems[action.payload.day] = { 'shiftType': action.payload.shiftType, 'cover': { 'id': coverId, 'name': coverName } };
      } else {
        delete getItems[action.payload.day];
      }
      return { ...state, getShift: getItems, counterCaption: state.counterCaption + 1 };
    }
    case ActionTypes.SELECTWORKER: {
      return { ...state, getSelectWorker: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default main;
