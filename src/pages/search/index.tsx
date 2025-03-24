import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { q } = router.query;
  return (
    <div>
      <h2>검색결과: {q}</h2>
    </div>
  );
}
