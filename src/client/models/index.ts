// Model
import { IMain } from './main';
import { IFetch } from './fetch';

export interface IStore {
  main: IMain ;
  work: IFetch;
}
