interface IMain {
  isLoading: boolean;
  isCompleted: boolean;
  counterCaption: number;
  getSelectYear: string;
  getSelectMonth: string;
  getDays: number[];
  getSelectArea: string;
  getShift: {
    [index: string]: {
      shiftType: string,
      cover: {
        name: string,
        id: string
      }
    }
  };
  getSelectWorker: any;
  modalLoading: boolean;
}

export {
  IMain
};
