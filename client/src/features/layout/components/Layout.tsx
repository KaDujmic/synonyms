import { Outlet } from 'react-router-dom';
import { Header } from '../../Header/components/Header';
import { useScrollToTopOnPageChange } from '../../../hooks/scroll/useScrollToTop';

export const Layout = () => {
  useScrollToTopOnPageChange();

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