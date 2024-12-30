'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, ArrowRight } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export function CourseCard({ title, image, students, price }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{students}+</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ViewMoreCard() {
  return (
    <Link to="/courses">
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full group cursor-pointer">
        <div className="aspect-video relative overflow-hidden bg-primary/5 flex items-center justify-center">
          <div className="text-primary group-hover:scale-110 transition-transform duration-300">
            <ArrowRight className="w-12 h-12" />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-2">Explore More Courses</h3>
          <p className="text-sm text-muted-foreground">
            Discover our full collection of courses
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function PopularCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/routes/courses/all_courses')
        console.log('Courses fetched:', response.data) // Log fetched data
        setCourses(response.data.data.slice(0, 2)); // Only take the first 2 courses
      } catch (err) {
        console.error('Error fetching courses:', err) // Log any errors
        setCourses([]) // Set empty array if fetch fails
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">Popular courses for you</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-slate-200" />
                <CardContent className="p-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Popular courses for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
          <ViewMoreCard />
        </div>
      </div>
    </section>
  )
}

