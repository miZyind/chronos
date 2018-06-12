// Action
import { ActionTypes, Actions } from '@actions/main';
// Model
import { IMain } from '../models/main';

let getCurrentMonth = () => {
  return (new Date().getMonth() + 1).toString()
}
let getCurrentTaiwanYear = () => {
  return (new Date().getFullYear() - 1911).toString()
}
let getDaysInMonth = (getDays: number[], month: number, year: number) => {
  for (var i = 1; i <= getLastDayInMonth(month, year); i++) 
    getDays.push(i);
  return getDays;
}
let getLastDayInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
}
let getCommonEra = (year: number) => {
  return year + 1911;
}
const initState: IMain = {
  isLoading: true,
  isCompleted: false,
  counterCaption: 0,
  getSelectYear: getCurrentTaiwanYear(),
  getSelectMonth: getCurrentMonth(),
  getDays: getDaysInMonth([], parseInt(getCurrentMonth()), parseInt(getCurrentTaiwanYear())),
  getShift:''
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
      state.getDays = getDaysInMonth([],parseInt(state.getSelectMonth), getCommonEra(parseInt(action.payload)));
      return { ...state, getSelectYear: action.payload, getDays: state.getDays };    
    }
    case ActionTypes.SELECTMONTH: {
      state.getDays = getDaysInMonth([],parseInt(action.payload), getCommonEra(parseInt(state.getSelectYear)));
      return { ...state, getSelectMonth: action.payload, getDays: state.getDays};
    }
    case ActionTypes.ADDSHILT: {
      console.log(action.payload);
      return { ...state, getShift: state.getShift+action.payload };
    }
    default: {
      return state;
    }
  }
};

export default main;
