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
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

// Dynamically import NoSSRChart with SSR disabled
const NoSSRChart = dynamic(() => import("../../../components/ui/NoSSRChart"), { ssr: false })

const mockRecords = {
  "2_8_25": {
    "Food Info": {
      "Protein": 0.2844,
      "Fat": 0.0474,
      "Carbs": 0,
      "Calories": 2.37,
      "Vitamin A": 0,
      "Vitamin C": 0,
      "Vitamin D": 0,
      "Vitamin E": 0.0237,
      "Vitamin K": 0.237,
      "Thiamin": 0.0332,
      "Riboflavin": 0.1801,
      "Niacin": 0.4527,
      "Vitamin B6": 0.0024,
      "Folate": 4.74,
      "Vitamin B12": 0,
      "Pantothenic Acid": 0.602,
      "Choline": 6.162,
      "Calcium": 4.74,
      "Copper": 0.0000047,
      "Fluoride": 214959.0,
      "Iron": 0.0237,
      "Magnesium": 7.11,
      "Manganese": 0,
      "Phosphorus": 7.11,
      "Selenium": 0,
      "Zinc": 0.0474,
      "Potassium": 116.13,
      "Sodium": 4.74
    },
    "Medications": false,
    "Exercises": [
      {
        "Name": "walking",
        "Calories Burned": 61.25
      }
    ]
  },
  "2_9_25": {
    "Food Info": {
      "Protein": 0.312,
      "Fat": 0.052,
      "Carbs": 1.1,
      "Calories": 3.15,
      "Vitamin A": 5,
      "Vitamin C": 2,
      "Vitamin D": 0,
      "Vitamin E": 0.025,
      "Vitamin K": 0.250,
      "Thiamin": 0.035,
      "Riboflavin": 0.190,
      "Niacin": 0.460,
      "Vitamin B6": 0.003,
      "Folate": 5.0,
      "Vitamin B12": 0,
      "Pantothenic Acid": 0.610,
      "Choline": 6.5,
      "Calcium": 5.0,
      "Copper": 0.000005,
      "Fluoride": 215000.0,
      "Iron": 0.025,
      "Magnesium": 7.5,
      "Manganese": 0,
      "Phosphorus": 7.5,
      "Selenium": 0,
      "Zinc": 0.050,
      "Potassium": 118.0,
      "Sodium": 5.0
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "running",
        "Calories Burned": 120.5
      }
    ]
  },
  "2_10_25": {
    "Food Info": {
      "Protein": 0.290,
      "Fat": 0.048,
      "Carbs": 0.5,
      "Calories": 2.85,
      "Vitamin A": 3,
      "Vitamin C": 1.5,
      "Vitamin D": 0,
      "Vitamin E": 0.024,
      "Vitamin K": 0.240,
      "Thiamin": 0.034,
      "Riboflavin": 0.185,
      "Niacin": 0.455,
      "Vitamin B6": 0.0025,
      "Folate": 4.8,
      "Vitamin B12": 0,
      "Pantothenic Acid": 0.605,
      "Choline": 6.3,
      "Calcium": 4.8,
      "Copper": 0.0000048,
      "Fluoride": 214980.0,
      "Iron": 0.024,
      "Magnesium": 7.2,
      "Manganese": 0,
      "Phosphorus": 7.2,
      "Selenium": 0,
      "Zinc": 0.048,
      "Potassium": 117.5,
      "Sodium": 4.8
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "cycling",
        "Calories Burned": 90.75
      }
    ]
  },
  "2_11_25": {
    "Food Info": {
      "Protein": 0.275,
      "Fat": 0.045,
      "Carbs": 0.3,
      "Calories": 2.50,
      "Vitamin A": 2,
      "Vitamin C": 1,
      "Vitamin D": 0,
      "Vitamin E": 0.022,
      "Vitamin K": 0.230,
      "Thiamin": 0.032,
      "Riboflavin": 0.175,
      "Niacin": 0.450,
      "Vitamin B6": 0.0022,
      "Folate": 4.6,
      "Vitamin B12": 0,
      "Pantothenic Acid": 0.600,
      "Choline": 6.0,
      "Calcium": 4.6,
      "Copper": 0.0000045,
      "Fluoride": 214950.0,
      "Iron": 0.022,
      "Magnesium": 7.0,
      "Manganese": 0,
      "Phosphorus": 7.0,
      "Selenium": 0,
      "Zinc": 0.045,
      "Potassium": 115.0,
      "Sodium": 4.6
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "yoga",
        "Calories Burned": 50.25
      }
    ]
  },
  "2_12_25": {
    "Food Info": {
      "Protein": 0.320,
      "Fat": 0.055,
      "Carbs": 1.2,
      "Calories": 3.25,
      "Vitamin A": 6,
      "Vitamin C": 3,
      "Vitamin D": 0,
      "Vitamin E": 0.026,
      "Vitamin K": 0.260,
      "Thiamin": 0.036,
      "Riboflavin": 0.195,
      "Niacin": 0.470,
      "Vitamin B6": 0.0035,
      "Folate": 5.2,
      "Vitamin B12": 0,
      "Pantothenic Acid": 0.620,
      "Choline": 6.7,
      "Calcium": 5.2,
      "Copper": 0.0000052,
      "Fluoride": 215020.0,
      "Iron": 0.026,
      "Magnesium": 7.8,
      "Manganese": 0,
      "Phosphorus": 7.8,
      "Selenium": 0,
      "Zinc": 0.052,
      "Potassium": 120.0,
      "Sodium": 5.2
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "swimming",
        "Calories Burned": 130.0
      }
    ]
  }
}

export default function Page() {
  const recommendedData = [
    { name: "Carbs", value: 50 },
    { name: "Fats", value: 30 },
    { name: "Protein", value: 20 },
  ]

  const { id } = useParams();
  const router = useRouter()

  // Calculate nutrition data from mockRecords
  const nutritionData = Object.values(mockRecords).map(record => ({
    Protein: record["Food Info"].Protein,
    Fat: record["Food Info"].Fat,
    Carbs: record["Food Info"].Carbs
  }));

  // Calculate average nutrition values
  const averageNutrition = nutritionData.reduce((acc, curr) => ({
    Protein: acc.Protein + curr.Protein,
    Fat: acc.Fat + curr.Fat,
    Carbs: acc.Carbs + curr.Carbs
  }), { Protein: 0, Fat: 0, Carbs: 0 });

  const data = [
    { name: "Carbs", value: (averageNutrition.Carbs / nutritionData.length) * 100 },
    { name: "Fats", value: (averageNutrition.Fat / nutritionData.length) * 100 },
    { name: "Protein", value: (averageNutrition.Protein / nutritionData.length) * 100 },
  ];

  // Create medication log from mockRecords
  const medicationLog = Object.entries(mockRecords).reduce<Record<string, boolean>>((acc, [date, record]) => {
    acc[date] = record.Medications;
    return acc;
  }, {});

  // Create meal records from mockRecords
  const mealRecords = Object.entries(mockRecords).map(([date, record]) => ({
    date: date.replace(/_/g, "/"),
    brief: `Calories: ${record["Food Info"].Calories}`,
    specialist: `Exercise: ${record.Exercises[0].Name}`
  }));

  const COLORS = {
    Protein: "hsl(0, 77%, 84%)",
    Carbs: "hsl(170.57, 76.92%, 64.31%)",
    Fat: "hsl(var(--chart-3))",
  };

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
                    <h2 className="text-2xl font-semibold">Hans Brinker</h2>
                    <p className="text-gray-500">Patient ID: {id}</p>
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
                      )
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
                      {data.length > 0 ? <NutrientChart /> : <Skeleton className="h-[300px] w-full" />}
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
                  {medicationLog ? <Calendar log={medicationLog} /> : <Skeleton className="h-[300px] w-full" />}
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
                  {mealRecords.length > 0 ? (
                    mealRecords.map((record, i) => (
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