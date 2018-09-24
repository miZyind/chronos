interface IMain {
  isLoading: boolean;
  isCompleted: boolean;
  counterCaption: number;
  getSelectShiftYear: string;
  getSelectShiftMonth: string;
  getSelectShiftArea: string;
  getShiftPage: any;
  getShiftDays: number[];
  getSelectYear: string;
  getSelectMonth: string;
  getDays: number[];
  getSelectArea: string;
  getShift: any;
  getSelectWorker: any;
  modalLoading: boolean;
}

export {
  IMain
};
