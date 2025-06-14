'use client';

import { useState } from "react";
import { Promise, JournalEntry } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, isToday } from "@/lib/utils";
import { CheckCircle2, Circle, MessageSquare, Calendar, Clock, MapPin } from "lucide-react";

interface DailyJournalProps {
  promises: Promise[];
  entries: JournalEntry[];
  onToggleComplete: (promiseId: string, completed: boolean, notes?: string) => void;
}

export function DailyJournal({ promises, entries, onToggleComplete }: DailyJournalProps) {
  const [expandedNotes, setExpandedNotes] = useState<string | null>(null);
  const [noteTexts, setNoteTexts] = useState<Record<string, string>>({});

  const today = new Date();
  const activePromises = promises.filter(p => p.status === 'active');
  
  const getTodayEntry = (promiseId: string) => {
    return entries.find(entry => entry.promiseId === promiseId && isToday(entry.date));
  };

  const handleToggleComplete = (promise: Promise) => {
    const todayEntry = getTodayEntry(promise.id);
    const newCompleted = !todayEntry?.completed;
    const notes = noteTexts[promise.id] || '';
    
    onToggleComplete(promise.id, newCompleted, notes);
    
    if (newCompleted && expandedNotes === promise.id) {
      setExpandedNotes(null);
    }
  };

  const updateNoteText = (promiseId: string, text: string) => {
    setNoteTexts(prev => ({ ...prev, [promiseId]: text }));
  };

  const toggleNotesExpanded = (promiseId: string) => {
    setExpandedNotes(expandedNotes === promiseId ? null : promiseId);
    
    // Initialize note text with existing entry if available
    if (expandedNotes !== promiseId) {
      const todayEntry = getTodayEntry(promiseId);
      if (todayEntry?.notes && !noteTexts[promiseId]) {
        updateNoteText(promiseId, todayEntry.notes);
      }
    }
  };

  if (activePromises.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Active Promises</h3>
          <p className="text-gray-500">Create your first promise to get started with your journey!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Today's Journal - {formatDate(today)}
        </CardTitle>
        <p className="text-sm text-gray-600">
          Track your daily progress and add notes about your experience
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activePromises.map((promise) => {
          const todayEntry = getTodayEntry(promise.id);
          const isCompleted = todayEntry?.completed || false;
          const isNotesExpanded = expandedNotes === promise.id;

          return (
            <div
              key={promise.id}
              className={`border rounded-lg p-4 transition-all ${
                isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
              }`}
            >
              {/* Promise Info */}
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleComplete(promise)}
                  className={`mt-1 transition-colors ${
                    isCompleted 
                      ? 'text-green-600 hover:text-green-700' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${isCompleted ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                    {promise.title}
                  </h3>
                  
                  {promise.description && (
                    <p className="text-sm text-gray-600 mt-1">{promise.description}</p>
                  )}
                  
                  {/* Promise Details */}
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                    {promise.timeSpecific && promise.time && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{promise.time}</span>
                      </div>
                    )}
                    {promise.placeSpecific && promise.place && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{promise.place}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={() => toggleNotesExpanded(promise.id)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>

              {/* Notes Section */}
              {isNotesExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add notes about today's experience:
                  </label>
                  <textarea
                    value={noteTexts[promise.id] || ''}
                    onChange={(e) => updateNoteText(promise.id, e.target.value)}
                    placeholder="How did it go? Any challenges or insights?"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      onClick={() => {
                        onToggleComplete(promise.id, isCompleted, noteTexts[promise.id] || '');
                        setExpandedNotes(null);
                      }}
                    >
                      Save Notes
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setExpandedNotes(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Show existing notes if not editing */}
              {!isNotesExpanded && todayEntry?.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic">"{todayEntry.notes}"</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Progress: {entries.filter(e => isToday(e.date) && e.completed).length} of {activePromises.length} promises completed today
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 