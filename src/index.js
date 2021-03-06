const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { ApolloServer, PubSub } = require("apollo-server");
// import ApolloServer
const { getUserId } = require("./utils");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require("./resolvers/Vote");
const Subscription = require("./resolvers/Subscription");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

// simple implementation of the server, tells the server what operations should be accepted and how they should be resolved
server.listen().then(({ url }) => console.log(`server is running on ${url}`));

// typedefs -> resolver
