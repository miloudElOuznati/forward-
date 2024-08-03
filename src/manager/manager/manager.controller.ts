import { Controller, Get,Request, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { UpdateManagerDto } from './dto/update-manager.dto';
import AccessTokenAuthGuard from '../auth/local/Guards/auth-local-at.guard';


@Controller({version:'1', path: 'api/manager'})

export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  findAll() {
    return this.managerService.findAll();
  }


  @UseGuards(AccessTokenAuthGuard)
  @Get(':email')
  findOne(@Request() req, ) {
    console.log(req)
    return req.user
    // return this.managerService.findEmail(email)
  }


  @UseGuards(AccessTokenAuthGuard)
  @Get('test')
  findid(@Request()req ) {
    console.log('=============contrhhholer=======================');
    console.log("helooo");
    console.log('=============hhh=======================');

    return 'heloo'
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(+id, updateManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
