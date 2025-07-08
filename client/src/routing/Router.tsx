import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/components/HomePage';
import { SynonymPage } from '../pages/SynonymPage/SynonymPage';
import { CreateSynonymPage } from '../pages/CreateSynonymPage/components/CreateSynonymPage';
import { Layout } from '../features/Layout/components/Layout';
import { ErrorBoundary } from '../pages/ErrorBoundary/components/ErrorBoundary';
import { NotFound } from '../pages/NotFound/components/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        id: 'homepage',
        element: <HomePage />
      },
      {
        path: 'synonym/:searchTerm',
        id: 'synonym',
        element: <SynonymPage />
      },
      {
        path: 'synonym/create',
        id: 'create-synonym',
        element: <CreateSynonymPage />
      },
      {
        path: '*',
        id: 'not-found',
        element: <NotFound />
      }
    ]
  }
]);
