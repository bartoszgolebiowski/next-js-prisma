import * as React from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { InferGetStaticPropsType } from "next";

import { getAllUsers } from "../src/db/user";

const prisma = new PrismaClient();

export default function Home({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    await axios
      .post("/api/user", { name, email, surname })
      .then(() => {
        setName("");
        setEmail("");
        setSurname("");
      })
      //@ts-ignore
      .catch((err) => alert(err))
      .finally(() => setDisabled(false));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            value={name}
            //@ts-ignore
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            required
          />
        </label>
        <label>
          Surname:
          <input
            value={surname}
            name="surname"
            //@ts-ignore
            onChange={(e) => setSurname(e.target.value)}
            disabled={disabled}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={email}
            //@ts-ignore
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            required
          />
        </label>
        <button type="submit" disabled={disabled}>
          Submit
        </button>
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
