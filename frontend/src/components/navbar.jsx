"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { LogOut, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdmin } from "./AdminContext"

export function Navbar_right() {
  const { admin } = useAdmin()
  const [userName, setUserName] = useState("John Doe")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get("http://localhost:3000/routes/other/verifytoken", {
          withCredentials: true,
        })
        setUserName(response.data.username)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error verifying token:", error)
      }
    }

    verifyToken()
  }, [])

  const handleLogout = async () => {
    try {
      // Add your logout logic here
      console.log("Logging out...")
      // Example: await axios.post('/api/logout')
      setIsLoggedIn(false)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <div className="fixed top-4 right-0 w-auto mt-7 mr-16 z-50 bg-white shadow-lg rounded-full border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center py-2 px-5">
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-base font-medium text-gray-800 dark:text-gray-200">Hi, {userName}</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-gray-100">
                  <Avatar className="h-9 w-9 border-2 border-white transition-transform hover:scale-105">
                    <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link to="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <Link to="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors">
              <Link to="/signup">Sign up</Link>
            </Button>
            <Button variant="default" className="bg-primary text-white hover:bg-primary/90 transition-colors">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}


export function Navbar_left() {
  const { admin } = useAdmin()

  return (
    <div className="navbar-left border-b border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="flex items-center py-3 px-6">
        <Link to="/" className="flex items-center group">
          <img
            src="/photos/logo.png"
            alt="Logo"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="text-2xl font-bold text-gray-800 ml-2 group-hover:text-primary transition-colors">Skillo</div>
        </Link>

        <div className="flex flex-1 justify-center items-center space-x-8 ml-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/about">About</NavLink>

          {admin === true && (
            <>
              <NavLink to="/add-course">Add Course</NavLink>
              <NavLink to="/manage-course">Manage Course</NavLink>
            </>
          )}

          {admin === false && <NavLink to="/my-courses">My Courses</NavLink>}
        </div>
      </div>
    </div>
  )
}

// Helper component for navigation links with consistent styling
function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-gray-700 font-medium px-3 py-2 rounded-md relative group">
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gray-100 rounded-md scale-0 group-hover:scale-100 transition-transform duration-200 origin-center z-0 opacity-0 group-hover:opacity-100"></span>
    </Link>
  )
}
