import { Prisma, PrismaClient, User } from "@prisma/client";
import * as Yup from "yup";

type UserPersonalData = Prisma.UserGetPayload<{
  select: { email: true; name: true; surname: true };
}>;

export const getAllUsers = async (client: PrismaClient): Promise<User[]> => {
  return client.user.findMany({
    select: {
      id: true,
      surname: true,
      name: true,
      email: true,
      posts: {
        where: { title: "test" },
        select: { title: true, createdAt: true },
      },
    },
    where: {
      name: "test",
    },
  });
};

const userPostValidator = Yup.object({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  surname: Yup.string().nullable(),
});

export const createUserValidator = (user: UserPersonalData) => {
  return userPostValidator.validateSync(user, {
    abortEarly: false,
    stripUnknown: true,
  });
};

export const createUser = async (
  client: PrismaClient,
  user: UserPersonalData
): Promise<User> => {
  return client.user.create({
    data: { ...user },
  });
};
