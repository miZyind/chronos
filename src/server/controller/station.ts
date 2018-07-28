import { IRouterContext} from 'koa-router';
import operation from '../db/operation';

class StationController {
  public static async getAll(ctx: IRouterContext) {
    const getData = await operation.checkTable(ctx.db, '/station');
    ctx.body = getData;
    ctx.status = 200;
  }
  public static async getOne(ctx: IRouterContext) {
    ctx.body = [];
    const getId = parseInt(ctx.params.id);
    const getData = await operation.checkTable(ctx.db, `/station/${getId}`);
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
    const getName = ctx.request.body!.name;
    const getArea = ctx.request.body!.area;
    const getStable = ctx.request.body!.stable;
    const getMobile = ctx.request.body!.mobile;
    const getDesc = ctx.request.body!.desc;
    let addId = 1;
    const getData = await operation.checkTable(ctx.db, '/station');
    if (Object.keys(getData).length) {
      const getLastId = await operation.queryLastId(getData);
      addId = getLastId + 1;
    }
    ctx.db.push(`/station/${addId}`, {
      name: getName,
      area: getArea,
      mobileNumber: getMobile,
      stableNumber: getStable,
      desc: getDesc,
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

export default StationController;
