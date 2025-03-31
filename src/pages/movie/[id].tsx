import { useRouter } from 'next/router';
import movies from '@/mock/dummy.json';
import style from './[id].module.css';

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;

  const movieData = movies.filter((movie) => {
    return movie.id === Number(id);
  });
  console.log('movieData===', movieData);
  const {
    posterImgUrl,
    title,
    releaseDate,
    genres,
    runtime,
    company,
    subTitle,
    description,
  } = movieData[0];

  let formattedGenres = '';
  genres.forEach((genre) => {
    formattedGenres += genre + ',';
  });
  const len = formattedGenres.length - 1;
  formattedGenres = formattedGenres.slice(0, len);

  return (
    <div className={style.container}>
      <div className={style.container_img_cover}>
        <img src={posterImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {formattedGenres} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>{description}</div>
    </div>
  );
}
