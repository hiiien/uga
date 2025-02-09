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
      "Protein": 65.5,
      "Fat": 55.2,
      "Carbs": 220.3,
      "Calories": 1650.5,
      "Vitamin A": 800,
      "Vitamin C": 65,
      "Vitamin D": 15,
      "Vitamin E": 12.5,
      "Vitamin K": 85.2,
      "Thiamin": 1.2,
      "Riboflavin": 1.5,
      "Niacin": 16.2,
      "Vitamin B6": 1.8,
      "Folate": 380.5,
      "Vitamin B12": 2.5,
      "Pantothenic Acid": 5.2,
      "Choline": 425.3,
      "Calcium": 950.4,
      "Copper": 0.9,
      "Fluoride": 3500.0,
      "Iron": 15.2,
      "Magnesium": 320.5,
      "Manganese": 2.1,
      "Phosphorus": 850.3,
      "Selenium": 55.2,
      "Zinc": 10.5,
      "Potassium": 2850.5,
      "Sodium": 2100.3
    },
    "Medications": false,
    "Exercises": [
      {
        "Name": "walking",
        "Calories Burned": 250.5
      }
    ]
  },
  "2_9_25": {
    "Food Info": {
      "Protein": 72.3,
      "Fat": 62.1,
      "Carbs": 245.5,
      "Calories": 1820.4,
      "Vitamin A": 850,
      "Vitamin C": 75,
      "Vitamin D": 18,
      "Vitamin E": 13.2,
      "Vitamin K": 90.5,
      "Thiamin": 1.3,
      "Riboflavin": 1.6,
      "Niacin": 17.5,
      "Vitamin B6": 1.9,
      "Folate": 400.2,
      "Vitamin B12": 2.8,
      "Pantothenic Acid": 5.5,
      "Choline": 450.2,
      "Calcium": 1000.5,
      "Copper": 1.0,
      "Fluoride": 3600.0,
      "Iron": 16.5,
      "Magnesium": 340.2,
      "Manganese": 2.3,
      "Phosphorus": 900.5,
      "Selenium": 58.5,
      "Zinc": 11.2,
      "Potassium": 3000.3,
      "Sodium": 2250.5
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "running",
        "Calories Burned": 450.8
      }
    ]
  },
  "2_10_25": {
    "Food Info": {
      "Protein": 68.8,
      "Fat": 58.5,
      "Carbs": 232.4,
      "Calories": 1735.2,
      "Vitamin A": 825,
      "Vitamin C": 70,
      "Vitamin D": 16.5,
      "Vitamin E": 12.8,
      "Vitamin K": 87.8,
      "Thiamin": 1.25,
      "Riboflavin": 1.55,
      "Niacin": 16.8,
      "Vitamin B6": 1.85,
      "Folate": 390.3,
      "Vitamin B12": 2.65,
      "Pantothenic Acid": 5.35,
      "Choline": 437.8,
      "Calcium": 975.2,
      "Copper": 0.95,
      "Fluoride": 3550.0,
      "Iron": 15.8,
      "Magnesium": 330.3,
      "Manganese": 2.2,
      "Phosphorus": 875.4,
      "Selenium": 56.8,
      "Zinc": 10.8,
      "Potassium": 2925.4,
      "Sodium": 2175.4
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "cycling",
        "Calories Burned": 350.6
      }
    ]
  },
  "2_11_25": {
    "Food Info": {
      "Protein": 64.2,
      "Fat": 54.8,
      "Carbs": 215.6,
      "Calories": 1605.8,
      "Vitamin A": 780,
      "Vitamin C": 62,
      "Vitamin D": 14.2,
      "Vitamin E": 12.1,
      "Vitamin K": 82.5,
      "Thiamin": 1.15,
      "Riboflavin": 1.45,
      "Niacin": 15.8,
      "Vitamin B6": 1.75,
      "Folate": 370.4,
      "Vitamin B12": 2.35,
      "Pantothenic Acid": 5.05,
      "Choline": 412.6,
      "Calcium": 925.3,
      "Copper": 0.85,
      "Fluoride": 3450.0,
      "Iron": 14.8,
      "Magnesium": 310.4,
      "Manganese": 2.0,
      "Phosphorus": 825.2,
      "Selenium": 53.5,
      "Zinc": 10.2,
      "Potassium": 2775.2,
      "Sodium": 2025.6
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "yoga",
        "Calories Burned": 200.4
      }
    ]
  },
  "2_12_25": {
    "Food Info": {
      "Protein": 75.6,
      "Fat": 65.3,
      "Carbs": 258.7,
      "Calories": 1925.8,
      "Vitamin A": 875,
      "Vitamin C": 80,
      "Vitamin D": 19.5,
      "Vitamin E": 13.8,
      "Vitamin K": 93.2,
      "Thiamin": 1.35,
      "Riboflavin": 1.65,
      "Niacin": 18.2,
      "Vitamin B6": 1.95,
      "Folate": 415.8,
      "Vitamin B12": 2.95,
      "Pantothenic Acid": 5.65,
      "Choline": 462.5,
      "Calcium": 1025.8,
      "Copper": 1.05,
      "Fluoride": 3650.0,
      "Iron": 17.2,
      "Magnesium": 350.5,
      "Manganese": 2.4,
      "Phosphorus": 925.8,
      "Selenium": 60.2,
      "Zinc": 11.5,
      "Potassium": 3075.6,
      "Sodium": 2325.8
    },
    "Medications": true,
    "Exercises": [
      {
        "Name": "swimming",
        "Calories Burned": 485.5
      }
    ]
  }
}

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

export default function Page() {
  const recommendedData = [
    { name: "Carbs", value: 50 },
    { name: "Fats", value: 30 },
    { name: "Protein", value: 20 },
  ]

  const { id } = useParams();
  const router = useRouter()
  
  // Find user data based on id
  const userData = users.find((user, index) => index.toString() === id);

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
                    <AvatarFallback>{userData?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold">{userData?.name}</h2>
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
                            <div className="text-sm text-gray-500">Age</div>
                              <div>38</div>
                            </div>
                            <div>
                            <div className="text-sm text-gray-500">Mobile</div>
                            <div>(224) 770-7887</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Address</div>
                            <div>{userData.address}</div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Date of Birth</div>
                              <div>March 22, 1986</div>
                            </div>
                          </div>
                        </div>
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
                  <CardTitle className="text-lg">Meal Records & Exercise Log</CardTitle>
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
                          <div>{record.specialist}</div>
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