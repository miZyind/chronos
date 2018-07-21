import { BaseContext } from 'koa';
import operation from '../db/operation';

class WorkController {

  public static async getWorkers(ctx: BaseContext) {
    ctx.body = [];
    let getStatus = await operation.checkTable(ctx.db.getData("/worker/lists"));
    if (getStatus)
      ctx.body = ctx.db.getData("/worker/lists");
    ctx.status = 200;

  }
  public static async getWorker(ctx: BaseContext) {
    ctx.body = [];
    let getId = ctx.params.id;
    let getStatus = await operation.checkTable(ctx.db.getData("/worker/lists"));
    if (getStatus) {
      let table = ctx.db.getData("/worker/lists");
      let getItem = await operation.queryById(table, getId);
      if (getItem)
        ctx.body = getItem;
    }
    ctx.status = 200;
  }

  public static async createWorker(ctx: BaseContext) {
    let addName = ctx.request.body.name;
    let addMobile = ctx.request.body.mobile;
    let addId = 1;
    let getStatus = await operation.checkTable(ctx.db.getData("/worker/lists"));
    if (getStatus) {
      let table = ctx.db.getData("/worker/lists");
      let getLastId = await operation.queryLastId(table);
      addId = parseInt(getLastId) + 1;
    }
    ctx.db.push("/worker/lists[]",{ id: addId, name: addName, mobile: addMobile});
    ctx.status = 200;
   // ctx.db.push("/test4", { test: "test", json: { test: [{ id: 1, name: "t1" }, { id: 2, name: "t2" }] } });
    //ctx.db.push("/worker", { lists: [{ id: 1, name: "t1" }, { id: 2, name: "t2" }, { id: 3, name: "t23" }] } );
    //console.log(ctx.db);
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
  public static async edit(ctx: BaseContext) {
    let editName = ctx.request.body.name;
    let editMobile = ctx.request.body.mobile;
    let editId = parseInt(ctx.request.body.id);
    let getStatus = await operation.checkTable(ctx.db.getData("/worker/lists"));
    if (getStatus) {
      let table = ctx.db.getData("/worker/lists");
      let getIndex = await operation.getIndexById(table, editId);
      if (getIndex != -1) {
        getIndex = parseInt(getIndex);
        ctx.db.delete("/worker/lists[" + getIndex + "]");
      }
      ctx.db.push("/worker/lists[]", { id: editId, name: editName, mobile: editMobile });
    }
    ctx.status = 200;
  }
  public static async delete(ctx: BaseContext) {
    let deleteId = ctx.request.body.id;
    let getStatus = await operation.checkTable(ctx.db.getData("/worker/lists"));
    if (getStatus) {
      let table = ctx.db.getData("/worker/lists");
      let getIndex = await operation.getIndexById(table, editId);
      if (getIndex != -1) {
        getIndex = parseInt(getIndex);
        ctx.db.delete("/worker/lists[" + getIndex + "]");
      }
    }
    ctx.status = 200;
  }

  public static async deleteAll(ctx: BaseContext) {
    ctx.db.delete("/worker/lists");
    ctx.status = 200;
  }
}

export default WorkController
