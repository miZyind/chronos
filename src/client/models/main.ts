interface IMain {
  isLoading: boolean;
  isCompleted: boolean;
  getSelectShiftYear: string;
  getSelectShiftMonth: string;
  getSelectShiftArea: string;
  getShiftPage: any;
  getShiftDays: number[];
  getSelectCountYear: string;
  getSelectCountMonth: string;
  getDays: number[];
  getSelectArea: string;
  getShift: any;
  getSelectWorker: any;
  modalLoading: boolean;
}

export {
  IMain
};
