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
import { useRouter } from "next/navigation"

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
    const router = useRouter();
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
                            router.push("/dashboard/id")
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
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/get_user_info', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        console.log("Fetched JSON Data:", jsonData);

        // If the response structure is the array you provided, we directly set the data
        setData(jsonData);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    fetchData();
  }, []);

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
      {data.map((user) => (
        <Card
          key={user.name}
          className="group relative overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-0 bg-gradient-to-br from-white via-white to-teal-50"
          onClick={() => router.push(`/dashboard/${user.phone_number}`)}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-100/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />

          <CardContent className="relative p-8">
            <div className="flex flex-col gap-6">
              {/* Header with Avatar and Name */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                  <AvatarImage src="https://placehold.co/50" alt={user.name} />
                  <AvatarFallback className="text-lg bg-teal-100 text-teal-700">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">{user.name}</h2>
                  <p className="text-gray-500 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500" />
                    Age: {user.age}
                  </p>
                </div>
              </div>

              {/* Patient Details */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="space-y-1">
                  <p className="text-xs uppercase text-gray-400 font-medium">Weight</p>
                  <p className="text-gray-700 font-medium">{user.weight} kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase text-gray-400 font-medium">Height</p>
                  <p className="text-gray-700 font-medium">{user.height} cm</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    redirect(`/dashboard/${user.phone_number}`)
                  }}
                  className="relative overflow-hidden group/button"
                >
                  <span className="relative z-10 flex items-center gap-2 text-teal-600 group-hover/button:text-teal-50 transition-colors duration-300">
                    View Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover/button:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-teal-600 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out" />
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