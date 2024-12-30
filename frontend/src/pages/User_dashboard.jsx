
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function UserDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <div className="space-y-8">
        <User_details />
        <Purchased_course />
      </div>
    </div>
  )
}

function User_details() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/routes/user/dashboard');
            const { username, firstname, lastname } = response.data;
            setData({ username, firstname, lastname });
            
            
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    };

    fetchData();
}, []);
console.log(data);
  if (!data) return <div>Loading...</div>

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
    <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-24 h-24">
            <AvatarImage src="/photos/img_avatar.webp" alt={`${data.firstname} ${data.lastname}`} />
            <AvatarFallback>{`${data.firstname[0]}${data.lastname[0]}`}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{`${data.firstname} ${data.lastname}`}</h2>
            <p className="text-gray-500">{data.username}</p>
        </div>
    </div>
</CardContent>
    </Card>
  )
}

function Purchased_course() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchCourses = async () => {
      try {
        // Uncomment the following lines when your API is ready
        // const response = await axios.get('https://your-backend-url.com/api/purchased-courses');
        // setCourses(response.data);

        // Placeholder data
        setCourses([
          { id: 1, title: "Introduction to React", progress: 60, image: "https://via.placeholder.com/150" },
          { id: 2, title: "Advanced JavaScript", progress: 30, image: "https://via.placeholder.com/150" },
          { id: 3, title: "CSS Mastery", progress: 90, image: "https://via.placeholder.com/150" },
          { id: 4, title: "Node.js Fundamentals", progress: 10, image: "https://via.placeholder.com/150" },
        ])
      } catch (error) {
        console.error("There was an error fetching the courses!", error)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Purchased Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-t-lg" />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
              <CardDescription>Progress: {course.progress}%</CardDescription>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Continue Learning</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

