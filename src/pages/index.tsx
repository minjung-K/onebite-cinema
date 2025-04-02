import SearchBarLayout from '@/components/searchbar-layout';
import { ReactNode } from 'react';
import style from './index.module.css';
import MovieItem from '@/components/movie-item';
import fetchMovies from '@/lib/fetch-movie';
import fetchRandomMovies from '@/lib/fetch-randomMovie';
import { InferGetStaticPropsType } from 'next';
import { MovieData } from '@/types';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);
  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입시네마" />
        <meta
          property="og:description"
          content="한입시네마 영화를 감상하세요"
        />
      </Head>
      <div>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.container_section1}>
            {recoMovies.map((movie: MovieData) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div className={style.container_section2}>
            {allMovies.map((movie: MovieData) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};
