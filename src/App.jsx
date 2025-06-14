import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Login from './pages/login_register/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import NotFoundPage from './pages/not_found/NotFoundPage';
import { DashboardProvider } from './pages/dashboard/DashboardContext';


const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const LoginRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />;
};

function App() {

  return (
    <DashboardProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </DashboardProvider>

  );
}

export default App;
