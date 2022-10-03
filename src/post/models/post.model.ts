import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {BaseEntity} from './base.model';
@Entity('post')
export class PostEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default: ''})
    body: string;
}