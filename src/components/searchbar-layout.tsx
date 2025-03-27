import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import style from './searchbar-layout.module.css';

export default function SearchBarLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          className={style.input}
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요..."
        ></input>
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
