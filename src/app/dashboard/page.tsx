"use client"
import { redirect } from "next/navigation"
import dynamic from "next/dynamic"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Phone, Video, MoreHorizontal, Download, MoreVertical, Bell } from "lucide-react"
import { Sidebar } from "./sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Card from "@/components/Card"


const users = [
    {
      name: "Jay Roy",
      age: 22,
      sex: "male", 
      height: 179,
      weight: 160,
      address: "905 2nd St",
      phone_number: "2247707887",
    },
    {
      name: "Henk Boerman",
      age: 53,
      sex: "male",
      height: 175,
      weight: 170,
      address: "123 4th Ave",
      phone_number: "4703300803",
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
        {users.map((user) => (
            <Card
              key={user.name}
              user={user}
              onClick={() => router.push(`/dashboard/${user.phone_number}`)}
            />
          ))}
    </div>
      </main>
    </div>
  )
}