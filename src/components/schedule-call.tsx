"use client"

import { useState } from "react"
import { Clock, Phone, Plus, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ScheduleCall() {
  const [name, setName] = useState("")
  const [phoneNumbers, setPhoneNumbers] = useState([""])
  const [timestamp, setTimestamp] = useState("")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ name, phoneNumbers, timestamp })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
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
          <Label htmlFor="timestamp" className="text-gray-700">
            Call Time
          </Label>
          <div className="mt-1 relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="timestamp"
              type="datetime-local"
              value={timestamp}
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
  )
}

