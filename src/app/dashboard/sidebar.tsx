import Link from "next/link"
import { Calendar, LayoutDashboard, Users, MessageSquare, Video, Settings, HelpCircle } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-white/70 backdrop-blur-md border-r border-white/20 p-6">
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xl">
          GP
        </div>
        <span className="text-xl font-semibold text-gray-900">GP Practice</span>
      </div>
      <nav className="space-y-2">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <Calendar className="h-5 w-5" />
          Calendar
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <Users className="h-5 w-5" />
          Appointments
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg bg-teal-100/50 backdrop-blur-sm px-3 py-2 text-gray-900"
        >
          <Users className="h-5 w-5" />
          Patients
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <MessageSquare className="h-5 w-5" />
          <div className="flex flex-1 items-center justify-between">
            Messages
            <span className="rounded-full bg-teal-500 px-2 py-0.5 text-xs">42</span>
          </div>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <Video className="h-5 w-5" />
          Telemedicine
        </Link>
      </nav>
      <div className="mt-auto pt-8">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <HelpCircle className="h-5 w-5" />
          Help
        </Link>
      </div>
    </div>
  )
}

