import { RouterProvider } from 'react-router-dom';
import { router } from './routing/Router';
import './base.less';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
