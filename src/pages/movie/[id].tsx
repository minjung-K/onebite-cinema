import style from './[id].module.css';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import fetchOneMovie from '@/lib/fetch-one-movie';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    posterImgUrl,
    title,
    releaseDate,
    genres,
    runtime,
    company,
    subTitle,
    description,
  } = movie;

  let formattedGenres = '';
  genres.forEach((genre: string) => {
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
