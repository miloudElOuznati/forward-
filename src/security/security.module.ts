import { Module } from '@nestjs/common';
import { SecurityBcrypt } from './security.bcrypt';
import { SecrityCoockies } from './security.cookies';
import { SecrityJwt } from './security.jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
    exports: [SecurityBcrypt , SecrityCoockies,SecrityJwt,JwtService],
    providers: [SecurityBcrypt , SecrityCoockies,SecrityJwt,JwtService, ConfigService]
})
export class SecrtyModule {}
