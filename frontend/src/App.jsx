import UserDashboard from "./pages/User_dashboard"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Webdev from "./pages/courses/Webdev"
import Homepage from "./pages/Homepage"
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Course from "./pages/Course"
import About from "./pages/About"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/webdev" element={<Webdev />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
