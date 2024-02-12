import { Result } from "../../../libs/result";
import { mongoClient } from "../../utils/mongoClient";
import { paginate } from "../../utils/paginate";
import { elasticsearchClient } from "../../utils/elasticsearch";

export async function getMoviesService(
  page: number,
  noOfRecordsPerPage: number
) {
  try {
    const mongoCollection = mongoClient.db("movies").collection("movies");
    const documents = mongoCollection
      .find() // search on all data
      .sort({ _id: -1 }) // reverse the data to get latest record first
      .skip(page * noOfRecordsPerPage) // skip the records base on page number
      .limit(noOfRecordsPerPage) // no of record par page
      .toArray(); //

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

    const data = searchResult.hits.hits.map((hit) => ({
      title: hit._source.title,
      image: hit._source.image,
      score: hit._source.score,
      year: hit._source.year,
      rating: hit._source.rating,
      color: hit._source.color,
    }));

    // const totalRows = searchResult.hits.total.value;
    console.log(searchResult.hits);
    const totalRows = searchResult.hits.total.value;
    return Result.ok(
      paginate({ data, page: 1, pageSize: 10, total: totalRows })
    );
  } catch (error) {
    console.log({ error });
    return Result.internalServerError({
      message: "Error while fetching data",
    });
  }
}
