
const checkTable = (db: any, path: string) => {
  let getData = [];
  try {
    getData = db.getData(path);
  } catch (error) {
    console.error();
  }
  return getData;
};

const queryLastId = (parent: any) => {
  let oldId = '0';
  const last = Object.keys(parent).sort().reverse()[0];
  if (last) {
    oldId = last;
  }
  return parseInt(oldId);
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
  countHour,
  queryLastId,
  groupByKey
};
export default operation;
