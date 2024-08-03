import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as ipinfo from 'ipinfo';
import * as UAParser from 'ua-parser-js';

@Injectable()
export class IpInfoMiddleware implements NestMiddleware {
  private readonly token: string = 'afbd62d2e40fab'; // أدخل رمز الوصول الخاص بك هنا


  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';
    
    const ipInfoPromise = new Promise((resolve, reject) => {
      ipinfo(ip, this.token, (err, cInfo) => {
        if (err) {
          reject(err);
        } else {
          resolve(cInfo);
        }
      });
    });

    const ipInfo = await ipInfoPromise;
    const uaParser = new UAParser(userAgent);
    const uaInfo = uaParser.getResult();

    req['ipInfo'] = {
      ipInfo,
      userAgentInfo: uaInfo,
    };

    next();
  }
}
