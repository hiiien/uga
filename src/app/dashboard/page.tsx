import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, Phone, Video, MoreHorizontal, Download, MoreVertical, Bell } from "lucide-react"
import { Sidebar } from "./sidebar"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-100 text-gray-900">
      <Sidebar />
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

        <div className="mb-8">
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
                    <h2 className="text-2xl font-semibold">Henk Boerman</h2>
                    <p className="text-gray-500">boerman53@gmail.com</p>
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
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-6">
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
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Condition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-8">
                      <div className="relative h-32 w-32">
                        {/* Placeholder for circular chart */}
                        <div className="absolute inset-0 rounded-full border-4 border-teal-500" />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-teal-500" />
                          <span>Cardiology</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-teal-400" />
                          <span>Endocrine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-teal-300" />
                          <span>Dermatology</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-teal-200" />
                          <span>Neurology</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <Tabs defaultValue="upcoming" className="w-full">
                    <div className="flex items-center justify-between">
                      <TabsList className="bg-white/50 backdrop-blur-sm">
                        <TabsTrigger value="upcoming" className="data-[state=active]:bg-white">
                          Upcoming Appointments
                        </TabsTrigger>
                        <TabsTrigger value="past" className="data-[state=active]:bg-white">
                          Past Appointments
                        </TabsTrigger>
                      </TabsList>
                      <Button
                        variant="default"
                        className="bg-teal-500/80 backdrop-blur-sm text-white hover:bg-teal-600/80 transition-colors"
                      >
                        New Appointment
                      </Button>
                    </div>
                    <TabsContent value="upcoming">
                      <div className="space-y-4">
                        <div className="text-sm text-teal-600">JUN</div>
                        <div className="rounded-lg bg-white/50 backdrop-blur-sm border border-white/10 shadow-sm p-4">
                          <div className="flex items-center justify-between">
                            <div className="grid gap-1">
                              <div className="text-sm">June 26, 09:45</div>
                              <div className="text-sm text-gray-500">In person</div>
                            </div>
                            <div className="grid gap-1">
                              <div>Earache, fever</div>
                              <div className="text-sm text-gray-500">Dr. V. Jong</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-teal-100/70 backdrop-blur-sm px-3 py-1 text-sm text-teal-600">
                                Confirmed
                              </span>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/50 backdrop-blur-sm border border-white/10 shadow-sm p-4">
                          <div className="flex items-center justify-between">
                            <div className="grid gap-1">
                              <div className="text-sm">June 26, 11:00</div>
                              <div className="text-sm text-gray-500">In person</div>
                            </div>
                            <div className="grid gap-1">
                              <div>Vaccine admin.</div>
                              <div className="text-sm text-gray-500">Assistant</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-teal-100/70 backdrop-blur-sm px-3 py-1 text-sm text-teal-600">
                                Confirmed
                              </span>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="past">
                      <div className="space-y-4">
                        <div className="text-sm text-teal-600">JUL</div>
                        <div className="rounded-lg bg-white/50 backdrop-blur-sm border border-white/10 shadow-sm p-4">
                          <div className="flex items-center justify-between">
                            <div className="grid gap-1">
                              <div className="text-sm">July 07, 16:00</div>
                              <div className="text-sm text-gray-500">Telephone</div>
                            </div>
                            <div className="grid gap-1">
                              <div>Migraine, vo...</div>
                              <div className="text-sm text-gray-500">Dr. J.Wask</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="rounded-full bg-gray-100/70 backdrop-blur-sm px-3 py-1 text-sm text-gray-500">
                                Pending...
                              </span>
                              <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Tests & Results</CardTitle>
                <Button
                  variant="outline"
                  className="bg-teal-500/80 backdrop-blur-sm text-white hover:bg-teal-600/80 transition-colors"
                >
                  Add Result
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "CT Scan brain.mp4", date: "27-Jan-2024" },
                  { name: "Lab. Results", date: "08-Sep-2023" },
                  { name: "Lab. Results", date: "12-Jun-2023" },
                  { name: "Echo kidney, liver", date: "07-Feb-2023" },
                ].map((result, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-white/50 backdrop-blur-sm border border-white/10 shadow-sm p-4"
                  >
                    <div className="grid gap-1">
                      <div>{result.name}</div>
                      <div className="text-sm text-gray-500">{result.date}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border border-white/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Medical Records</CardTitle>
                <Button
                  variant="outline"
                  className="bg-teal-500/80 backdrop-blur-sm text-white hover:bg-teal-600/80 transition-colors"
                >
                  Add Record
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: "Apr 26, 2024", brief: "Urination com...", specialist: "Dr. R.Schreder" },
                  { date: "Feb 11, 2024", brief: "After birth ch...", specialist: "Dr. A.Schoon..." },
                  { date: "Jan 10, 2024", brief: "Ear infection...", specialist: "Dr. D de Gast" },
                  { date: "Nov 22, 2023", brief: "Stomach cra...", specialist: "Dr. V. Jongka..." },
                ].map((record, i) => (
                  <div
                    key={i}
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
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

