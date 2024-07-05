import type { InferGetServerSidePropsType } from 'next';

import { HomePage } from 'modules';

import prisma from '../prisma/prismaClient';

export type ServerSidePropsUsers = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async () => {
  const baseLogs = await prisma.baseLog.findMany({ take: 100 });

  return {
    props: { baseLogs: JSON.parse(JSON.stringify(baseLogs)) as typeof baseLogs },
  };
};

const Home = ({ baseLogs }: ServerSidePropsUsers) => <HomePage baseLogs={baseLogs} />;

export default Home;
