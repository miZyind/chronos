// Node module
import { combineReducers } from 'redux';
// Model
import { IStore } from '../models';
// Reducer
import main from '@reducers/main';
import fetch from '@reducers/fetch';

export default combineReducers<IStore>({
  main,
  fetch
} as any);
