import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import StudentDashboard from './pages/StudentDashboard'
import Exam from './pages/Exam'
import CodingTest from './components/CodingTest'
import Calculator from './components/Calculator'
import AdminDashboard from './pages/AdminDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import Instructions from './components/Instructions'
import SampleExam from './pages/SampleExam'
import AssignedExam from './pages/AssignedExam'
import { LogIn } from 'lucide-react'
import Login from './components/Login'
import ExamInfoPage from './pages/ExamInfoPage'
import PlacementOfficer from './pages/PlacementOfficer'
import RecruiterDashboard from './pages/RecruiterDashboard'
import PlacementCoordinatorDashboard from './pages/PlacementCoordinatorDashboard'
import StudentNewDashboard from './pages/StudentNewDashboard'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="/student" element={<StudentDashboard/>} />
        <Route path="/ourstudent" element={<StudentNewDashboard/>} />
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/teacher" element={<TeacherDashboard/>}/>
        <Route path="/tpo" element={<PlacementOfficer/>}/>
        <Route path="/recruiter" element={<RecruiterDashboard/>}/>
        <Route path="/placement-coordinator" element={<PlacementCoordinatorDashboard/>}/>
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/exam-info" element={<ExamInfoPage />} />
        <Route path="/exam/:id" element={<Exam />} />
        <Route path="/sampleexam/:id" element={<SampleExam/>} />
        <Route path="/assignedexam/:id" element={<AssignedExam />} />
        <Route path="/coding" element={<CodingTest/>} />
        <Route path="/calculator" element={<Calculator/>} />
        <Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
