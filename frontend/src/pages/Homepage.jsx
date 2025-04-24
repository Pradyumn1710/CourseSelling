'use client'

// import { BrowserRouter, Link } from "react-router-dom";
// import { Link as ScrollLink } from "react-scroll";
// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Users, BookOpen, GraduationCap } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PopularCourses from "@/components/courses";
import  Footer  from "@/components/footer";
import HeroHeader from "@/components/hero_header";
import { Navbar_left, Navbar_right } from "@/components/navbar";

async function fetchStats() {
  // This would be your actual API endpoint
  const response = await fetch('/api/stats')
  return response.json()
}





export default function Homepage() {
  return (
    <div>
      <div className='flex justify-between border border-red'>
            
            <Navbar_left/>
            <Navbar_right/>
            
      </div>
      <HeroHeader />
      <PopularCourses/>
      <Footer/>
    </div>
  )
}

