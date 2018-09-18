import { IRouterContext } from 'koa-router';
import operation from '../libs/operation';

class CountController {
  public static async getAllByMonth(ctx: IRouterContext) {
    const getYear = ctx.params.year;
    const getMonth = ctx.params.month;
    const getCountData = await operation.checkTable(ctx.db, `/hourCounts/${getYear}/${getMonth}`);
    ctx.body = getCountData;
    ctx.status = 200;
  }
  public static async getOneByWorker(ctx: IRouterContext) {
    const getYear = ctx.params.year;
    const getMonth = ctx.params.month;
    const getWorkerId = ctx.params.worker;
    const totalCountShifts: any[] = [];
    const getStationData = await operation.checkTable(ctx.db, `/station`);
    const getWorkerData = await operation.checkTable(ctx.db, `/worker`);
    const getWorkerShiftCount = operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/countMark/${getWorkerId}`);
    const getShiftsByCountMark = getWorkerShiftCount.shift;
    Object.keys(getShiftsByCountMark).map((stationId: string) => {
      console.log(stationId);
      const getStationId = getShiftsByCountMark[stationId].station;
      let getStationName = '無';
      if (getStationData[getStationId].name) {
        getStationName = getStationData[getStationId].name;
      }
      if (getShiftsByCountMark[stationId].type === 'nomal') {
        const getShift = operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${getStationId}/nomal/${getWorkerId}`);
        const dayCount = getShift.day.length;
        const nightCount = getShift.night.length;
        const type = '正常班';
        const countShift = { 'stationName': getStationName, 'type': type, 'dayCount': dayCount, 'nightCount': nightCount, 'coverCount': 0 };
        totalCountShifts.push(countShift);
      } else if (getShiftsByCountMark[stationId].type === 'cover') {
        const nomalWorkerId = getShiftsByCountMark[stationId].nomalWorker;
        let getNomalWorkerName = '無';
        if (getWorkerData[nomalWorkerId]) {
          getNomalWorkerName = getWorkerData[nomalWorkerId].name;
        }
        const getShift = operation.checkTable(ctx.db, `/calendar/${getYear}/${getMonth}/shift/${getStationId}/cover/${nomalWorkerId}/${getWorkerId}`);
        const coverCount = getShift.coverDay.length;
        const type = `代班(${getNomalWorkerName})`;
        const countShift = { 'stationName': getStationName, 'type': type, 'dayCount': 0, 'nightCount': 0, 'coverCount': coverCount };
        totalCountShifts.push(countShift);
      }
    });
    ctx.body = totalCountShifts;
    ctx.status = 200;
  }
}

export default CountController;
