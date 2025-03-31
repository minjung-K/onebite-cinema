import SearchBarLayout from '@/components/searchbar-layout';
import { ReactNode } from 'react';
import style from './index.module.css';
import movies from '@/mock/dummy.json';
import MovieItem from '@/components/movie-item';

export default function Home() {
  const nowMovies = [];

  for (let idx = 0; idx < movies.length; idx++) {
    if (idx < 3) {
      nowMovies.push(movies[idx]);
    } else {
      break;
    }
  }
  console.log('nowMovies:', nowMovies);

  return (
    <div>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.container_section1}>
          {nowMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.container_section2}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};
