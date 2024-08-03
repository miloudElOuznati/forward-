import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SinUpAuthLocalDto } from './dto/sinup-manager-auth.local.dto';
import { PrismaService } from 'src/database/prisma.service';
import { SecurityBcrypt } from 'src/security/security.bcrypt';
import { SecrityJwt } from 'src/security/security.jwt';
import * as crypto from 'crypto';
import { SecrityCoockies } from 'src/security/security.cookies';
import { Response } from 'express';
import { ManagerService } from 'src/manager/manager/manager.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthLocalService {
  constructor(
    private readonly db: PrismaService,
    private readonly managerService: ManagerService,
    private readonly securityBcrypt: SecurityBcrypt,
    private readonly secrityJwt: SecrityJwt,
    private readonly secrityCoockies: SecrityCoockies,
    private readonly configService: ConfigService,
  ) {}

  async sinUp(data: SinUpAuthLocalDto, res: Response) {
    const { email,  password  } = data;
    // Meck sure the email is unique
    const foundEmail = await this.managerService.findEmail(email);
    if ( foundEmail ) {
      throw new BadRequestException(" email already exists");
    }
    //     Start hashedPassword
    const hashedPassword = await this.securityBcrypt.HashedPassword(password)
    // end  hashedPassword:

    const result = {
      ...data,
      password: hashedPassword,
    }
    // craete new manager
    const newMaager =  await this.db.manager.create({
      data: result
    });
    // craete new access token 
    const accesstoken =  await this.secrityJwt.createAccessToken(newMaager.id)
      // craete new refrash token 
    const refreshToken =  await this.secrityJwt.createRefreshToken(newMaager.id)
    // send Access token to Coockie
      await this.secrityCoockies.CreateCookie("sessionId" ,accesstoken, res)   
    // send Refrash token to Coockie
      await this.secrityCoockies.CreateCookie("account_session",refreshToken,res)  
    // send respons
    return 'sinUp succefully';
  }

  async  login( managerId: string , res: Response) { 

      // craete new access token 
      const accesstoken =  await this.secrityJwt.createAccessToken(managerId)
      // craete new refrash token 
      const refreshToken =  await this.secrityJwt.createRefreshToken(managerId)
    // send Access token to Coockie
    await this.secrityCoockies.CreateCookie("sessionId" ,accesstoken, res)   
    // send Refrash token to Coockie
      await this.secrityCoockies.CreateCookie("account_session",refreshToken,res)   
    // send respons
    return 'login succefully';
         
  };

  async refrashToken(managerId: string, res: Response){
    // craete new access token 
    const accesstoken =  await this.secrityJwt.createAccessToken(managerId)
    // craete new refrash token 
    const refreshToken =  await this.secrityJwt.createRefreshToken(managerId)
  //  send Access token to Coockie
   await this.secrityCoockies.CreateCookie("sessionId" ,accesstoken, res)   
  //  send Refrash token to Coockie
    await this.secrityCoockies.CreateCookie("account_session",refreshToken,res)  


   return 'Tokens refreshed successfully';


  }

  async validateManager(email: string, password: string): Promise<any> {
    const manager = await this.managerService.findEmail(email);
    // validate email is already exists and ComparePassword
    if (manager && await this.securityBcrypt.ComparePassword(password, manager.password)) {
      return manager.id
    }
    throw new UnauthorizedException('Invalid credentials');
  }
 
}
