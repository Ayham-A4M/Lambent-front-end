import './App.css'
import Home from './pages/user-pages/Home/Home'
import DashboardLayout from './layouts/dashboard-layout'
import UserDashboard from './pages/user-pages/user-dashboard/user-dashboard'
import Login_SignUp from './pages/login-signup/login-signup'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // retry: 1,
        // staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-right' />
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/user-dashboard' element={<UserDashboard />} />
          <Route path='/courses' element={<div>courses</div>} />
          <Route path='/badges' element={<div>badges</div>} />
          <Route path='/my-courses' element={<div>my courses</div>} />
        </Route>
        <Route path='/login-signup' element={<Login_SignUp />} />
      </Routes>
    </QueryClientProvider>

  )
}

export default App
