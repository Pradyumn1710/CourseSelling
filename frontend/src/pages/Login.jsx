"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Lock } from "lucide-react"

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    try {
      const response = await axios.post("http://localhost:3000/routes/user_authentication/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      console.log("Login successful:", response.data)
      setSuccess(true)
    } catch (error) {
      console.error("There was an error during login:", error)
    }
  }

  if (success) {
    navigate("/")
  }

  return (
    <div className="flex h-screen">
      <div className="w-[30%] flex items-center justify-center bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2" />

        <Card className="w-[380px] border-none shadow-lg relative z-10">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
            <p className="text-sm text-muted-foreground text-center">Enter your credentials to access your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="johndoe" onChange={handleChange} className="h-11" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="h-11"
                />
              </div>
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={handleSubmit} className="w-full h-11">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-primary font-medium hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/signup")
                }}
              >
                Create account
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
      <div
        className="w-[70%] bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20 flex items-center justify-center">
          <div className="max-w-2xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl opacity-90">Sign in to continue your journey with us.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
