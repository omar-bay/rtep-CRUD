import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()                   // for graphql class
@Entity()
export class Movie extends BaseEntity {
    @Field(() => Int)           // for graphql type
    @PrimaryGeneratedColumn()   // for db type
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(() => Int)
    @Column( 'int', { default: 60, nullable: true } )
    minutes: number;
}