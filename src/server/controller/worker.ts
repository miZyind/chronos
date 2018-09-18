import { IRouterContext} from 'koa-router';
import operation from '../libs/operation';

class WorkController {
  public static async getAll(ctx: IRouterContext) {
    const getData = await operation.checkTable(ctx.db, '/worker');
    ctx.body = getData;
    ctx.status = 200;
  }
  public static async getOne(ctx: IRouterContext) {
    ctx.body = [];
    const getId = parseInt(ctx.params.id);
    const getData = await operation.checkTable(ctx.db, `/worker/${getId}`);
    if (getData) {
      ctx.body = getData;
    }
    ctx.status = 200;
  }

  public static async add(ctx: IRouterContext) {
    const getName = ctx.request.body!.name;
    const getMobile = ctx.request.body!.mobile;
    let addId = 1;
    const getData = await operation.checkTable(ctx.db, '/worker');
    if (Object.keys(getData).length) {
      const getLastId = await operation.queryLastId(getData);
      addId = getLastId + 1;
    }
    ctx.db.push(`/worker/${addId}`, { id: addId, name: getName, mobile: getMobile });
    ctx.status = 200;
   // ctx.db.push('/test4', { test: 'test', json: { test: [{ id: 1, name: 't1' }, { id: 2, name: 't2' }] } });
    // ctx.db.push('/worker', { lists: [{ id: 1, name: 't1' }, { id: 2, name: 't2' }, { id: 3, name: 't23' }] } );
    // console.log(ctx.db);
    // userToBeSaved.name = ctx.request.body.name;
    // userToBeSaved.email = ctx.request.body.email;

    // validate user entity
    // const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors
    // if (errors.length > 0) {
    //   // return BAD REQUEST status code and errors array
    //   ctx.status = 400;
    //   ctx.body = errors;
    // } else if (await userRepository.findOne({ email: userToBeSaved.email })) {
    //   // return BAD REQUEST status code and email already exists error
    //   ctx.status = 400;
    //   ctx.body = 'The specified e-mail address already exists';
    // } else {
    //   // save the user contained in the POST body
    //   const user = await userRepository.save(userToBeSaved);
    //   // return CREATED status code and updated user
    //   ctx.status = 201;
    //   ctx.body = user;
    // }
  }
  public static async edit(ctx: IRouterContext) {
    const getName = ctx.request.body.name;
    const getMobile = ctx.request.body.mobile;
    const getId = parseInt(ctx.request.body.id);
    const getData = await operation.checkTable(ctx.db, `/worker/${getId}`);
    if (getData) {
      ctx.db.push(`/worker/${getId}`, { id: getId, name: getName, mobile: getMobile });
    }
    ctx.status = 200;
  }
  public static async delete(ctx: IRouterContext) {
    const getId = parseInt(ctx.request.body.id);
    const getData = await operation.checkTable(ctx.db, `/worker/${getId}`);
    if (getData) {
      ctx.db.delete(`/worker/${getId}`);
    }
    ctx.status = 200;
  }
}

export default WorkController;
