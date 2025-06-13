import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import { resolvers } from './resolvers.js';
import path from "path";
import { fileURLToPath } from "url";
import { InMemoryMovieRepository } from './InMemoryMovieRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __schema_file = path.join(__dirname, 'schema.gql');

const schema = readFileSync(__schema_file, 'utf-8');
const movieRepository = new InMemoryMovieRepository();

const server = new ApolloServer(
    {
        typeDefs: schema,
        resolvers,
        context: {
            movieRepository
        }
    });

const APOLLO_SERVER_PORT = process.env.APOLLO_SERVER_PORT || 4000;

server.listen({ port: APOLLO_SERVER_PORT }).then(({ url }) => {
    console.log(`Servidor de GraphQL rodando em ${url}`);
});