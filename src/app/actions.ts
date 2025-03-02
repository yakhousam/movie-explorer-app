"use server";

import clientPromise from "@/lib/mongodb";
import OpenAI from "openai";
import { paginatedResponseSchema } from "./schemas";

const DB_NAME = "moviedb";
const COLLECTION_NAME = "movies";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function enhanceQuery(query: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Translate to english and rephrase the user query for a movie search while keeping all essential details. Ensure actors, genres, and themes remain unchanged, making it suitable for semantic vector search. Keep it concise but precise.",
      },
      { role: "user", content: query },
    ],
    max_tokens: 50,
    temperature: 0.4, // Lower randomness for accuracy
  });

  const messageContent = response.choices?.[0]?.message?.content?.trim();
  if (!messageContent) {
    throw new Error("Failed to get a valid response from OpenAI.");
  }
  return messageContent;
}

async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding;
}

export async function searchMovies({
  queryText,
  yearFrom,
  yearTo,
  genres = [],
  page = 1,
  limit = 20,
}: {
  queryText: string;
  yearFrom?: number;
  yearTo?: number;
  genres?: string[];
  page?: number;
  limit?: number;
}) {
  const queryVector = await generateEmbedding(queryText);
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const moviesCollection = db.collection(COLLECTION_NAME);

  // Build year filter
  const yearFilter: Record<string, { $gte?: number; $lte?: number }> = {};
  if (yearFrom) yearFilter.year = { ...yearFilter.year, $gte: yearFrom };
  if (yearTo) yearFilter.year = { ...yearFilter.year, $lte: yearTo };

  // Build genre filter
  const genreFilter: Record<string, { $in: string[] }> = {};
  if (genres && genres.length > 0) {
    genreFilter.genres = { $in: genres };
  }

  const skip = page * limit;

  const results = await moviesCollection
    .aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryVector,
          exact: true,
          // numCandidates: 500,
          limit: 100,
        },
      },
      {
        $addFields: {
          score: { $meta: "vectorSearchScore" },
        },
      },
      {
        $match: {
          $expr: {
            $gte: ["$score", 0.6],
          },
        },
      },
      {
        $match: yearFilter,
      },
      {
        $match: genreFilter,
      },
      {
        $facet: {
          movies: [
            {
              $project: {
                _id: 1,
                title: 1,
                image: 1,
                url: 1,
                year: 1,
                genres: 1,
                score: 1,
                extract: 1,
              },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
            {
              $sort: { score: -1 },
            },
          ],
          total: [
            {
              $count: "count",
            },
          ],
        },
      },
    ])
    .toArray();

  const total = results[0].total[0]?.count || 0;

  return paginatedResponseSchema.parse({
    movies: results[0].movies,
    total,
  });
}
