const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function post(parent, args, context, info) {
  const { userId } = context;

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {
        connect: { id: userId },
      },
    },
  });
  context.pubsub.publish("NEW_LINK", newLink);
  return newLink;
}
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error("No user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function deleteLink(parent, { id }, context, info) {
  const linkId = parseInt(id);
  const deleteLink = await context.prisma.delete({
    where: {
      id: linkId,
    },
  });
  return deleteLink;
}

async function updateLink(parent, { id, url, description }, context, info) {
  const linkId = parseInt(id);
  const updateLink = await context.prisma.update({
    where: {
      id: linkId,
    },
    data: {
      url: url,
      description: description,
    },
  });
  return updateLink;
}

async function deleteUser(parent, { id }, context, info) {
  const userId = parseInt(id);
  return await context.prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

module.exports = {
  signup,
  login,
  post,
  deleteLink,
  updateLink,
  deleteUser,
};
