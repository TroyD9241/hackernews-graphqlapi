const fs = require("fs");
const path = require("path");

const { ApolloServer } = require("apollo-server");
// import ApolloServer

let links = [
  {
    id: "link0",
    url: "howtographql",
    description: "fullstack tutorial",
  },
];

// typedefs are the definition of your graphql schema.
// contains the parent or root field

const resolvers = {
  Query: {
    info: () => `this is a api`,
    feed: () => links,
    findLink: (_, { id }) =>
      links.find((link) => {
        const foundLink = link.id === id;
        return foundLink;
      }),
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, { id, description }) => {
      let updated = links.find((link) => {
        console.log(id, description);
        if (link.id === id) {
          description: description;
        }
        return updated;
      });
    },
  },
};
// resolvers object is the implementation of the graphql schema will be indentical to the type definitions

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  introspection: true,
  playground: true,
});

// simple implementation of the server, tells the server what operations should be accepted and how they should be resolved
server.listen().then(({ url }) => console.log(`server is running on ${url}`));

// typedefs -> resolver
