const optionYears = [
  { title: '107年', key: '107' },
  { title: '108年', key: '108' },
  { title: '109年', key: '109' },
];

const optionAreas = [
  { title: '全部', key: 'all' },
  { title: '北區', key: '北區' },
  { title: '中區', key: '中區' },
  { title: '南區', key: '南區' },
  { title: '東區', key: '東區' },
];

const weekDayCht = ['日', '一', '二', '三', '四', '五', '六'];

const optionMonths = [
  { title: '1月', key: '1' },
  { title: '2月', key: '2' },
  { title: '3月', key: '3' },
  { title: '4月', key: '4' },
  { title: '5月', key: '5' },
  { title: '6月', key: '6' },
  { title: '7月', key: '7' },
  { title: '8月', key: '8' },
  { title: '9月', key: '9' },
  { title: '10月', key: '10' },
  { title: '11月', key: '11' },
  { title: '12月', key: '12' },
];

const getCommonEra = (year: number) => {
  return year + 1911;
};

const getWeekDay = (year: string, month: string, day: string) => {
  const getYear = (parseInt(year) + 1911).toString;
  const date = `${getYear}-${month}-${day}`;
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
const shiftPageListCounts = 5;

const shift = {
  optionYears,
  optionAreas,
  weekDayCht,
  optionMonths,
  getCommonEra,
  getWeekDay,
  dayPrint,
  shiftPageListCounts
};
export default shift;
