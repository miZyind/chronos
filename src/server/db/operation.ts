
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
  queryLastId,
  groupByKey
};
export default operation;
