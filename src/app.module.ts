import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsController } from './persons/persons.controller';
import { PersonsModule } from './persons/persons.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PersonsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
