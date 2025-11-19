import './App.css'
import 'katex/dist/katex.min.css';
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
import AllInstructors from './pages/admin-pages/instructors/all-instructors'
import CreateCourse from './pages/instructor-pages/create-course/CreateCourse'
import InstructorCourses from './pages/instructor-pages/my-courses/InstructorCourses'
import EditCourseInformation from './pages/instructor-pages/edit-course-information/EditCourseInformation'
import Lessons from './pages/instructor-pages/lessons/Lessons'
import EditLesson from './pages/instructor-pages/edit-lessson/edit-lesson'
import AddNewPage from './pages/instructor-pages/add-new-page/add-new-page';
import Courses from './pages/user-pages/courses/Courses';
import LessonView from './pages/user-pages/view-lesson/LessonView';
import QuizzesManagement from './pages/instructor-pages/quizzes-management/quizzes-management';
import Quiz from './pages/user-pages/quiz/Quiz';
import Badges from './pages/user-pages/badges/badges';
interface userContextInterface {
  userName: string,
  role: string,
  setRole: React.Dispatch<React.SetStateAction<string>>,
  setUserName: React.Dispatch<React.SetStateAction<string>>,
  isLoading: boolean,
  isThereStreakToday: boolean,
  setIsThereStreakToday: React.Dispatch<React.SetStateAction<boolean>>

}

export const UserContext = createContext<userContextInterface | null>(null);

function App() {

  const { isLoading, userName, setUserName, role, setRole, isThereStreakToday, setIsThereStreakToday } = useGetUser();

  return (
    <UserContext.Provider value={{ userName, role, setRole, setUserName, isLoading, isThereStreakToday, setIsThereStreakToday }}>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectRoute allowedRole={"user"} />}>
          <Route element={<DashboardLayout />}>
            <Route path='/user-dashboard' element={<UserDashboard />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/badges' element={<Badges/>} />
            <Route path='/my-courses' element={<div>my courses</div>} />
            <Route path='courses/:courseId' element={<Lessons />} />
            <Route path='courses/:courseId/lessons/:lessonId/view' element={<LessonView />} />
            <Route path='courses/:courseId/lessons/:lessonId/quiz' element={<Quiz/>} />
          </Route>
        </Route>


        <Route element={<ProtectRoute allowedRole={"instructor"} />}>
          <Route element={<DashboardLayout />}>

            <Route path='/instructor/dashboard' element={<div>instructor dashboard</div>} />
            <Route path='/instructor/courses' element={<InstructorCourses />} />
            <Route path='/instructor/courses/:courseId' element={<Lessons />} />
            <Route path='/instructor/courses/:courseId/edit' element={<EditCourseInformation />} />
            <Route path='/instructor/courses/:courseId/lessons/:lessonId/edit' element={<EditLesson />} />
            <Route path='/instructor/courses/:courseId/lessons/:lessonId/edit/quizzes' element={<QuizzesManagement />} />

            <Route path='/instructor/courses/:courseId/:lessonId/new-page' element={<AddNewPage />} />

            <Route path='/instructor/courses/new' element={<CreateCourse />} />

            <Route path='/instructor/quiz-bank' element={<div>quizz bank</div>} />
          </Route>
        </Route>


        <Route element={<ProtectRoute allowedRole={"admin"} />}>
          <Route element={<DashboardLayout />}>
            <Route path='/admin-dashboard' element={<div>admin dashboard</div>} />
            <Route path='/all-users' element={<div>users</div>} />
            <Route path='/instructors' element={<AllInstructors />} />
            <Route path='/new-instructor' element={<NewInstructor />} />
          </Route>
        </Route>



        <Route path='/login-signup' element={<Login_SignUp />} />
        <Route path='/not-found' element={<div>not found</div>} />
      </Routes>
    </UserContext.Provider >

  )
}

export default App
