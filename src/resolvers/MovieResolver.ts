import { Arg, Mutation, Resolver, Int, Query, InputType, Field } from "type-graphql";
import { Movie } from '../entity/Movie';

@InputType()
class MovieInput {
    @Field()
    title: string

    @Field(() => Int)
    minutes: number
}
@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Int, { nullable: true })
    minutes?: number
}

@Resolver()
export class MovieResolver {

    // crud: create
    @Mutation(() => Movie)
    async createMovie(
        // @Arg('title') title: string,
        // @Arg('minutes', () => Int) minutes: number
        @Arg('input', () => MovieInput) input: MovieInput
    ) {
        // await Movie.insert({ title, minutes })
        const movie = await Movie.create(input).save();     // insert and select
        return movie;
    }

    // crud: read
    @Query(() => [Movie])
    movies() {
        return Movie.find();
    }

    // crud: update
    @Mutation(() => Boolean)
    async updateMovie(
        @Arg('id', ()=>Int) id: number,
        @Arg('input', () => MovieUpdateInput) input: MovieUpdateInput
    ) {
        await Movie.update({id}, input);    // search by id and update but input
        return true;
    }

    // crud: delete
    @Mutation(() => Boolean)
    async deleteMovie(
        @Arg('id', ()=>Int) id: number
    ) {
        await Movie.delete({ id });
        return true;
    }

}