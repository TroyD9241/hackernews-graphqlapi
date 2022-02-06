async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
  const count = await context.prisma.link.count({ where });
  return { links, count };
}

async function findLink(parent, { id }, context) {
  linkId = parseInt(id);
  const singleLink = await context.prisma.link.findUnique({
    where: {
      id: linkId,
    },
  });
  return singleLink;
}

async function allUsers(parents, args, context) {
  return await context.prisma.user.findMany({});
}

module.exports = {
  feed,
  findLink,
  allUsers,
};
