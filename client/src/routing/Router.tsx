import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/components/HomePage';
import { SynonymPage } from '../pages/SynonymPage/SynonymPage';
import { CreateSynonymPage } from '../pages/CreateSynonymPage/components/CreateSynonymPage';
import { Layout } from '../features/Layout/components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        id: 'homepage',
        element: <HomePage />
      },
      {
        path: 'synonym/:searchTerm',
        id: 'synonym-page',
        element: <SynonymPage />
      },
      {
        path: 'synonym/create',
        id: 'create-synonym-page',
        element: <CreateSynonymPage />
      }
    ]
  }
]);
