import { BaseContext } from 'koa';

const checkTable = (tableData: any) => {
  let status = false;
  try {
    tableData;
    status = true;
  } catch (error) {
    console.error(error);
  };
  return status;
};


const queryById = (parent: any, getId: number) => {
  return parent.find((item: any) => {
    return item.id == getId;
  });
};

const queryLastId = (parent: any) => {
  let oldId = 0;
  let last = parent.slice(-1)[0];
  if (last)
    oldId = last.id;
  return oldId;
};

const getIndexById = (parent: any, getId: number) => {
  let getIndex = -1;
  for (let i = 0; i < parent.length; i++)
    if (parent[i].id == getId)
      getIndex = i;
  return getIndex
};

const operation = {
  checkTable,
  queryById,
  queryLastId,
  getIndexById
}
export default operation;
