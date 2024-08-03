import { Injectable } from '@nestjs/common';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ManagerService {

  constructor(
    private readonly db: PrismaService,


  ) {}
 


  findAll() {
    return `This action returns all manager`;
  }

  findEmail(email: string)  {
    return this.db.manager.findUnique({
      where: { email },
    });
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
