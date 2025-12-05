import { Process, Processor } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Job } from "bull";

@Injectable()
@Processor('exampleQueuePrint')
export class ExampleQueuePrintService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(ExampleQueuePrintService.name);
  }

  @Process({ name: 'print', concurrency: 1 })
  async handlePrint(job: Job<{ message: string }>) {
    await new Promise(r => setTimeout(r, 1000));
    this.logger.log({
      type: 'consumer',
      jobName: job.name,
      jobId: job.id,
      message: job.data.message,
      attemptsMade: job.attemptsMade,
    });
  }
}
