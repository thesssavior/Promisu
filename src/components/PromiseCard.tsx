'use client';

import { Promise, JournalEntry } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calculateProgress, getPromiseStreak, formatShortDate, isToday } from "@/lib/utils";
import { Calendar, MapPin, Clock, Target, Flame } from "lucide-react";

interface PromiseCardProps {
  promise: Promise;
  entries: JournalEntry[];
  onMarkComplete?: (promiseId: string, date: Date) => void;
  onViewDetails?: (promiseId: string) => void;
}

export function PromiseCard({ promise, entries, onMarkComplete, onViewDetails }: PromiseCardProps) {
  const progress = calculateProgress(promise, entries);
  const streak = getPromiseStreak(promise, entries);
  const today = new Date();
  const todayEntry = entries.find(entry => 
    entry.promiseId === promise.id && isToday(entry.date)
  );
  const isCompletedToday = todayEntry?.completed || false;
  const daysRemaining = Math.max(0, Math.ceil((promise.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const getStatusColor = () => {
    switch (promise.status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getProgressColor = () => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-gray-900 line-clamp-2">{promise.title}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {promise.status}
          </span>
        </div>
        {promise.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{promise.description}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Promise Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{daysRemaining} days left</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Flame className="w-4 h-4" />
            <span>{streak} day streak</span>
          </div>
          {promise.timeSpecific && promise.time && (
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{promise.time}</span>
            </div>
          )}
          {promise.placeSpecific && promise.place && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{promise.place}</span>
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{formatShortDate(promise.startDate)}</span>
          <span>→</span>
          <span>{formatShortDate(promise.endDate)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {promise.status === 'active' && !isCompletedToday && (
            <Button
              onClick={() => onMarkComplete?.(promise.id, today)}
              className="flex-1 bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Target className="w-4 h-4 mr-2" />
              Mark Complete Today
            </Button>
          )}
          {isCompletedToday && (
            <div className="flex-1 text-center py-2 text-green-600 font-medium text-sm">
              ✓ Completed Today
            </div>
          )}
          <Button
            onClick={() => onViewDetails?.(promise.id)}
            variant="secondary"
            size="sm"
            className="px-4"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 