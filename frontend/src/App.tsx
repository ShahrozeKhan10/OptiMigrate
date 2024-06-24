import { BrowserRouter as Router } from 'react-router-dom';

import MainRoutes from 'src/router';

import AuthProvider from 'src/providers/Auth';

const App = () => (
  <Router>
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  </Router>
);

export default App;
