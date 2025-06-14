import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { JournalEntry } from '@/types';
import { useAuth } from './useAuth';

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch all journal entries for the current user
  const fetchEntries = async () => {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      const mappedEntries: JournalEntry[] = data.map(item => ({
        id: item.id,
        promiseId: item.promise_id,
        date: new Date(item.date),
        completed: item.completed,
        notes: item.notes || undefined,
        mood: item.mood as (1 | 2 | 3 | 4 | 5) || undefined,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }));

      setEntries(mappedEntries);
    } catch (err) {
      console.error('Error fetching journal entries:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch journal entries');
    } finally {
      setLoading(false);
    }
  };

  // Toggle completion status for a promise on a specific date
  const toggleCompletion = async (promiseId: string, completed: boolean, notes?: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Check if an entry already exists for today
      const existingEntry = entries.find(
        entry => entry.promiseId === promiseId && 
        entry.date.toISOString().split('T')[0] === dateStr
      );

      if (existingEntry) {
        // Update existing entry
        const { error } = await supabase
          .from('journal_entries')
          .update({
            completed,
            notes: notes || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingEntry.id)
          .eq('user_id', user.id);

        if (error) throw error;

        setEntries(prev => prev.map(entry =>
          entry.id === existingEntry.id
            ? { ...entry, completed, notes, updatedAt: new Date() }
            : entry
        ));
      } else {
        // Create new entry
        const { data, error } = await supabase
          .from('journal_entries')
          .insert([{
            user_id: user.id,
            promise_id: promiseId,
            date: dateStr,
            completed,
            notes: notes || null
          }])
          .select()
          .single();

        if (error) throw error;

        const newEntry: JournalEntry = {
          id: data.id,
          promiseId: data.promise_id,
          date: new Date(data.date),
          completed: data.completed,
          notes: data.notes || undefined,
          mood: data.mood as (1 | 2 | 3 | 4 | 5) || undefined,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        };

        setEntries(prev => [newEntry, ...prev]);
      }
    } catch (err) {
      console.error('Error toggling completion:', err);
      throw err;
    }
  };

  // Add or update mood for an entry
  const updateMood = async (entryId: string, mood: 1 | 2 | 3 | 4 | 5) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({
          mood,
          updated_at: new Date().toISOString()
        })
        .eq('id', entryId)
        .eq('user_id', user.id);

      if (error) throw error;

      setEntries(prev => prev.map(entry =>
        entry.id === entryId
          ? { ...entry, mood, updatedAt: new Date() }
          : entry
      ));
    } catch (err) {
      console.error('Error updating mood:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    entries,
    loading,
    error,
    toggleCompletion,
    updateMood,
    refetch: fetchEntries
  };
} 