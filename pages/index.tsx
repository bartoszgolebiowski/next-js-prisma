import { InferGetStaticPropsType } from "next";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { getAllUsers } from "../src/db/user";

const prisma = new PrismaClient();

export default function Home({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //@ts-ignore
    const name = event.target.name.value;
    //@ts-ignore
    const email = event.target.email.value;
    await axios.post("/api/user", { name, email });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" required />
        </label>
        <label>
          Email:
          <input name="email" type="email" required />
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
  };
}
