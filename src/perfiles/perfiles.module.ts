import { Module } from '@nestjs/common';
import { PerfilesService } from './perfiles.service';
import { PerfilesController } from './perfiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfiles } from './perfiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfiles])],
  providers: [PerfilesService],
  controllers: [PerfilesController],
})
export class PerfilesModule {}
