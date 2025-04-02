import { ReactNode, useEffect, useState } from 'react';
import SearchBarLayout from '@/components/searchbar-layout';
import MovieItem from '@/components/movie-item';

import { useRouter } from 'next/router';
import style from './index.module.css';
import { MovieData } from '@/types';
import fetchMovies from '@/lib/fetch-movie';

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;
  console.log(q);

  const fetchSearchResult = async () => {
    const data = await fetchMovies(q as string);
    setMovies(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

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
