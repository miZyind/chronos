
interface IFetch {
  workerListItems: {
    [index: string]: {
      name: string,
      mobile: string
    }
  };
  countListItems: any;
  countByWorkerListItems: Array<{ id: string }>;
  stationListItems: any;
  workerEditShiftItems: any;
  stationShiftsListByMonthArea: any;
  shiftEditItems: any;
  items: any;
  loading: boolean;
  sendfinish: boolean;
  error: any;
  totalStationByMonthArea: number;
}

export {
  IFetch
};
