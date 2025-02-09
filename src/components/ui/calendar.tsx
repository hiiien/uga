import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type LogEntry = {
  [key: string]: boolean
}

interface CalendarCardProps {
  log: LogEntry
}

const CalendarCard: React.FC<CalendarCardProps> = ({ log }) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const getLogStatus = (day: number) => {
    const key = `${currentMonth + 1}_${day}_${currentYear.toString().slice(-2)}`
    return log[key]
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold">
              {day}
            </div>
          ))}
          {Array(firstDayOfMonth)
            .fill(null)
            .map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
          {days.map((day) => {
            const status = getLogStatus(day)
            return (
              <div
                key={day}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center",
                  "border rounded-md",
                  currentDate.getDate() === day && "bg-muted",
                )}
              >
                <span>{day}</span>
                {status !== undefined && (
                  <div className={cn("w-2 h-2 rounded-full mt-1", status ? "bg-green-500" : "bg-red-500")} />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default CalendarCard

