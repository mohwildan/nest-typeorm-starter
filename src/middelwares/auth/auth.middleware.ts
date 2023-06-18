import {HttpException, Injectable, NestMiddleware} from '@nestjs/common';
import {AppLocalsService} from 'src/services/app-locals/app-locals.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private appLocalsService: AppLocalsService) {}
  use(req: any, res: any, next: () => void) {
    let id: string = '';
    let isSuperadmin: boolean = false;
    let customHeader: any = {};
    const superadminID: any =
      req.headers['x-kong-jwt-claim-superadmin_id'] || false;
    const userID: any = req.headers['x-kong-jwt-claim-user_id'] || false;
    // validation
    if (!(superadminID || userID)) {
      throw new HttpException('Unauthorized', 401);
    }
    try {
      // check superadmin or user
      if (superadminID) {
        isSuperadmin = true;
        id = superadminID;
        customHeader = {
          'x-kong-jwt-claim-superadmin_id': id,
        };
      } else {
        id = userID;
        customHeader = {
          'x-kong-jwt-claim-user_id': id,
        };
      }

      // check valid id
      if (!id) {
        throw new HttpException('Unauthorized ID', 401);
      }

      this.appLocalsService.setData('is_superadmin', isSuperadmin);
      this.appLocalsService.setData('costume_header', customHeader);
      this.appLocalsService.setData('id', id);

      next();
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }
}
