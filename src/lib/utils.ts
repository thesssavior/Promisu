import { type ClassValue, clsx } from "clsx";
import { Promise, JournalEntry, DailyJournal } from "@/types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date utilities
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export function isToday(date: Date): boolean {
  const today = new Date();
  const targetDate = new Date(date);
  return (
    targetDate.getFullYear() === today.getFullYear() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getDate() === today.getDate()
  );
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDaysDifference(startDate: Date, endDate: Date): number {
  const timeDifference = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
}

// Local storage utilities
export function saveToLocalStorage<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
}

// Promise utilities
export function calculateProgress(promise: Promise, entries: JournalEntry[]): number {
  if (promise.status === 'completed') return 100;
  if (promise.status === 'failed') return 0;
  
  const promiseEntries = entries.filter(entry => entry.promiseId === promise.id);
  const completedEntries = promiseEntries.filter(entry => entry.completed);
  
  // Calculate progress based on promise duration, not just entries made
  const totalDays = promise.duration;
  const completedDays = completedEntries.length;
  
  return totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
}

export function getPromiseStreak(promise: Promise, entries: JournalEntry[]): number {
  const promiseEntries = entries
    .filter(entry => entry.promiseId === promise.id)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  let streak = 0;
  for (const entry of promiseEntries) {
    if (entry.completed) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
} 