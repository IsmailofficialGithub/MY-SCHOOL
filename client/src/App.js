import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Register from "./pages/register";
import Login from "./pages/login";
import PageNotFound from "./pages/404";
import AboutUs from "./pages/about";
import Contact from "./pages/contact";
import Qna from "./pages/qna";
import PrivateRoute from "./pages/components/privateRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import StudentDetail from "./pages/admin/student/StudentDetail";
import AddStudent from "./pages/admin/student/add-student";
import UpdateStudent from "./pages/admin/student/updateStudent";
import StudentFullDetail from "./pages/admin/student/StudentFullDetail";
import AddTeacher from "./pages/admin/teacher/add-teacher";
import TeacherDetail from "./pages/admin/teacher/teacherDetail";
import UpdateTeacher from "./pages/admin/teacher/updateTeacher";
import TeacherFullDetail from "./pages/admin/teacher/teacherFullDetail";
import Test from "./pages/test.";
import NoticeBoard from "./pages/noticeBoard";
import AddNotice from "./pages/admin/notice/addNotice";
import NoticeDetail from "./pages/admin/notice/noticeDetail";
import UpdateNotice from "./pages/admin/notice/updateNotice";
import NoticeDetailFull from "./pages/admin/notice/noticeDetailFull";
import Report from './pages/report'
import StudentPrivate from "./pages/components/studentPrivate";
import AddReport from "./pages/admin/std-Report/add-report";
import ReportOption from "./pages/admin/std-Report/reportMain";
import UpdateReport from "./pages/admin/std-Report/update-Report";
import StdFullReport from "./pages/admin/std-Report/std-FullReport";
import NoticePageDetail from "./pages/noticePageDetail";
import UserPage from "./pages/admin/user";
function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="dashboard/Student-detail" element={<StudentDetail />} />
          <Route path="dashboard/update-detail/:id" element={<UpdateStudent/>} />
          <Route path="dashboard/fullStudent-detail/:id" element={<StudentFullDetail/>} />
          <Route path="dashboard/add-student" element={<AddStudent />} />
          <Route path="dashboard/add-teacher" element={<AddTeacher />} />
          <Route path="dashboard/teacher-detail" element={<TeacherDetail />} />
          <Route path="dashboard/update-teacher/:id" element={<UpdateTeacher/>} />
          <Route path="dashboard/teacher-Full-Detail/:id" element={<TeacherFullDetail/>} />
          <Route path="dashboard/add-notice" element={<AddNotice />} />
          <Route path="dashboard/update-notice/:id" element={<UpdateNotice />} />
          <Route path="dashboard/notice-detail" element={<NoticeDetail />} />
          <Route path="dashboard/notice-Full-Detail/:id" element={<NoticeDetailFull />} />
          <Route path="dashboard/add-student-report/:id" element={<AddReport />} />
          <Route path="dashboard/select-report/:id" element={<ReportOption />} />
          <Route path="dashboard/update-report/:id" element={<UpdateReport />} />
          <Route path="dashboard/FullReportDetail/:id" element={<StdFullReport />} />
          <Route path="dashboard/UserInfo" element={<UserPage />} />
        </Route>

        <Route path="/student" element={<StudentPrivate/>}>
          <Route path="report/:id" element={<Report/>}/>
        </Route>

        <Route path="/login" element={<Login />} />
        {/* <Route path="/report" element={<Report />} /> */}
        <Route path="/notice-board" element={<NoticeBoard />} />
        <Route path="/notice-board-Detail/:id" element={<NoticePageDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
