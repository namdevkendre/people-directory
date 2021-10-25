import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PrismaService } from '../prisma/prisma.service';
import { PersonsController } from './persons.controller';

@Module({
  providers: [PersonsService, PrismaService],
  controllers: [PersonsController]
})
export class PersonsModule {}
