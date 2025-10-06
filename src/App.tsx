import './App.css'
import Home from './pages/user-pages/Home/Home'
import DashboardLayout from './layouts/dashboard-layout'
import UserDashboard from './pages/user-pages/user-dashboard/user-dashboard'
import Login_SignUp from './pages/login-signup/login-signup'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { createContext } from 'react'
import ProtectRoute from './components/protectRoute'
import useGetUser from './hooks/useGetUser'
import NewInstructor from './pages/admin-pages/new-instructor/new-instructor'

interface userContextInterface {
  userName: string,
  role: string,
  setRole: React.Dispatch<React.SetStateAction<string>>,
  setUserName: React.Dispatch<React.SetStateAction<string>>,
  isLoading: boolean
}

export const UserContext = createContext<userContextInterface | null>(null);

function App() {

  const { isLoading, userName, setUserName, role, setRole } = useGetUser();

  return (
    <UserContext.Provider value={{ userName, role, setRole, setUserName, isLoading }}>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectRoute allowedRole={"user"} />}>
          <Route element={<DashboardLayout />}>
            <Route path='/user-dashboard' element={<UserDashboard />} />
            <Route path='/courses' element={<div>courses</div>} />
            <Route path='/badges' element={<div>badges</div>} />
            <Route path='/my-courses' element={<div>my courses</div>} />
          </Route>
        </Route>

        {/* <Route element={<ProtectRoute allowedRole={"admin"} />}> */}
          <Route element={<DashboardLayout />}>
            <Route path='/admin-dashboard' element={<div>admin dashboard</div>} />
            <Route path='/all-users' element={<div>users</div>} />
            <Route path='/instructors' element={<div>instructors</div>} />
            <Route path='/new-instructor' element={<NewInstructor />} />
          </Route>
        {/* </Route> */}



        <Route path='/login-signup' element={<Login_SignUp />} />
      </Routes>
    </UserContext.Provider >

  )
}

export default App
