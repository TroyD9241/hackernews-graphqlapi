const { ApolloServer } = require("apollo-server");
// import ApolloServer

let links = [
  {
    id: "link0",
    url: "howtographql",
    description: "fullstack tutorial",
  },
];

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;
// typedefs are the definition of your graphql schema.
// contains the parent or root field

const resolvers = {
  Query: {
    info: () => `this is a api`,
    feed: () => links,
  },
  // on the Link type we add three resolvers for each field
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};
// resolvers object is the implementation of the graphql schema will be indentical to the type definitions

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// simple implementation of the server, tells the server what operations should be accepted and how they should be resolved
server.listen().then(({ url }) => console.log(`server is running on ${url}`));

// typedefs -> resolver
