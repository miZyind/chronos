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
let getDaysInMonth = (getdays: number[], month: number, year: number) => {
  for (var i = 1; i <= getLastDayInMonth(month, year); i++) 
    getdays.push(i);
  return getdays;
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
  getdays: getDaysInMonth([], parseInt(getCurrentMonth()), parseInt(getCurrentTaiwanYear()))
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
      state.getdays = getDaysInMonth([],parseInt(state.getSelectMonth), getCommonEra(parseInt(action.payload)));
      return { ...state, getSelectYear: action.payload,getdays: state.getdays };    
    }
    case ActionTypes.SELECTMONTH: {
      state.getdays = getDaysInMonth([],parseInt(action.payload), getCommonEra(parseInt(state.getSelectYear)));
      return { ...state, getSelectMonth: action.payload, getdays: state.getdays};
    }  
    default: {
      return state;
    }
  }
};

export default main;
