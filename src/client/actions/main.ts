// Helper
import createAction from '@helpers/create-action';
import { ActionsUnion } from '@helpers/actions-union';

enum ActionTypes {
  TOGGLE_LOADING_STATUS = '[main] toggle loading status',
  TOGGLE_STEP_STATUS = '[main] toggle step status',
  INCREMENT = '[main] increment',
  DECREMENT = '[main] decrement',
  SELECTYEAR = '[dayline] selectyear',
  SELECTMONTH = '[dayline] selectmonth',
  ADDSHILT = '[add] addshift',
}

const Actions = {
  toggleLoadingStatus: () => createAction(ActionTypes.TOGGLE_LOADING_STATUS),
  toggleStepStatue: () => createAction(ActionTypes.TOGGLE_STEP_STATUS),
  increment: () => createAction(ActionTypes.INCREMENT),
  decrement: () => createAction(ActionTypes.DECREMENT),
  selectyear: (val: string) => createAction(ActionTypes.SELECTYEAR, val),
  selectmonth: (val: string) => createAction(ActionTypes.SELECTMONTH, val),
  addshift: (val1: string, val2: number) => createAction(ActionTypes.ADDSHILT, val1 + '-' + val2),
};

type Actions = ActionsUnion<typeof Actions>;

export {
  ActionTypes,
  Actions
};
