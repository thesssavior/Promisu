import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { Promise as PromiseType } from '@/types';
import { useAuth } from './useAuth';

export function usePromises() {
  const [promises, setPromises] = useState<PromiseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch all promises for the current user
  const fetchPromises = async () => {
    if (!user) {
      setPromises([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('promises')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedPromises: PromiseType[] = data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || undefined,
        duration: item.duration,
        startDate: new Date(item.start_date),
        endDate: new Date(item.end_date),
        timeSpecific: item.time_specific,
        time: item.time || undefined,
        placeSpecific: item.place_specific,
        place: item.place || undefined,
        category: item.category || undefined,
        status: item.status,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }));

      setPromises(mappedPromises);
    } catch (err) {
      console.error('Error fetching promises:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch promises');
    } finally {
      setLoading(false);
    }
  };

  // Create a new promise
  const createPromise = async (promise: Omit<PromiseType, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('promises')
        .insert([{
          user_id: user.id,
          title: promise.title,
          description: promise.description || null,
          duration: promise.duration,
          start_date: promise.startDate.toISOString(),
          end_date: promise.endDate.toISOString(),
          time_specific: promise.timeSpecific,
          time: promise.time || null,
          place_specific: promise.placeSpecific,
          place: promise.place || null,
          category: promise.category || null,
          status: promise.status
        }])
        .select()
        .single();

      if (error) throw error;

      const newPromise: PromiseType = {
        id: data.id,
        title: data.title,
        description: data.description || undefined,
        duration: data.duration,
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
        timeSpecific: data.time_specific,
        time: data.time || undefined,
        placeSpecific: data.place_specific,
        place: data.place || undefined,
        category: data.category || undefined,
        status: data.status,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      };

      setPromises(prev => [newPromise, ...prev]);
      return newPromise;
    } catch (err) {
      console.error('Error creating promise:', err);
      throw err;
    }
  };

  // Update promise status
  const updatePromiseStatus = async (promiseId: string, status: PromiseType['status']) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { error } = await supabase
        .from('promises')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', promiseId)
        .eq('user_id', user.id);

      if (error) throw error;

      setPromises(prev => prev.map(p => 
        p.id === promiseId 
          ? { ...p, status, updatedAt: new Date() }
          : p
      ));
    } catch (err) {
      console.error('Error updating promise status:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPromises();
  }, [user]);

  return {
    promises,
    loading,
    error,
    createPromise,
    updatePromiseStatus,
    refetch: fetchPromises
  };
} 