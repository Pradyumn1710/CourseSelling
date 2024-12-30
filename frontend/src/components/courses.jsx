'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, Star, DollarSign } from 'lucide-react'
import { Button } from "@/components/ui/button"

async function fetchCourses() {
  // This would be your actual API endpoint
  const response = await fetch('/api/courses')
  return response.json()
}

function CourseCard({ title, image, students, rating, price }) {
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
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
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

export default function PopularCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Learn app development in 30 days",
      image: "/placeholder.svg?height=200&width=300",
      students: "500",
      rating: "4.9",
      price: "105.00"
    },
    {
      id: 2,
      title: "Advance motion graphics",
      image: "/placeholder.svg?height=200&width=300",
      students: "500",
      rating: "4.9",
      price: "105.00"
    },
    {
      id: 3,
      title: "Learn CMS Development",
      image: "/placeholder.svg?height=200&width=300",
      students: "500",
      rating: "4.9",
      price: "105.00"
    },
    {
      id: 4,
      title: "The Complete Web Design course",
      image: "/placeholder.svg?height=200&width=300",
      students: "500",
      rating: "4.9",
      price: "105.00"
    },
    {
      id: 5,
      title: "Advance Drawing",
      image: "/placeholder.svg?height=200&width=300",
      students: "500",
      rating: "4.9",
      price: "105.00"
    },
    {
      id: 6,
      title: "Advance videography course",
      image: "/placeholder.svg?height=200&width=300",
      students: "500",
      rating: "4.9",
      price: "105.00"
    }
  ])

  useEffect(() => {
    // Fetch courses when component mounts
    fetchCourses().then(data => setCourses(data)).catch(console.error)
  }, [])

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Popular courses for you</h2>
            <p className="text-muted-foreground">
              Get the best course with the best price with world-class tutors
            </p>
          </div>
          <Button variant="link" className="text-primary">
            See All Jobs
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  )
}

