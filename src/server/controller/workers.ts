import { BaseContext } from 'koa';


class WorkController {

  public static async getWorkers(ctx: BaseContext) {
    ctx.status = 200;
    ctx.body = 'Hello World!';
  }

  public static async createWorker(ctx: BaseContext) {
    ctx.status = 201;
    ctx.body = ctx.request.body.name;
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
