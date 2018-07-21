// Node module
import { combineReducers } from 'redux';
// Model
import { IStore } from '../models';
// Reducer
import main from '@reducers/main';
import work from '@reducers/work';

export default combineReducers<IStore>({
  main,
  work
} as any);
