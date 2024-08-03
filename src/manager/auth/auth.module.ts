import {  MiddlewareConsumer, Module, NestModule, } from '@nestjs/common';
import { AuthLocalController } from './local/auth-local.controller';
import { AuthLocalService } from './local/auth-local.service';
import { PrismaModule } from 'src/database/prisma.module';
import { SecrtyModule } from 'src/security/security.module';
import { ManagerService } from '../manager/manager.service';
import { AccessTokenStrategy } from './local/strategys/auth-local-at.strategy';
import AccessTokenAuthGuard from './local/Guards/auth-local-at.guard';
import { LocalAuthGuard } from './local/Guards/auth.local.guard';
import { LocalStrategy } from './local/strategys/auth.local.strategy';
import { RefreshTokenAuthGuard } from './local/Guards/auth-local-rt.guard';
import { RefreshTokenStrategy } from './local/strategys/auth-local-rt.strategy';
import { IpInfoMiddleware } from './local/middleware/auth-local-device-detector';


@Module({

    
    imports: [
        PrismaModule,
        SecrtyModule
    ],

    controllers: [
        AuthLocalController
    ],

    providers: [
        AuthLocalService,
        ManagerService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        LocalStrategy,
        LocalAuthGuard,
        AccessTokenAuthGuard,
        RefreshTokenAuthGuard
    ]

})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(IpInfoMiddleware)
        .forRoutes('*'); 
    }
  }
  