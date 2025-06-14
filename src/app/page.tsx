'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePromises } from '@/hooks/usePromises';
import { useJournalEntries } from '@/hooks/useJournalEntries';
import { AuthForm } from '@/components/AuthForm';
import { DailyJournal } from '@/components/DailyJournal';
import { NewPromiseForm } from '@/components/NewPromiseForm';
import { PromiseCard } from '@/components/PromiseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LogOut, Calendar, Target, User } from 'lucide-react';

export default function Home() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { promises, loading: promisesLoading, createPromise } = usePromises();
  const { entries, toggleCompletion } = useJournalEntries();
  const [showNewPromiseForm, setShowNewPromiseForm] = useState(false);

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth form if not logged in
  if (!user) {
    return <AuthForm />;
  }

  // Handle creating a new promise
  const handleCreatePromise = async (promise: any) => {
    try {
      await createPromise(promise);
      setShowNewPromiseForm(false);
    } catch (error) {
      console.error('Failed to create promise:', error);
    }
  };

  // Handle toggling promise completion
  const handleToggleComplete = async (promiseId: string, completed: boolean, notes?: string) => {
    try {
      await toggleCompletion(promiseId, completed, notes);
    } catch (error) {
      console.error('Failed to toggle completion:', error);
    }
  };

  // Show new promise form
  if (showNewPromiseForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <NewPromiseForm
            onSave={handleCreatePromise}
            onCancel={() => setShowNewPromiseForm(false)}
          />
        </div>
      </div>
    );
  }

  const activePromises = promises.filter(p => p.status === 'active');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Promisu</h1>
                <p className="text-sm text-gray-600">Your promise journey</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <Button onClick={signOut} variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Daily Journal */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Journal
              </h2>
            </div>
            
            <DailyJournal
              promises={promises}
              entries={entries}
              onToggleComplete={handleToggleComplete}
            />
          </div>

          {/* Right Column - Promises */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Your Promises
              </h2>
              <Button 
                onClick={() => setShowNewPromiseForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Promise
              </Button>
            </div>

            {promisesLoading ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading promises...</p>
                </CardContent>
              </Card>
            ) : promises.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No Promises Yet</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first promise to start your journey!
                  </p>
                  <Button onClick={() => setShowNewPromiseForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Promise
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                                 {promises.map((promise) => (
                   <PromiseCard 
                     key={promise.id} 
                     promise={promise}
                     entries={entries.filter(e => e.promiseId === promise.id)}
                   />
                 ))}
              </div>
            )}

            {/* Quick Stats */}
            {activePromises.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {activePromises.length}
                      </div>
                      <div className="text-sm text-gray-600">Active Promises</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {entries.filter(e => {
                          const today = new Date().toISOString().split('T')[0];
                          return e.date.toISOString().split('T')[0] === today && e.completed;
                        }).length}
                      </div>
                      <div className="text-sm text-gray-600">Completed Today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
