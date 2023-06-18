import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map } from 'rxjs/operators';
import { AppLocalsService } from 'src/services/app-locals/app-locals.service';

interface Params {
  id: string;
}

@Injectable()
export class SuperadminApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private appLocalsService: AppLocalsService,
  ) {}

  async getDetail(params: Params): Promise<any> {
    const { costume_header } = this.appLocalsService.getDataAll();
    const url = `/detail/${params.id}`;
    const baseURL = this.configService.get<string>('service.superadmin.url');

    try {
      const response = await this.httpService
        .get(url, {
          baseURL,
          headers: {
            ...costume_header,
          },
        })
        .pipe(
          map((res) => res.data.data),
          catchError((error) => {
            const errorMessage =
              error.response?.data?.message ||
              error.message ||
              'Internal Server Error';
            throw new HttpException(`${errorMessage}`, HttpStatus.BAD_REQUEST);
          }),
        )
        .toPromise();

      return response;
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
