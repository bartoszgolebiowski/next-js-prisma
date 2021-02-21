import { User } from "@prisma/client";
import { createRequest, createResponse } from "node-mocks-http";
import handler from "../../../../pages/api/user";
import * as userService from "../../../../src/db/user";

import {
  createuserBody1,
  createuserBody2,
  createuserBody3,
  getAllUsersSample,
} from "../../../samples/db";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(),
}));

describe("/api/users", () => {
  describe("GET", () => {
    let getAllUsers: jest.SpyInstance<Promise<User[]>>;

    beforeEach(() => {
      getAllUsers = jest.spyOn(userService, "getAllUsers");
      getAllUsers.mockResolvedValue(getAllUsersSample);
    });

    it("get all users", async () => {
      const req = createRequest({
        method: "GET",
      });
      const res = createResponse();

      await handler(req, res);

      const json = res._getJSONData();
      expect(json.users).toStrictEqual(getAllUsersSample);
      expect(res.statusCode).toBe(200);
    });
  });

  describe("POST", () => {
    let createUser: jest.SpyInstance<Promise<User>>;

    beforeEach(() => {
      createUser = jest.spyOn(userService, "createUser");
    });

    const createResponseBody = (createuserBody: any) => ({
      user: {
        ...createuserBody,
        id: 1,
      },
    });

    it("create user, empty post", async () => {
      //@ts-ignore
      createUser.mockResolvedValue({ ...createuserBody1, id: 1 });
      const res = createResponse();
      const req = createRequest({
        method: "POST",
        body: createuserBody1,
      });

      await handler(req, res);
      const json = res._getJSONData();
      expect(json).toStrictEqual({
        errors: ["email is a required field", "name is a required field"],
        name: "ValidationError",
      });
      expect(res.statusCode).toBe(400);
    });

    it("create user, correct body", async () => {
      //@ts-ignore
      createUser.mockResolvedValue({ ...createuserBody2, id: 1 });
      const res = createResponse();
      const req = createRequest({
        method: "POST",
        body: createuserBody2,
      });

      await handler(req, res);
      const json = res._getJSONData();
      expect(json).toStrictEqual(createResponseBody(createuserBody2));
      expect(res.statusCode).toBe(201);
    });

    it("create user, additional field", async () => {
      //@ts-ignore
      createUser.mockResolvedValue({ ...createuserBody3, id: 1 });
      const res = createResponse();
      const req = createRequest({
        method: "POST",
        body: createuserBody3,
      });

      await handler(req, res);
      const json = res._getJSONData();
      expect(json).toStrictEqual(createResponseBody(createuserBody3));
      expect(res.statusCode).toBe(201);
    });
  });
});
