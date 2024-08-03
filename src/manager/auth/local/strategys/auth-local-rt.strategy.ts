import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "RefreshToken") {
  constructor(
    private readonly db: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
        let token = null;
        if (request && request.cookies) {
          token = request.cookies['account_session'];
        }
        return token;
      }]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('manager.refreshToken.secret'),
    });
  }

  async validate(payload: any) {
    const manager = await this.db.manager.findUnique({ where: { id: payload.sub } });
    console.log(manager);
    if (!manager) {
      console.log('====================================');
      console.log("heloo");
      console.log('====================================');
    }
    return manager.id;
  }
}
