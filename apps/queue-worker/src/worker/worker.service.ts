import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Queue } from "bull";

@Injectable()
export class WorkerService {
  private readonly logger: Logger;

  constructor(
    @InjectQueue('exampleQueuePrint') private exampleQueuePrint: Queue,
    @InjectQueue('exampleQueueAdd') private exampleQueueAdd: Queue,
  ) {
    this.logger = new Logger(WorkerService.name);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async enqueuePrintJobs() {
    // enqueue print-string jobs
    const messages = ['hello', 'from', 'queue-worker'];
    for (const message of messages) {
      const job = await this.exampleQueuePrint.add('print', { message }, {
        priority: 1000,
        attempts: 3,
        timeout: 60000,
        delay: 0,
        removeOnComplete: true,
      });
      this.logger.log({ type: 'producer:print', queue: 'exampleQueuePrint', jobId: job.id, message: job.data.message });
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async enqueueAddJobs() {
    const pairs = [
      { a: 1, b: 2 },
      { a: 5, b: 7 },
      { a: 10, b: 15 },
    ];
    for (const payload of pairs) {
      const job = await this.exampleQueueAdd.add('add', payload, {
        priority: 1000,
        attempts: 3,
        timeout: 60000,
        delay: 0,
        removeOnComplete: true,
      });
      this.logger.log({ type: 'producer:add', queue: 'exampleQueueAdd', jobId: job.id, a: payload.a, b: payload.b });
    }
  }
}
