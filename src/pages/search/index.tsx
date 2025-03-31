import { ReactNode } from 'react';
import SearchBarLayout from '@/components/searchbar-layout';
import MovieItem from '@/components/movie-item';
import movies from '@/mock/dummy.json';
import { useRouter } from 'next/router';
import style from './index.module.css';

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string;
  console.log(q);
  const searchMovies = movies.filter((movie) => {
    if (movie.title.includes(q)) {
      return movie;
    }
  });
  return (
    <div className={style.container}>
      {searchMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};
