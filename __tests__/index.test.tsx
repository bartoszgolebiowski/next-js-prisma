import { User } from "@prisma/client";
import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import Home, { getStaticProps } from "../pages";
import * as userService from "../src/db/user";

import { createuserBody2, getAllUsersSample } from "../test/samples/db";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(),
}));

describe("/", () => {
  let getAllUsers: jest.SpyInstance<Promise<User[]>>;
  let axiosSpy: any;
  let baseElement: Element;

  beforeEach(async () => {
    getAllUsers = jest.spyOn(userService, "getAllUsers");
    axiosSpy = jest.spyOn(axios, "post");

    getAllUsers.mockResolvedValue(getAllUsersSample);
    const { props } = await getStaticProps();

    const container = render(<Home {...props} />);
    baseElement = container.baseElement;
  });

  it("initla render", async () => {
    expect(baseElement).toMatchSnapshot();
  });

  it("create user", async () => {
    userEvent.type(screen.getAllByLabelText(/name:/i)[0], createuserBody2.name);
    userEvent.type(screen.getByLabelText(/email/i), createuserBody2.email);
    userEvent.type(screen.getByLabelText(/surname:/i), createuserBody2.surname);
    userEvent.click(screen.getByText(/submit/i));
    expect(axiosSpy).toBeCalledWith("/api/user", createuserBody2);
  });
});
