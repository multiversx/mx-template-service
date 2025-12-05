import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('exampleQueueAdd')
export class ExampleQueueAddService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ExampleQueueAddService.name);
  }

  @Process({ name: 'add', concurrency: 2 })
  async handleAdd(job: Job) {
    const { a, b } = job.data;
    const sum = a + b;
    await new Promise(r => setTimeout(r, 1500));
    this.logger.log({
      type: 'consumer',
      jobName: job.name,
      jobId: job.id,
      a,
      b,
      sum,
      attemptsMade: job.attemptsMade,
    });
    return sum;
  }
}
