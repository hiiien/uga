"use client"
import { redirect } from "next/navigation"
import dynamic from "next/dynamic"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Phone, Video, MoreHorizontal, Download, MoreVertical, Bell } from "lucide-react"
import { Sidebar } from "./sidebar"
import { useEffect, useState } from "react"

var users = [
    {
      id: "2247707887",
      name: "Jay Roy",
      age: "22",
      sex: "male",
      height: "179",
      weight: "160",
      address: "905 2nd St",
    },
    {
      id: "4703300803",
      name: "Henk Boerman",
      age: "53",
      sex: "male",
      height: "175",
      weight: "170",
      address: "123 4th Ave",
    },
  ]

const TooltipButton = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8080/get_all_users`);
        const data = await response.json();
        console.log(data);
        users = data[0];
      };
  
      fetchData();
  
    }, []);

    return (
        <div className="relative inline-block">
            <Button size="icon" variant="outline" onClick={() => setOpen(!open)}>
                <MoreHorizontal className="h-5 w-5" />
            </Button>
            {open && (
                <div className="absolute right-0 mt-2 w-32 p-2 bg-white border rounded-sm border-gray-200 shadow-md">
                    <button
                        onClick={() => {
                            // Add your open option logic here
                            redirect("/dashboard/id")
                        }}
                        className="w-full text-left text-sm"
                    >
                        Open
                    </button>
                </div>
            )}
        </div>
    )
}

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-100 text-gray-900">
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">List of patients</span>
              <span className="text-gray-500">/</span>
              <span>Henk Boerman</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input className="w-[300px] bg-white border-gray-200 pl-10" placeholder="Search" type="search" />
              <Mic className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P2vICEJIg813fYnqzfSBLL7xaRLH5t.png"
                  alt="Doctor"
                />
                <AvatarFallback>GP</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div>Dr. A. Jongkamp</div>
                <div className="text-gray-500">General Practitioner</div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {users.map((user) => (
            <Card
              key={user.id}
              className="cursor-pointer hover:shadow-md transition duration-200 border border-gray-200/50 backdrop-blur-sm bg-white/50"
              onClick={() => redirect(`/${user.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://via.placeholder.com/50" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                      <p className="text-gray-500">Age: {user.age}, {user.sex}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {user.address}
                  </p>
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        redirect(`dashboard/${user.id}`) 
                      }}
                      className="text-teal-600 hover:text-teal-700 border-teal-200 hover:border-teal-300 bg-teal-50/50"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}