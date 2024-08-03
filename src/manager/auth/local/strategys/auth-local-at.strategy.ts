import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,"AccessToken") {
  constructor(
    private readonly db: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
        let token = null;
        if (request && request.cookies) {
          token = request.cookies['sessionId'];
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('manager.accessToken.secret'),
    });
  }

  async validate(payload: any) {
    const manager = await this.db.manager.findUnique({where:{id: payload.sub}})
    return manager;
  }
}
