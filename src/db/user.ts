import { Prisma, PrismaClient, User } from "@prisma/client";

type UserPersonalData = Prisma.UserGetPayload<{
  select: { email: true; name: true };
}>;

export const getAllUsers = async (client: PrismaClient): Promise<User[]> => {
  return client.user.findMany();
};

export const createUser = async (
  client: PrismaClient,
  user: UserPersonalData
): Promise<User> => {
  const userPersisted = await client.user.create({
    data: { ...user },
  });
  return userPersisted;
};
