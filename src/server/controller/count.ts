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
}

export default CountController;
