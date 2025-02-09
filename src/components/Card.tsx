import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

interface CardProps {
  user: {
    name: string;
    age: number;
    weight: number;
    height: number;
  };
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ user, onClick }) => {
  return (
    <div
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-0 bg-gradient-to-br from-white via-white to-teal-50"
      onClick={onClick}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16" />

      <CardContent className="relative p-8">
        <div className="flex flex-col gap-6">
          {/* Header with Avatar and Name */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
              <AvatarImage src="https://placehold.co/50" alt={user.name} />
              <AvatarFallback className="text-lg bg-teal-100 text-teal-700">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">{user.name}</h2>
              <p className="text-gray-500 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-500" />
                Age: {user.age}
              </p>
            </div>
          </div>

          {/* Patient Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
            <div className="space-y-1">
              <p className="text-xs uppercase text-gray-400 font-medium">Weight</p>
              <p className="text-gray-700 font-medium">{user.weight} kg</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase text-gray-400 font-medium">Height</p>
              <p className="text-gray-700 font-medium">{user.height} cm</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              className="relative overflow-hidden group/button"
            >
              <span className="relative z-10 flex items-center gap-2 text-teal-600 group-hover/button:text-teal-50 transition-colors duration-300">
                View Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-teal-600 transform -translate-x-full group-hover/button:translate-x-0 transition-transform duration-300 ease-in-out" />
            </Button>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default Card;