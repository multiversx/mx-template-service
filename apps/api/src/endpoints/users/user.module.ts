import { Module } from '@nestjs/common';
import { DatabaseModule } from '@mvx-monorepo/common';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
