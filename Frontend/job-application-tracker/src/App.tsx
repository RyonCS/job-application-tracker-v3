import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import JobApplicationsPage from './pages/JobApplicationsPage';
import MainLayout from './layout/MainLayout';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { usePageTracking } from './usePageTracking';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Auth Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>

      {/* Private Routes */}
      <Route element={<PrivateRoute/>}>
        <Route element={<MainLayout />}>
          <Route path="/JobApplications" element= {<JobApplicationsPage />} />
        </Route>
      </Route>

    </>
  )
)

function App() {
  usePageTracking();
  
  return(
    <RouterProvider router={router} />
  )
}

export default App;
