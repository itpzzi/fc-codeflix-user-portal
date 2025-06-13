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

server.listen().then(({ url }) => {
    console.log(`Servidor de GraphQL rodando em ${url}`);
});