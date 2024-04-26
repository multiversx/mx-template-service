import { Injectable } from "@nestjs/common";
import { configuration } from "./configuration";

@Injectable()
export class CommonConfigService {
  readonly config = configuration().libs.common;
}
