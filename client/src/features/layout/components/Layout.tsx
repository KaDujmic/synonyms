import { Outlet } from 'react-router-dom';
import { Header } from '../../header/components/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="main-container">
          <Outlet />
        </div>
      </main>
    </>
  );
}; 