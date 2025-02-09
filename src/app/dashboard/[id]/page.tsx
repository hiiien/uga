// "use client"

// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"

// export default function UserDashboard() {
//   const { id } = useParams()  // Dynamically gets the user ID from the URL
//   const [userData, setUserData] = useState<any>(null)
//   const router = useRouter()

//   useEffect(() => {
//     // Fetch user data based on id or set some state
//     async function fetchUserData() {
//       // Replace with your actual API call or logic
//       const response = await fetch(`/api/users/${id}`)
//       if (response.ok) {
//         const data = await response.json()
//         setUserData(data)
//       } else {
//         // Handle error or redirect if user not found
//         router.push("/dashboard")
//       }
//     }
//     fetchUserData()
//   }, [id, router])

//   return (
//     <div>
//       <h1>User Dashboard for {id}</h1>
//       {userData ? (
//         <pre>{JSON.stringify(userData, null, 2)}</pre>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   )
// }

"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Phone, Video, MoreHorizontal, Download, MoreVertical, Bell } from "lucide-react"
import { Sidebar } from "../sidebar"
import Calendar from "@/components/ui/calendar"
import NutrientChart from "@/components/NutrientChart"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { set, setDate } from "date-fns"

// Dynamically import NoSSRChart with SSR disabled
const NoSSRChart = dynamic(() => import("../../../components/ui/NoSSRChart"), { ssr: false })

const mockLog = {
  "2_25_25": true, // Took meds ✅
  "2_26_25": false, // Missed meds ❌
  "2_27_25": true,
  "2_28_25": false,
  "2_29_25": true,
}

export default function Page() {
  const recommendedData = [
    { name: "Carbs", value: 50 },
    { name: "Fats", value: 30 },
    { name: "Protein", value: 20 },
  ]

  const { id } = useParams(); 
  console.log("id", id)
  const [data, setData] = useState<any>([]);
  const [jsonData, setJsonData] = useState<any>(null);
  const [dateData, setDateData] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const router = useRouter()

  const COLORS = {
    Protein: "hsl(0, 77%, 84%)",
    Carbs: "hsl(170.57, 76.92%, 64.31%)",
    Fat: "hsl(var(--chart-3))",
  };
    
  useEffect(() => {
    async function fetchData() {
      try {
        const coreQuery = `queries=id:${id}&queries=type:core`;
        const dateQuery = `queries=id:${id}&queries=type:date`;
        const coreUrl = `http://localhost:8080/filter_files?${coreQuery}`;
        const dateUrl = `http://localhost:8080/filter_files?${dateQuery}`;

        const [coreResponse, dateResponse] = await Promise.all([
          fetch(coreUrl, { method: "GET" }),
          fetch(dateUrl, { method: "GET" })
        ]);
        
        if (!coreResponse.ok || !dateResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const coreData = await coreResponse.json();
        const dateData = await dateResponse.json();

        console.log("Core Data:", coreData);
        console.log("Date Data:", dateData);

        setJsonData(coreData[0]);
        setDateData(dateData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-100 text-gray-900">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6"
      >
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P2vICEJIg813fYnqzfSBLL7xaRLH5t.png"
                      alt="Patient"
                    />
                    <AvatarFallback>HB</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold">{jsonData?.name}</h2>
                    <p className="text-gray-500"></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">General Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {jsonData ? (
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Date of birth</div>
                              <div>09 March 1953</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">CSN</div>
                              <div>1224 9200 01</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Address</div>
                            <div>V.Horta 6, Utrecht</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Insurance</div>
                              <div>CZ, 3661254</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Mobile</div>
                              <div>0612352296</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-center">Nutrition Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.length > 0 ? (
                        <NoSSRChart recommendedData={recommendedData} userData={data} COLORS={COLORS} />
                      ) : (
                        <div className="h-[200px] flex items-center justify-center">
                          <Skeleton className="h-full w-full rounded-full" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardContent className="w-full flex flex-col items-center justify-center border-none shadow-none">
                      {dateData ? <NutrientChart /> : <Skeleton className="h-[300px] w-full" />}
                    </CardContent>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg flex flex-col items-center">
                <CardHeader className="flex items-center justify-center">
                  <CardTitle className="text-lg">Medication Log</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 flex flex-col items-center justify-center">
                  {dateData ? <Calendar log={mockLog} /> : <Skeleton className="h-[300px] w-full" />}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Meal Records</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {records.length > 0 ? (
                    records.map((record, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                        className="flex items-center justify-between rounded-lg bg-white/50 backdrop-blur-sm border border-white/10 shadow-sm p-4"
                      >
                        <div className="grid gap-1">
                          <div className="text-sm text-gray-500">{record.date}</div>
                          <div>{record.brief}</div>
                          <div className="text-sm text-gray-500">{record.specialist}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <>
                      <Skeleton className="h-[60px] w-full" />
                      <Skeleton className="h-[60px] w-full" />
                      <Skeleton className="h-[60px] w-full" />
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}