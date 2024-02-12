import { Controller, Get, Query, Validate } from "../../libs/decorators";
import { moviesQuerySchema, searchMoviesSchema } from "./models";
import { getMoviesService, searchMoviesService } from "./services";

@Controller("/api/movies")
export class MoviesController {
  @Get()
  @Validate("query", moviesQuerySchema)
  getMovies(@Query("pageIndex") page: number, @Query("pageSize") size: number) {
    console.log({ page, size: process.env.MONGO_URL });

    return getMoviesService(page, size);
  }

  @Get("/search")
  @Validate("query", searchMoviesSchema)
  seachMovies(
    @Query("q") query: string,
    @Query("pageIndex") page: number,
    @Query("pageSize") size: number
  ) {
    return searchMoviesService(query, page, size);
  }
}
