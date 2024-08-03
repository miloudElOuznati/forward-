import {  Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ManagerModule } from './manager/manager/manager.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import configuration from './config/configuration';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load:[configuration]
    }),
    PassportModule,
    JwtModule,
    ManagerModule
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
