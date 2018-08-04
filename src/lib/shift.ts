import { Table } from 'semantic-ui-react';

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];

const getCommonEra = (year: number) => {
  return year + 1911;
};

const getWeekDay = (year: string, month: string, day: string) => {
  const date = `${year}-${month}-${day}`;
  const weekDay: number = new Date(date).getDay();
  return weekDayCht[weekDay];
};

const dayPrint = (db: any, path: string) => {
  let getData = [];
  try {
    getData = db.getData(path);
  } catch (error) {
    console.error();
  }
  return getData;
};

// const printWorker = (name: string, style) => {
//   const rows: JSX.Element[] = [];
//   if (name.length > 0) {
//     rows.push(<Table.Cell  > { name } < /Table.Cell>);
//   } else {
//     rows.push(<Table.Cell style={ tabHeaderCellStyle } />);
//   }
//   return rows;
// };

const shift = {
  weekDayCht,
  getWeekDay,
  getCommonEra,
  dayPrint,
};
export default shift;
