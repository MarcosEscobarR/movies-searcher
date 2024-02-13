import { Result } from "../../../libs/result";
import { mongoClient } from "../../utils/mongoClient";
import { paginate } from "../../utils/paginate";
import { elasticsearchClient } from "../../utils/elasticsearch";
import { Movie } from "../models";
import { SearchTotalHits } from "@elastic/elasticsearch/lib/api/types";

export async function getMoviesService(
  page: number,
  noOfRecordsPerPage: number
) {
  try {
    const mongoCollection = mongoClient().db("movies").collection("movies");
    const documents = mongoCollection
      .find()
      .sort({ _id: -1 })
      .skip(page * noOfRecordsPerPage)
      .limit(noOfRecordsPerPage)
      .toArray();

    const totalRecords = mongoCollection.countDocuments();
    return Result.ok(
      paginate({
        data: await documents,
        page,
        pageSize: noOfRecordsPerPage,
        total: await totalRecords,
      })
    );
  } catch (e) {
    console.log({ e });
    return Result.internalServerError({
      message: "Error while fetching data",
    });
  }
}

export async function searchMoviesService(
  query: string,
  pageIndex: number,
  pageSize: number
) {
  try {
    const indexName = "movies_index";
    const searchResult = await elasticsearchClient.search({
      index: indexName,
      query: {
        bool: {
          should: [
            {
              match_phrase_prefix: {
                title: {
                  query: query,
                  slop: 10,
                },
              },
            },
            {
              match_phrase_prefix: {
                alternative_titles: {
                  query: query,
                  slop: 10,
                },
              },
            },
            {
              match_phrase_prefix: {
                actors: {
                  query: query,
                  slop: 10,
                },
              },
            },
            {
              match: {
                title: {
                  query: query,
                  operator: "and",
                },
              },
            },
          ],
        },
      },
      highlight: {
        fields: {
          title: {},
          alternative_titles: {},
          actors: {},
        },
      },
      from: pageIndex * pageSize,
      size: pageSize,
      sort: [{ score: { order: "desc" } }],
    });

    const hits: Movie[] = searchResult.hits.hits as any;

    const data = hits.map((hit) => ({
      title: hit.title,
      image: hit.image,
      score: hit.score,
      year: hit.year,
      rating: hit.rating,
      color: hit.color,
    }));

    const totalRows = (searchResult.hits.total as SearchTotalHits).value;
    console.log({ totalRows });
    return Result.ok(
      paginate({
        data: searchResult.hits.hits,
        page: pageIndex,
        pageSize,
        total: totalRows,
      })
    );
  } catch (error) {
    console.log({ error });
    return Result.internalServerError({
      message: "Error while fetching data",
    });
  }
}
