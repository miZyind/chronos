
interface IFetch {
  workerListItems: {
    [index: string]: {
      name: string,
      mobile: string
    }
  };
  countListItems: any;
  stationListItems: any;
  workerEditShiftItems: any;
  stationShiftItems: any;
  shiftEditItems: any;
  items: any;
  loading: boolean;
  sendfinish: boolean;
  error: any;
}

export {
  IFetch
};
