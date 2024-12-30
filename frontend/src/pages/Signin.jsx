import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from 'axios'
// import { log } from 'console'

export default function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setFormData({ ...formData, username: e.target.value });
    } else if (e.target.name === "password") {
      setFormData({ ...formData, password: e.target.value });
    }
  
    console.log("Updated Form Data:", formData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("just before sending data -" , formData);
    const temp = {
      "username": "test11",
      "password":"Test1@123"
  }
    try {
      // console.log("Fuckkkkkkkkkkkkkkkkkkkkk you ")
      const response = await axios.post('http://localhost:3000/routes/user_authentication/login', formData, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true, // Allows cookies to be sent/received
      }
      );
      console.log("Login successful:", response.data);
      } catch (error) {
        console.log("Error during login:", error);
      }
  }
  return (
    <div className="flex h-screen">
      <div className="w-[30%] flex items-center justify-center bg-background">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" placeholder="Enter your username" onChange={handleChange} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Sign In</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-[70%] bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
        {/* You can replace the placeholder image with your actual image */}
      </div>
    </div>
  )
}

