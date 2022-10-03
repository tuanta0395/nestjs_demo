import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { interPost } from '../models/post.interface';
import { PostEntity } from '../models/post.model';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ){}

    createPost(post: interPost): Observable<interPost>{
        return from(this.postRepository.save(post));
    }

    findPostById(id): Observable<interPost>{
        return from(this.postRepository.findOneBy({id}));
    }


    findAllPosts():Observable<interPost[]>{
        return from(this.postRepository.find());
    }

    updatePost(id: string, post: interPost): Observable<UpdateResult>{
        return from(this.postRepository.update(id, post));
    }

    deletePost(id: string): Observable<DeleteResult>{
        return from(this.postRepository.delete(id));
    }
}
