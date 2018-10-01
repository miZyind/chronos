import { IRouterContext} from 'koa-router';
import operation from '../libs/operation';

class StationController {
  public static async getAll(ctx: IRouterContext) {
    const getData = await operation.checkTable(ctx.db, '/station');
    ctx.body = getData;
    ctx.status = 200;
  }
  public static async getOne(ctx: IRouterContext) {
    ctx.body = [];
    const getStationId = ctx.params.id;
    const getCurrentYear = (new Date().getFullYear() - 1911).toString();
    const getCurrentMonth = (new Date().getMonth() + 1).toString();
    const getInfoData = await operation.checkTable(ctx.db, `/station/${getStationId}`);
    const getCurrentMonthShiftsData = await operation.checkTable(ctx.db, `/calendar/${getCurrentYear}/${getCurrentMonth}/shift/${getStationId}/nomal`);
    getInfoData.shiftCount = Object.keys(getCurrentMonthShiftsData).length;
    ctx.body = getInfoData;
    ctx.status = 200;
  }
  public static async getAllByArea(ctx: IRouterContext) {
    ctx.body = [];
    const getArea = ctx.params.area;
    const getData = await operation.checkTable(ctx.db, '/station');
    const getGroupByArea = await operation.groupByKey(getData, 'area', getArea);
    ctx.body = getGroupByArea;
    ctx.status = 200;
  }

  public static async add(ctx: IRouterContext) {
    const getName = ctx.request.body!.name;
    const getArea = ctx.request.body!.area;
    const getWorker = ctx.request.body!.worker;
    const getDesc = ctx.request.body!.desc;
    const getDayStart = ctx.request.body!.daystart;
    const getDayEnd = ctx.request.body!.dayend;
    const getNightStart = ctx.request.body!.nightstart;
    const getNightEnd = ctx.request.body!.nightend;
    let addId = 1;
    const getData = await operation.checkTable(ctx.db, '/station');
    if (Object.keys(getData).length) {
      const getLastId = await operation.queryLastId(getData);
      addId = getLastId + 1;
    }
    ctx.db.push(`/station/${addId}`, {
      id: addId,
      name: getName,
      area: getArea,
      workerNumber: getWorker,
      dayStart: getDayStart,
      dayEnd: getDayEnd,
      nightStart: getNightStart,
      nightEnd: getNightEnd,
      desc: getDesc,
    });
    ctx.status = 200;
  }
  public static async edit(ctx: IRouterContext) {
    const getName = ctx.request.body!.name;
    const getArea = ctx.request.body!.area;
    const getWorker = ctx.request.body!.worker;
    const getDesc = ctx.request.body!.desc;
    const getDayStart = ctx.request.body!.daystart;
    const getDayEnd = ctx.request.body!.dayend;
    const getNightStart = ctx.request.body!.nightstart;
    const getNightEnd = ctx.request.body!.nightend;
    const getId = parseInt(ctx.request.body.id);
    const getData = await operation.checkTable(ctx.db, `/station/${getId}`);
    if (getData) {
      ctx.db.push(`/station/${getId}`, {
        id: getId,
        name: getName,
        area: getArea,
        workerNumber: getWorker,
        dayStart: getDayStart,
        dayEnd: getDayEnd,
        nightStart: getNightStart,
        nightEnd: getNightEnd,
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

export default StationController;
