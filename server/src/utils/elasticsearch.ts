import { Client } from "@elastic/elasticsearch";
import auth from "./auth.json";

export const elasticsearchClient = new Client({
  node: auth.node,
  auth: {
    apiKey: {
      id: auth.id,
      api_key: auth.api_key,
    },
  },
});
