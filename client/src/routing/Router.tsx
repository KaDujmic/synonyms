import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../features/layout/components/Layout';
import { 
    HomePage,
    SynonymPage,
    SearchSynonymsPage,
    SynonymObjectsPage,
    CreateSynonymPage
} from '../pages';

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
