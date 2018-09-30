const checkTable = (db: any, path: string) => {
  let getData = [];
  try {
    getData = db.getData(path);
  } catch (error) {
    console.error();
  }
  return getData;
};

const getPath = (name: string) => {
  const pathData = [
    { title: 'all stations', path: `/station` },
    { title: 'all workers', path: `/worker` }
  ];
  // tslint:disable-next-line:no-shadowed-variable
  let getPath = '';
  pathData.map((path: any) => {
    if (path.title === name) {
      getPath = path.path;
    }
  });
  return getPath;
};

const initEveryDayPerMonth = (days: number) => {
  const shifts: any = [];
  for (let i = 0; i < days; i++) {
    shifts[i] = {'type': '無'};
  }
  return shifts;
};

const checkNameExit = (getName: string) => {
  let name = 'no name';
  if (getName) {
    name = getName;
  }
  return name;
};

const pushNomalDayTypeToShifts = (dayArray: any, type: string, shiftArray: any) => {
  if (dayArray) {
    dayArray.map((dayId: number) => {
      shiftArray[dayId - 1] = { 'type': type };
    });
  }
  return shiftArray;
};

const queryLastId = (parent: any) => {
  let oldId = '0';
  const last = Object.keys(parent).sort().reverse()[0];
  if (last) {
    oldId = last;
  }
  return parseInt(oldId);
};

const fuzzySearchByCondition = (obj: any, key: string, val: string, constraintIdObj?: any) => {
  const objects: any[] = [];
  Object.keys(obj).map((worker: any) => {
    if (obj[worker][key].indexOf(val) > -1) {
      if (constraintIdObj.length > 0) {
        if (constraintIdObj.indexOf(parseInt(obj[worker].id)) < 0) {
          objects.push(obj[worker]);
        }
      } else {
        objects.push(obj[worker]);
      }
    }
  });
  return objects;
};

const countHour = (start: string, end: string) => {
  const getStart = start.split(':');
  const getStartHour = parseInt(getStart[0]);
  const getStartMin = parseInt(getStart[1]);
  const getEnd = end.split(':');
  const getEndtHour = parseInt(getEnd[0]);
  const getEndMin = parseInt(getEnd[1]);
  const getTimeDiff = (Math.abs(((getStartHour - 12) - (getEndtHour - 12))) * 60 + (getEndMin - getStartMin)) / 60;
  return getTimeDiff;
};

const groupByKey = (data: any, key: string, condition: string) => {
  const groupedData = Object.keys(data).reduce((result: any, current) => {
    const getItemValue = data[current][result.key];
    const getItem = data[current];
    getItem.id = current;
    const getCondition = result.condition;
    if (getCondition === 'all') {
      result[getItemValue] = result[getItemValue] || [];
      result[getItemValue].push(data[current]);
    } else {
      if (getItemValue === getCondition) {
        result[getItemValue] = result[getItemValue] || [];
        result[getItemValue].push(data[current]);
      }
    }
    return result;
  }, { 'key': key, 'condition': condition});
  delete groupedData.key;
  delete groupedData.condition;
  return groupedData;
};

const operation = {
  checkTable,
  getPath,
  initEveryDayPerMonth,
  checkNameExit,
  pushNomalDayTypeToShifts,
  queryLastId,
  fuzzySearchByCondition,
  countHour,
  groupByKey
};
export default operation;
