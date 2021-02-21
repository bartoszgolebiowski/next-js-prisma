import * as React from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";

import { getAllUsers } from "../src/db/user";

const prisma = new PrismaClient();

export default function Home({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [value, setValue] = React.useState({
    name: "",
    surname: "",
    email: "",
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
    //@ts-ignore
  ) => setValue((value) => ({ ...value, [name]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return await axios.post("/api/user", { ...value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" onChange={handleChange("name")} required />
        </label>
        <label>
          Surname:
          <input name="surname" onChange={handleChange("surname")} />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            onChange={handleChange("email")}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>{JSON.stringify(users)}</div>
    </>
  );
}

export async function getStaticProps() {
  const users = await getAllUsers(prisma);
  return {
    props: {
      users,
    },
    revalidate: 10,
  };
}
