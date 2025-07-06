import { Outlet } from 'react-router-dom';
import { Header } from '../../header/components/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <div>
        <main style={{ padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </>
  );
}; 