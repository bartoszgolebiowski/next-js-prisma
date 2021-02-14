import { PrismaClient, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { getAllUsers, createUser } from "../../src/db/user";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users = await getAllUsers(prisma);
    res.statusCode = 200;
    res.json({ users });
  }
  if (req.method === "POST") {
    const user = req.body;
    const persistedUser = await createUser(prisma, user);
    res.statusCode = 201;
    res.json({ user: persistedUser });
  }
};
