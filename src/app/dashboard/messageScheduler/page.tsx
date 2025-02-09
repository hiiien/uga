"use client"

import { useState } from "react"
import { Clock, Phone, Plus, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sidebar } from "../sidebar"

export default function ScheduleCall() {
  const [name, setName] = useState("")
  const [phoneNumbers, setPhoneNumbers] = useState([""])
  const [trigger_time, setTimestamp] = useState("")

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""])
  }

  const updatePhoneNumber = (index: number, value: string) => {
    const updatedNumbers = [...phoneNumbers]
    updatedNumbers[index] = value
    setPhoneNumbers(updatedNumbers)
  }

  const removePhoneNumber = (index: number) => {
    const updatedNumbers = phoneNumbers.filter((_, i) => i !== index)
    setPhoneNumbers(updatedNumbers)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    try {
      const updatedNumbers = phoneNumbers.map((number) => "+1" + number)
      setPhoneNumbers(updatedNumbers)
      const response = await fetch("localhost:8080/schedule_call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, updatedNumbers, trigger_time }),
      });
      console.log("Response ", response)
      const data = await response.json();
      console.log("Data ", data)
    } catch (error) {
      console.error("Error scheduling call:", error);
    }
    console.log({ name, phoneNumbers, trigger_time })
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-100 text-gray-900">
    <Sidebar />
    <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl mx-auto my-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Call</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-700">
              Name for the Call
            </Label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter call name"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700">Phone Numbers</Label>
            {phoneNumbers.map((number, index) => (
              <div key={index} className="mt-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="tel"
                    value={number}
                    onChange={(e) => updatePhoneNumber(index, e.target.value)}
                    className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removePhoneNumber(index)}
                    variant="outline"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={addPhoneNumber}
              variant="outline"
              className="mt-2 text-teal-600 hover:text-teal-700"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Phone Number
            </Button>
          </div>

          <div>
            <Label htmlFor="trigger_time" className="text-gray-700">
              Call Time
            </Label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="trigger_time"
                type="datetime-local"
                value={trigger_time}
                onChange={(e) => setTimestamp(e.target.value)}
                className="pl-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
            Schedule Call
          </Button>
        </form>
      </div>
    </div>
  </div>
  )
}

