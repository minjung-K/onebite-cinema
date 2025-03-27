import SearchBarLayout from '@/components/searchbar-layout';
import { ReactNode } from 'react';
export default function Home() {
  return (
    <div>
      <h2></h2>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};
