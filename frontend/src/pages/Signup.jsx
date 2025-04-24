"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ArrowRight, User } from "lucide-react"
import { useEffect } from "react"
import {Switch} from '../components/ui/switch'
// import { log } from "console"


export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function Signup() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [usernameError, setUsernameError] = useState(false);
  const [admin,isAdmin] = useState(false);


  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  })

  const [formErrors, setFormError] = useState({
    username: "",
    firstname: '',
    lastname: "",
    password: "",
  })

  const debouncedUsername = useDebounce(formData.username, 400)
  const debouncedFirstname = useDebounce(formData.firstname,300)
  const debouncedLastname = useDebounce(formData.lastname, 300)
  const debouncedPassword = useDebounce(formData.password, 300)
  // console.log(debouncedPassword);

  useEffect(() => {
    if (debouncedFirstname.trim() !== "") {
      setFormError((prev) => ({ ...prev, firstname: "" }));
    }
  }, [debouncedFirstname]);
  
  useEffect(() => {
    if (debouncedLastname.trim() !== "") {
      setFormError((prev) => ({ ...prev, lastname: "" }));
    }
  }, [debouncedLastname]);
  
  useEffect(() => {
    if (debouncedPassword.trim() !== "") {
      setFormError((prev) => ({ ...prev, password: "" }));
    }
  }, [debouncedPassword]);

  useEffect(() => {
    if (debouncedUsername.trim() !== "") {
      setFormError((prev) => ({ ...prev, username: "" }))
    }
  }, [debouncedUsername])
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (debouncedUsername === ""){
      setUsernameError(false);
      return
    } // Don't call if username is empty

    const checkUsernameExistence = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/routes/user_authentication/check-username?username=${debouncedUsername}`
        )
        // Assuming backend response { exists: true } for existing usernames
        setUsernameError(response.data.exists)
      } catch (error) {
        console.error("Error checking username:", error)
      }
    }

    checkUsernameExistence()
  }, [debouncedUsername])  // Runs when debouncedUsername changes

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newError = {
      username: formData.username ? "" : 'Username is required',
      firstname: formData.firstname ? "" : 'Firstname is required',
      lastname: formData.lastname ? "" : 'Last Name is required',
      password: formData.password ? "" : 'Password is required',
    }

    setFormError(newError);

    if (Object.values(newError).some((msg) => msg !== "")) return


    // console.log("Form submitted:", formData)

    const signupUrl = admin
    ? "http://localhost:3000/routes/admin_authentication/signup"
    : "http://localhost:3000/routes/user_authentication/signup"


    try {
      const response = await axios.post(
        signupUrl,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Signup successful", response.data)
      setSuccess(true)
      setUsernameError(false) // clear any error
    }  catch (error) {
      if (
        error.response.status === 400 &&
        error.response.data.message === 'Username already exists'
      ) {
        console.log("Username exists error caught");
        console.log(error.response.data.error);
    
        setUsernameError(true);
      } else if (error.response.status === 400) {
        console.log("Signup failed due to incorrect credentials format");
        setSuccess(false);
        alert("Please provide credentials in the correct format.");
      } else {
        console.log("Signup failed with some other error", error);
        setSuccess(false);
      }
    }
  }


  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);
// console.log(formErrors.username);
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
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" name="firstname" placeholder="John" onChange={handleChange} className="h-11" />
                  {formErrors.firstname && <p className="text-sm text-red-500">{formErrors.firstname}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" name="lastname" placeholder="Doe" onChange={handleChange} className="h-11" />
                  {formErrors.lastname && <p className="text-sm text-red-500">{formErrors.lastname}</p>}
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="mb-4">
                  {/* Show warning if username exists */}
                  {/* {usernameError && (
                    <p className="text-sm text-red-500 mb-1">Username already exists</p>
                  )} */}

                  {/* Label (value prop not needed here) */}
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    className={`h-11 ${formErrors.username || usernameError ? "border-red-500" : ""}`}
                  />
                  {formErrors.username && <p className="text-sm text-red-500">{formErrors.username}</p>}
                  {!formErrors.username && usernameError && (
                    <p className="text-sm text-red-500">Username already exists</p>
                  )}
                </div>
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
                {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
              </div >
                  <div className="flex">
                    <Label htmlFor='admin'>Are you an Instructor</Label>
                      <Switch
                      checked={admin}
                      onCheckedChange={(val) => isAdmin(val)}
                      ></Switch>
                  </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={handleSubmit} className="w-full h-11">
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary font-medium hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/login")
                }}
              >
                Sign in
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
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
            <p className="text-xl opacity-90">
              Create an account to get started with our amazing features and services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
