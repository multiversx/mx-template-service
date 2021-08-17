import { createParamDecorator } from "@nestjs/common";

export const Jwt = createParamDecorator((data, req) => {
  let jwt = req.args[0].jwt;

  return jwt && data ? jwt[data] : jwt;
});