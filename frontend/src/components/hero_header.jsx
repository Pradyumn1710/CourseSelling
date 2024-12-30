import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Users, BookOpen, GraduationCap } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function HeroHeader() {
    const [stats, setStats] = useState({
    });
  
    

      useEffect(() => {
        const fetchStats = async () => {
          try {
            console.log("Try k andar hu")
            const response = await axios.get('http://localhost:3000/routes/other/stats');
            const { 
                totalUsers,
                totalAdmins,
                totalCourses } = response.data;
            setStats({ 
                totalUsers,
                totalAdmins,
                totalCourses });
          } catch (error) {
            console.error('Error fetching stats:', error);
          }
        };
    
        fetchStats();
      }, []);
  
    return (
      <div className="relative overflow-hidden bg-background pt-24">
        {/* The `pt-24` adds padding to the top to avoid overlap */}
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
  
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8 ml-6">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Getting <span className="text-primary">Quality</span> Education Is Now More{' '}
                <span className="text-primary">Easy</span>
              </h1>
  
              <p className="text-muted-foreground text-lg max-w-md">
              Explore courses in various fields and start your learning journey today.
              </p>
  
              <div className="flex flex-wrap gap-4">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg">
                <Link to='/courses'> All Courses</Link>
                </Button>
              </div>
            </div>
  
            {/* Right column - Image */}
            <div className="relative">
              <img
                src="/photos/img1.gif"
                alt="Student with educational materials"
                className="relative z-10 mx-auto"
              />
            </div>
          </div>
  
          {/* Stats section */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 bg-background/50 backdrop-blur-sm p-6 rounded-lg border">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stats.totalCourses}</div>
                <div className="text-muted-foreground">Total Courses</div>
              </div>
            </div>
  
            <div className="flex items-center gap-4 bg-background/50 backdrop-blur-sm p-6 rounded-lg border">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stats.totalAdmins}</div>
                <div className="text-muted-foreground">Expert Mentors</div>
              </div>
            </div>
  
            <div className="flex items-center gap-4 bg-background/50 backdrop-blur-sm p-6 rounded-lg border">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
                <div className="text-muted-foreground">Students Globally</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  