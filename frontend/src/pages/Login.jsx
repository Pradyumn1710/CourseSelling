import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import {  Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await axios.post('http://localhost:3000/routes/user_authentication/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log('Login successful:', response.data);
      setSuccess(true);
      // Handle successful login (e.g., redirect to homepage)
    } catch (error) {
      console.error('There was an error during login:', error);
      // Handle login error (e.g., display error message)
    }
  };

  if (success) {
    navigate('/');
  }

  return (
    <div className="flex h-screen">
      <div className="w-[30%] flex items-center justify-center bg-background">
        <Card className="w-[350px]">
          <CardHeader>
            <h2 className="text-2xl font-semibold">Sign In</h2>
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
  );
}