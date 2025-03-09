# Movies Frontend Application

This is a modern web application for searching and discovering movies using semantic search. Built with [Next.js](https://nextjs.org) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Semantic search for finding movies by natural language queries
- Responsive single-page design
- User authentication
- Direct links to Wikipedia for additional movie information

## Technologies Used

- Next.js 15 (App Router) with Turbopack
- React 19
- TypeScript
- Tailwind CSS
- Tanstack React Query
- NextAuth.js with AWS Cognito
- MongoDB Atlas with Vector Search
- OpenAI SDK
- Zod

## Getting Started

### Prerequisites

- Node.js 18.0 or later (recommended for Next.js 15)
- npm

### Installation

1. Clone the repository

   ```bash
   git clone https://your-repository-url/movies-frontend.git
   cd movies-frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables
   - Copy the `env.example` file to `.env.local`

   ```bash
   cp env.example .env.local
   ```

   - Fill in the environment variables in `.env.local`:
     - `MONGO_URI`: Your MongoDB connection string
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `AUTH_SECRET`: A secret key for NextAuth
     - `AUTH_COGNITO_ID`, `AUTH_COGNITO_SECRET`, `AUTH_COGNITO_ISSUER`: AWS Cognito authentication credentials

4. Run the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Usage

- Use the search bar to find movies using natural language (semantic search)
- Enter what you're looking for (e.g., "action movies with strong female leads" or "sci-fi movies about time travel")
- The app will fetch relevant movies from MongoDB based on your query
- Click on any movie to be redirected to its Wikipedia page for more information

## API Integration

This project uses server-side API routes to perform movie searches.

## Search Functionality

The semantic search functionality is powered by MongoDB Atlas Vector Search in combination with OpenAI's embedding model. This enables the application to understand natural language queries and find semantically similar content in the movie database.

## Live Demo

You can access the live version of this application at [cinema.khoudiryaya.dev](https://cinema.khoudiryaya.dev).

## Database Creation

The movie database was created through a data pipeline process:

1. Data was scraped from Wikipedia pages about movies
2. Each movie's information was processed and structured
3. Text embeddings were generated using OpenAI's embedding model
4. The structured data and embeddings were stored in MongoDB Atlas
5. A vector search index was configured to enable semantic search capabilities

This approach allows for natural language queries that can find movies based on themes, concepts, and features rather than just keyword matching.

### Data Crawler Repository

The Wikipedia data crawling and processing is handled in a separate repository. For those interested in how the movie data was collected and prepared for this application, check out the movies-crawler repository:

[Movies Crawler Repository](https://github.com/yakhousam/movies-crawler) - This repository contains the code used to scrape Wikipedia, process movie data, generate embeddings, and populate the MongoDB Atlas database.


