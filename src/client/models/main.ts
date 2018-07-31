interface IMain {
  isLoading: boolean;
  isCompleted: boolean;
  counterCaption: number;
  getSelectYear: string;
  getSelectMonth: string;
  getDays: number[];
  getSelectArea: string;
  getCovers: any;
}

export {
  IMain
};
