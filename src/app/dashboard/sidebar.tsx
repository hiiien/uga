"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // ✅ Use next/navigation instead of next/router
import {
  Calendar,
  LayoutDashboard,
  Users,
  MessageSquare,
  Video,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname(); // ✅ Get current route
  const router = useRouter(); // ✅ Use next/navigation for navigation

  return (
    <div className="w-64 bg-white/70 backdrop-blur-md border-r border-white/20 p-6 flex flex-col h-screen">
      {/* Header */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xl">
          GP
        </div>
        <span className="text-xl font-semibold text-gray-900">GP Practice</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname === "/dashboard"
              ? "bg-teal-100/50 text-gray-900"
              : "text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>

        <Button
          onClick={() => router.push("./messageScheduler")}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900 w-full"
        >
          <Calendar className="h-5 w-5" />
          Schedule Call
        </Button>

        <Link
          href="/appointments"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname === "/appointments"
              ? "bg-teal-100/50 text-gray-900"
              : "text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
          }`}
        >
          <Users className="h-5 w-5" />
          Appointments
        </Link>

        <Link
          href="/patients"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname === "/patients"
              ? "bg-teal-100/50 text-gray-900"
              : "text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
          }`}
        >
          <Users className="h-5 w-5" />
          Patients
        </Link>

        <Link
          href="/messages"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname === "/messages"
              ? "bg-teal-100/50 text-gray-900"
              : "text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <div className="flex flex-1 items-center justify-between">
            Messages
            <span className="rounded-full bg-teal-500 px-2 py-0.5 text-xs text-white">
              42
            </span>
          </div>
        </Link>

        <Link
          href="/telemedicine"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname === "/telemedicine"
              ? "bg-teal-100/50 text-gray-900"
              : "text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
          }`}
        >
          <Video className="h-5 w-5" />
          Telemedicine
        </Link>
      </nav>

      {/* Settings and Help */}
      <div className="mt-auto pt-8">
        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname === "/settings"
              ? "bg-teal-100/50 text-gray-900"
              : "text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
          }`}
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
                <Link
                  href="/help"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    pathname === "/help"
                      ? "bg-teal-100/50 text-gray-900"
                      : "text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
                  }`}
                >
                  <HelpCircle className="h-5 w-5" />
                  Help
                </Link>
              </div>
            </div>
          );
        }
