import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';


  

@Injectable()
export class SecrityJwt {
 
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){
       
    }
    
   
    async createAccessToken( payload: string ) {
        if (!payload) {
         throw new BadRequestException('Oops something is not working');
        }
        const token = await this.jwtService.sign({sub: payload }, {
            expiresIn:this.configService.get<number>('manager.accessToken.expires'),
            secret: this.configService.get<string>('manager.accessToken.secret') 
        });
        return token
    }
    async createRefreshToken( payload: string ) {
        if (!payload) {
         throw new BadRequestException('Oops something is not working');
        }
        const token = await this.jwtService.sign({sub: payload }, {
            expiresIn:this.configService.get<string>('manager.refreshToken.expires'),
            secret: this.configService.get<string>('manager.refreshToken.secret') 
        });
        return token;
    }
   
    
}
