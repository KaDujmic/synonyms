import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { SynonymPage } from '../pages/SynonymPage/SynonymPage';
import { SearchSynonymsPage } from '../pages/SearchSynonymsPage';
import { SynonymObjectsPage } from '../pages/SynonymObjectsPage';
import { CreateSynonymPage } from '../pages/CreateSynonymPage';
import { Layout } from '../features/layout/components/Layout';

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
        path: 'synonym/search/:searchTerm',
        id: 'search-synonyms-page',
        element: <SearchSynonymsPage />
      },
      {
        path: 'synonym/:searchTerm/synonyms',
        id: 'synonym-objects-page',
        element: <SynonymObjectsPage />
      },
      {
        path: 'synonym/create',
        id: 'create-synonym-page',
        element: <CreateSynonymPage />
      }
    ]
  }
]);
