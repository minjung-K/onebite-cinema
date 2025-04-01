import { ReactNode } from 'react';
import SearchBarLayout from '@/components/searchbar-layout';
import MovieItem from '@/components/movie-item';

import { useRouter } from 'next/router';
import style from './index.module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { MovieData } from '@/types';
import fetchMovies from '@/lib/fetch-movie';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const movies = await fetchMovies(q as string);
  return {
    props: { movies },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const q = router.query.q as string;
  console.log(q);

  return (
    <div className={style.container}>
      {movies.map((movie: MovieData) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};
