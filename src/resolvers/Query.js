async function feed(parents, args, context) {
  const feedData = await context.prisma.link.findMany();
  return feedData;
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
