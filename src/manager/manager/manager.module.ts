import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { PrismaModule } from 'src/database/prisma.module';
import AccessTokenAuthGuard from '../auth/local/Guards/auth-local-at.guard';
import { AccessTokenStrategy } from '../auth/local/strategys/auth-local-at.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule,PrismaModule],
  controllers: [ManagerController],
  providers: [AccessTokenStrategy,AccessTokenAuthGuard,ManagerService],
})
export class ManagerModule {}
