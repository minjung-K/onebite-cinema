import { ReactNode } from 'react';
import SearchBarLayout from '@/components/searchbar-layout';

export default function Page() {
  return (
    <div>
      <h2></h2>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchBarLayout>{page}</SearchBarLayout>;
};
