import { createBrowserClient } from '@supabase/ssr';

// These should be set in your .env.local
const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client for authentication and real-time subscriptions
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Database types for better TypeScript support
export interface Database {
  public: {
    Tables: {
      promises: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          duration: number;
          start_date: string;
          end_date: string;
          time_specific: boolean;
          time: string | null;
          place_specific: boolean;
          place: string | null;
          category: string | null;
          status: 'active' | 'completed' | 'failed' | 'paused';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          duration: number;
          start_date: string;
          end_date: string;
          time_specific?: boolean;
          time?: string | null;
          place_specific?: boolean;
          place?: string | null;
          category?: string | null;
          status?: 'active' | 'completed' | 'failed' | 'paused';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          duration?: number;
          start_date?: string;
          end_date?: string;
          time_specific?: boolean;
          time?: string | null;
          place_specific?: boolean;
          place?: string | null;
          category?: string | null;
          status?: 'active' | 'completed' | 'failed' | 'paused';
          created_at?: string;
          updated_at?: string;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          promise_id: string;
          date: string;
          completed: boolean;
          notes: string | null;
          mood: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          promise_id: string;
          date: string;
          completed?: boolean;
          notes?: string | null;
          mood?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          promise_id?: string;
          date?: string;
          completed?: boolean;
          notes?: string | null;
          mood?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
} 