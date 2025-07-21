import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import JobApplicationsPage from './pages/JobApplicationsPage';
import MainLayout from './layout/MainLayout';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { usePageTracking } from './usePageTracking';
import { Outlet } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PageTrackingWrapper />}>
        {/* All your routes go here */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/JobApplications" element={<JobApplicationsPage />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

function PageTrackingWrapper() {
  usePageTracking();
  return <Outlet />;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
