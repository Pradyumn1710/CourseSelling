"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddCoursePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)
  
  const router = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post("http://localhost:3000/routes/admin/add_course", {
        title,
        description,
        imageUrl,
        price
      }, { withCredentials: true })

      alert(response.data.message)
      // Redirect or handle success
      router.push("/courses") // Redirect to the courses page
    } catch (error) {
      console.error("Error adding course:", error)
      alert("Failed to add course.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setTitle("")
    setDescription("")
    setImageUrl("")
    setPrice("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Add a New Course</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-lg font-medium text-gray-700">Course Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter course title"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-lg font-medium text-gray-700">Course Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter course description"
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-lg font-medium text-gray-700">Course Image URL</label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-lg font-medium text-gray-700">Course Price</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter course price"
              required
            />
          </div>

          <div className="flex justify-between space-x-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800 focus:ring-2 focus:ring-primary-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className={`bg-primary text-white ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
