import { MongoClient, ServerApiVersion } from "mongodb";
const url =
  "mongodb+srv://marcosescobar:olimpiakarajo@testcluster.xbq3pou.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const mongoClient = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectMongo() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoClient.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.error(e);
  }
}
