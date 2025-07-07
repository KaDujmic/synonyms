import { Outlet } from 'react-router-dom';
import { Header } from '../../Header/components/Header';

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