import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";

import { signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  

  if (!session) {
    return {
      redirect: {
        destination: "/auth ",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <div>
        <h1 className="text-4xl text-red-500 text-center">
          Netflix clone Work in progress
        </h1>
        <p className="text-white">Logged in as: {user?.name} </p>
        <button className="h-10 w-full bg-white" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    </>
  );
}
