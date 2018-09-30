
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
  workerOptions: Array<{
    id: number,
    name: string,
    mobile: string
  }>;
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
