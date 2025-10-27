import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
