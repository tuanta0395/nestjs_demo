import {
  Body,
  Controller,
  HttpCode,
  OnApplicationShutdown,
  Post,
  Query,
  Logger,
} from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { from, lastValueFrom, Observable, of } from 'rxjs';
import { scan } from 'rxjs/operators';
import { GCPubSubClient } from '../../lib';

@Controller('pubsub')
export class GCPubSubController implements OnApplicationShutdown {
  static IS_NOTIFIED = false;
  

  client: ClientProxy;

  constructor() {
    this.client = new GCPubSubClient({
      client: {
        apiEndpoint: 'localhost:3000',
        projectId: 'microservice',
      },
    });
  }

  onApplicationShutdown(signal?: string) {
    return this.client.close();
  }

  @Post()
  @HttpCode(200)
  call(@Query('command') cmd, @Body() data: number[]): Observable<number> {
    // Logger.error(data)
    // return null;
    return this.client.send<number>({ cmd }, data);
  }

  @Post('stream')
  @HttpCode(200)
  stream(@Body() data: number[]): Observable<number> {
    return this.client
      .send<number>({ cmd: 'streaming' }, data)
      .pipe(scan((a, b) => a + b));
  }

  @Post('concurrent')
  @HttpCode(200)
  concurrent(@Body() data: number[][]): Promise<boolean> {
    const send = async (tab: number[]) => {
      const expected = tab.reduce((a, b) => a + b);
      const result = await lastValueFrom(
        this.client.send<number>({ cmd: 'sum' }, tab),
      );

      return result === expected;
    };
    return data
      .map(async (tab) => send(tab))
      .reduce(async (a, b) => (await a) && b);
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern({ cmd: 'asyncSum' })
  async asyncSum(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern({ cmd: 'streamSum' })
  streamSum(data: number[]): Observable<number> {
    return of((data || []).reduce((a, b) => a + b));
  }

  @MessagePattern({ cmd: 'streaming' })
  streaming(data: number[]): Observable<number> {
    return from(data);
  }

  @Post('notify')
  async sendNotification(): Promise<any> {
    return this.client.emit<number>('notification', true);
  }

  @EventPattern('notification')
  eventHandler(data: boolean) {
    GCPubSubController.IS_NOTIFIED = data;
  }
}
