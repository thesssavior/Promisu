export interface Promise {
  id: string;
  title: string;
  description?: string;
  duration: number; // in days
  startDate: Date;
  endDate: Date;
  timeSpecific: boolean;
  time?: string; // HH:MM format if timeSpecific is true
  placeSpecific: boolean;
  place?: string;
  category?: string;
  status: 'active' | 'completed' | 'failed' | 'paused';
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  id: string;
  promiseId: string;
  date: Date;
  completed: boolean;
  notes?: string;
  mood?: 1 | 2 | 3 | 4 | 5; // 1 = very bad, 5 = excellent
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyJournal {
  id: string;
  date: Date;
  entries: JournalEntry[];
  generalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromiseTemplate {
  id: string;
  title: string;
  description?: string;
  suggestedDuration: number;
  category: string;
  timeSpecific: boolean;
  placeSpecific: boolean;
}

export interface UserSettings {
  notificationsEnabled: boolean;
  defaultReminderTime: string;
  timezone: string;
  weekStartDay: 0 | 1; // 0 = Sunday, 1 = Monday
} 