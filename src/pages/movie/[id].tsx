import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  return (
    <div>
      <h3>{id} 영화 상세페이지</h3>
    </div>
  );
}
