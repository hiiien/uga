"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const restrictedDates = new Set([
  "2025-02-10",
  "2025-02-14",
  "2025-02-20",
]); // Dates in YYYY-MM-DD format

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const currentDate = new Date()
  const [medicationLog, setMedicationLog] = useState({});
  useEffect(() => {
    const mockLog = {
      "2024-02-01": true,  // Took meds ✅
      "2024-02-02": false, // Missed meds ❌
      "2024-02-03": true,
      "2024-02-04": false,
      "2024-02-05": true,
    };
    setMedicationLog(mockLog);
  }, []);
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const daysToCheck = []
  for (let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); d <= currentDate; d.setDate(d.getDate() + 1)) {
    daysToCheck.push(new Date(d));
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/SAMPLE");
        
  //     } catch (error) {
        
  //     }
  //   };
  //   fetchData();
  // }, []);

  const modifiersStyles = {
    taken: { backgroundColor: "green", color: "white" },
    missed: { backgroundColor: "red", color: "white" },
  };
  
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      disabled={(date) => {
        const dateString = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD
        return restrictedDates.has(dateString);
      }}
      modifiers={{
        // Mark non-restricted (non-disabled) dates as enabled
        enabled: (date) => {
          const dateString = date.toISOString().split("T")[0];
          return !restrictedDates.has(dateString);
        },
      }}
      // Use modifiersClassNames to assign colors based on enabled/disabled
      modifiersClassNames={{
        disabled: "bg-custom-100 text-white cursor-not-allowed opacity-100",
        enabled: "bg-custom-200 text-white cursor-pointer opacity-100",
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };