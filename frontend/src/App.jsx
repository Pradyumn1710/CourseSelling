import UserDashboard from "./pages/User_dashboard"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Webdev from "./pages/courses/Webdev"
import Homepage from "./pages/Homepage"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Course from "./pages/Course"
import About from "./pages/About"
import { AdminProvider } from "./components/AdminContext"
import AddCoursePage from "./pages/Addcourse"

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Move AdminProvider here to wrap all Routes */}
        <AdminProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/add-course" element={<AddCoursePage />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/webdev" element={<Webdev />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Routes>
        </AdminProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
