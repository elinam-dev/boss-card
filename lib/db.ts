import { MongoClient } from "mongodb";

const cache = globalThis as unknown as { _mongo?: Promise<MongoClient> };

export async function getDb() {
  cache._mongo ??= new MongoClient(process.env.MONGO_URL as string).connect();
  return (await cache._mongo).db(process.env.DB_NAME);
}
