"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, Settings, HelpCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChartIcon } from "lucide-react";

export function Sidebar() {
  const router = useRouter();

  return (
    <div className="w-64 bg-white/70 backdrop-blur-md border-r border-white/20 p-6">
      <div className="mb-8 flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900">GP Practice</span>
      </div>
      <nav className="space-y-2">
        <Button
          onClick={() => router.push("/dashboard/messageScheduler")}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900 w-full"
        >
          <Calendar className="h-5 w-5" />
          Message Scheduler
        </Button>
        <Button
          onClick={() => router.push("/dashboard/")}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900 w-full"
        >
          <LineChartIcon className="h-5 w-5" />
          Dashboard
        </Button>
      </nav>
      <div className="mt-auto pt-8">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:bg-teal-100/30 hover:text-gray-900"
        >
          <HelpCircle className="h-5 w-5" />
          Help
        </Link>
      </div>
    </div>
  );
}

