import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersController } from './members.controller';
import { Member } from './member.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Member]), 
  ],
  providers: [MembersService],
  controllers: [MembersController]
})
export class MembersModule {}
