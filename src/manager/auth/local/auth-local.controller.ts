import { Controller, Post, Body, Res, Request, UseGuards, Get, Req } from '@nestjs/common';
import { SinUpAuthLocalDto } from './dto/sinup-manager-auth.local.dto';
import { AuthLocalService } from './auth-local.service';
import { Response } from 'express';
import { LocalAuthGuard } from './Guards/auth.local.guard';
import { LoginAuthLocalDto } from './dto/login-manager-auth.local.dto';
import { RefreshTokenAuthGuard } from './Guards/auth-local-rt.guard';
import { UAParser } from 'ua-parser-js';






@Controller({version:'1', path: 'api/auth'})

export class AuthLocalController{

  constructor(
    private readonly authLocalService: AuthLocalService,

  ) {}
    
 @Post('sinup')
  async signup(@Body() dto: SinUpAuthLocalDto, @Res({ passthrough: true }) res: Response ) {
     return this.authLocalService.sinUp(dto,res);
  };

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body()dto: LoginAuthLocalDto, @Request()req , @Res({passthrough: true}) res: Response )  {
    return await this.authLocalService.login(req.user, res)
  };

//  @Post('logout')
//   signout( @Res() res) {
//     return this.authService.logout( res);
//   }
  @UseGuards(RefreshTokenAuthGuard)
  @Get('refreshToken')
  async refreshToken(@Request() req, @Res({ passthrough: true }) res: Response) {
   return await this.authLocalService.refrashToken(req.user, res);
  }

  @Get('device')
  getIpInfo(@Req() req: Request) {
    return req['ipInfo'];
  }
  
}


