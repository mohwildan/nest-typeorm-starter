import { Injectable } from '@nestjs/common';
import { CostumeHeader } from 'src/types/contume_header.type';

@Injectable()
export class AppLocalsService {
  private data: any = {};

  setData(key: string, value: any) {
    this.data[key] = value;
  }

  getData<T>(key: keyof CostumeHeader): T {
    return this.data[key];
  }

  getDataAll(): CostumeHeader {
    return this.data;
  }

  removeData(key: string) {
    delete this.data[key];
  }
}
