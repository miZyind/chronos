import { IRouterContext } from 'koa-router';
import operation from '../db/operation';

class ShiftController {
  public static async getAll(ctx: IRouterContext) {
    const getStationData = await operation.checkTable(ctx.db, '/station');
    const getGroupByArea = await operation.groupByKey(getStationData, 'area', 'all');
    const getWorkerData = await operation.checkTable(ctx.db, '/worker');
    const data = { 'station': getGroupByArea, 'worker': getWorkerData};
    ctx.body = data;
    ctx.status = 200;
  }
  public static async getOne(ctx: IRouterContext) {
    ctx.body = [];
    const getYear = ctx.params.year;
    const getMonth = ctx.params.month;
    const getStationId = ctx.params.stationid;
    const getWorkerId = ctx.params.workerid;
    const getData = await operation.checkTable(ctx.db, `/shift/${getYear}/${getMonth}/${getStationId}/${getWorkerId}`);
    if (getData) {
      ctx.body = getData;
    }
    ctx.status = 200;
  }
  public static async getAllByArea(ctx: IRouterContext) {
    ctx.body = [];
    const getArea = ctx.params.area;
    const getData = await operation.checkTable(ctx.db, `/station`);
    if (getData) {
      const getGroupByArea = await operation.groupByKey(getData, 'area', getArea);
      ctx.body = getGroupByArea;
    }
    ctx.status = 200;
  }

  public static async add(ctx: IRouterContext) {
    const getYear = ctx.request.body!.year;
    const getMonth = ctx.request.body!.month;
    const getStationId = ctx.request.body!.stationid;
    const getStationName = ctx.request.body!.stationname;
    const getWorkerId = ctx.request.body!.workerid;
    const getWorkerName = ctx.request.body!.workername;
    const getShift = ctx.request.body!.shift;

    ctx.db.push(`/shift/${getYear}/${getMonth}/${getStationId}/${getWorkerId}`, {
      stationName: getStationName,
      workerName: getWorkerName,
      shift: getShift
    });
    ctx.status = 200;
  }
  public static async edit(ctx: IRouterContext) {
    const getName = ctx.request.body!.name;
    const getArea = ctx.request.body!.area;
    const getStable = ctx.request.body!.stable;
    const getMobile = ctx.request.body!.mobile;
    const getDesc = ctx.request.body!.desc;
    const getId = parseInt(ctx.request.body.id);
    const getData = await operation.checkTable(ctx.db, `/station/${getId}`);
    if (getData) {
      ctx.db.push(`/station/${getId}`, {
        name: getName,
        area: getArea,
        mobileNumber: getMobile,
        stableNumber: getStable,
        desc: getDesc,
      });
    }
    ctx.status = 200;
  }
  public static async delete(ctx: IRouterContext) {
    const getId = parseInt(ctx.request.body.id);
    const getData = await operation.checkTable(ctx.db, `/station/${getId}`);
    if (getData) {
      ctx.db.delete(`/station/${getId}`);
    }
    ctx.status = 200;
  }
}

export default ShiftController;
