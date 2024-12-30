import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from 'axios'

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: ''
  })

  const handleChange = (e) => {
    // This single line can handle all the individual things , no need to use separate varaible 
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your signup logic here
    try {
        const response = await axios.post('http://localhost:3000/routes/user_authentication/signup', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("Signup successful",response.data);
          


    }
    catch(error){
        console.log("There was error during signup.");
        
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-[30%] flex items-center justify-center bg-background">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your account to get started.</CardDescription>
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" name="firstname" placeholder="Enter your first name" onChange={handleChange} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" name="lastname" placeholder="Enter your last name" onChange={handleChange} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Sign Up</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-[70%] bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}>
        {/* You can replace the placeholder image with your actual image */}
      </div>
    </div>
  )
}

