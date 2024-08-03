import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthLocalService } from '../auth-local.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authLocalService: AuthLocalService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const manager = await this.authLocalService.validateManager(email, password);
      return manager;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
