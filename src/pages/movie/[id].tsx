import style from './[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchOneMovie from '@/lib/fetch-one-movie';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1022789' } },
      { params: { id: '995926' } },
      { params: { id: '786892' } },
    ],
    fallback: true,
  };
};
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }
  return {
    props: { movie },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입시네마</title>
          <meta property="og:image" content="/thumbnail.png"></meta>
          <meta property="og:title" content="한입시네마"></meta>
          <meta
            property="og:description"
            content="한입시네마 영화를 감상하세요"
          ></meta>
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  }
  console.log('movie==', movie);
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
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={posterImgUrl}></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
      </Head>
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
    </>
  );
}
