// Helper
import createAction from '@helpers/create-action';
import { ActionsUnion } from '@helpers/actions-union';

enum ActionTypes {
  TOGGLE_LOADING_STATUS = '[main] toggle loading status',
  TOGGLE_STEP_STATUS = '[main] toggle step status',
  INCREMENT = '[main] increment',
  DECREMENT = '[main] decrement',
  SELECTYEAR = '[main] selectyear',
  SELECTMONTH = '[main] selectmonth',
}

const Actions = {
  toggleLoadingStatus: () => createAction(ActionTypes.TOGGLE_LOADING_STATUS),
  toggleStepStatue: () => createAction(ActionTypes.TOGGLE_STEP_STATUS),
  increment: () => createAction(ActionTypes.INCREMENT),
  decrement: () => createAction(ActionTypes.DECREMENT),
  selectyear: (val: string) => createAction(ActionTypes.SELECTYEAR, val),
  selectmonth: (val: string) => createAction(ActionTypes.SELECTMONTH, val),
};

type Actions = ActionsUnion<typeof Actions>;

export {
  ActionTypes,
  Actions
};
