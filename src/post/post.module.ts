import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './models/post.model';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { GCPubSubController } from './controllers/gc-pubsub.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([PostEntity])
  ],
  controllers: [PostController, GCPubSubController],
  providers: [PostService]
})
export class PostModule {}
