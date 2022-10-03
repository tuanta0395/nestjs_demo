import { Entity, Column } from 'typeorm';

export class BaseEntity {

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}