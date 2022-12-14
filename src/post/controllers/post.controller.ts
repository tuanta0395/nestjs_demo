import { Body, Controller, Delete, Get, Param, Post, Put, Query, OnApplicationShutdown, HttpCode, } from '@nestjs/common';
import { query } from 'express';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePostDto } from '../dto/post.dto';
import { interPost } from '../models/post.interface';
import { PostService } from '../services/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(200)
  async createPost(@Body() postDTO: CreatePostDto) {
    this.postService.createPost(postDTO);
  }

  @Get()
  async findAllPosts(): Promise<interPost[]> {
    return this.postService.findAllPosts();
  }
}

// @Controller('post')
// export class PostController {
//     constructor(private postService: PostService){}

//     @Post()
//     create(@Body() post: interPost): Observable<interPost>{
//         return this.postService.createPost(post);
//     }

//     @Get()
//     findAll(): Observable<interPost[]>{
//         return this.postService.findAllPosts();
//     }

//     @Get(':id')
//     getById(@Param('id') id: string): Observable<interPost>{
//         return this.postService.findPostById(id);
//     }

//     @Put(':id')
//     update(
//         @Param('id') id: string,
//         @Body() post: interPost,
//     ):Observable<UpdateResult>{
//         return this.postService.updatePost(id, post);
//     }

//     @Delete(':id')
//     delete(@Param('id') id: string):Observable<DeleteResult>{
//         return this.postService.deletePost(id);
//     }
// }
