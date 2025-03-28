import { z } from "zod";

export const movieSchema = z.object({
  _id: z.instanceof(Object).transform((id) => id.toString()),
  title: z.string(),
  image: z.union([z.string(), z.literal(null)]),
  url: z.string().url(),
  year: z.number(),
  genres: z.array(z.string()),
  score: z.number(),
  extract: z.string(),
});

export type Movie = z.infer<typeof movieSchema>;

export const paginatedResponseSchema = z.object({
  movies: movieSchema.array(),
  total: z.number(),
});

export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
