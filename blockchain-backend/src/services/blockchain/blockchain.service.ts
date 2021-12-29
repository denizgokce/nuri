import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class BlockchainService {
  constructor(private readonly httpService: HttpService) {}

  getBlocks(): Observable<any[]> {
    return new Observable<any[]>((subscriber) => {
      this.httpService
        .get(
          `https://blockchain.info/blocks/${moment()
            // .add(-1, 'days')
            .valueOf()}?format=json`,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .subscribe(
          (response: AxiosResponse<any>) => {
            if (response.status === 200) {
              subscriber.next(response.data);
            } else {
              subscriber.error(response.statusText);
            }
          },
          (error) => subscriber.error(error),
        );
    });
  }

  getBlockDetail(blockHash: string): Observable<any> {
    return new Observable<any>((subscriber) => {
      this.httpService
        .get(`https://blockchain.info/rawblock/${blockHash}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        .subscribe(
          (response: AxiosResponse<any>) => {
            if (response.status === 200) {
              // response.data.tx = [];
              subscriber.next(response.data);
            } else {
              subscriber.error(response.statusText);
            }
          },
          (error) => subscriber.error(error),
          () => {},
        );
    });
  }
}
