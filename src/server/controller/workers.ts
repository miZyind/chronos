import { BaseContext } from 'koa';
import operation from '../db/operation';

class WorkController {

  public static async getWorkers(ctx: BaseContext) {
    let data1 = ctx.db.getData("/worker/lists");
    ctx.status = 200;
    ctx.body = data1;
  }
  public static async getWorker(ctx: BaseContext) {
    let getId = ctx.params.id;
    let ss = ctx.db.getData("/worker/lists");
    let secondElement = operation.queryById(ss, getId);

    ctx.status = 200;
    ctx.body = secondElement.name;
  }

  public static async createWorker(ctx: BaseContext) {
    ctx.body = ctx.request.body.name;
    //ctx.db.push("/test1", ctx.request.body.name);
    ctx.status = 201;
   // ctx.db.push("/test4", { test: "test", json: { test: [{ id: 1, name: "t1" }, { id: 2, name: "t2" }] } });
    ctx.db.push("/worker", { lists: [{ id: 1, name: "t1" }, { id: 2, name: "t2" }, { id: 3, name: "t23" }] } );
    console.log(ctx.db);
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

}

export default WorkController
