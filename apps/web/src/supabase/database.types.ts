export type Json =
  Array<Json> | boolean | number | string | { [key: string]: Json } | null;

export type Database = {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      EmailSubscriber: {
        Insert: {
          createdAt?: string | null;
          email: string;
          id?: string;
        };
        Row: {
          createdAt: string | null;
          email: string;
          id: string;
        };
        Update: {
          createdAt?: string | null;
          email?: string;
          id?: string;
        };
      };
      Event: {
        Insert: {
          action: string;
          country?: string | null;
          createdAt?: string | null;
          fingerprint?: string | null;
          id?: number;
          payload?: Json | null;
          referer?: string | null;
          userId: string;
        };
        Row: {
          action: string;
          country: string | null;
          createdAt: string | null;
          fingerprint: string | null;
          id: number;
          payload: Json | null;
          referer: string | null;
          userId: string;
        };
        Update: {
          action?: string;
          country?: string | null;
          createdAt?: string | null;
          fingerprint?: string | null;
          id?: number;
          payload?: Json | null;
          referer?: string | null;
          userId?: string;
        };
      };
      FeedbackMessage: {
        Insert: {
          comments?: string | null;
          createdAt?: string | null;
          email?: string | null;
          id?: string;
          message: string;
          metadata?: Json | null;
          owner?: string | null;
          resolved?: boolean;
          userEmail?: string | null;
        };
        Row: {
          comments: string | null;
          createdAt: string | null;
          email: string | null;
          id: string;
          message: string;
          metadata: Json | null;
          owner: string | null;
          resolved: boolean;
          userEmail: string | null;
        };
        Update: {
          comments?: string | null;
          createdAt?: string | null;
          email?: string | null;
          id?: string;
          message?: string;
          metadata?: Json | null;
          owner?: string | null;
          resolved?: boolean;
          userEmail?: string | null;
        };
      };
      Profile: {
        Insert: {
          createdAt?: string;
          id: string;
          plan?: string | null;
          premium?: boolean;
          stripeCustomer?: string | null;
        };
        Row: {
          createdAt: string;
          id: string;
          plan: string | null;
          premium: boolean;
          stripeCustomer: string | null;
        };
        Update: {
          createdAt?: string;
          id?: string;
          plan?: string | null;
          premium?: boolean;
          stripeCustomer?: string | null;
        };
      };
      QuestionProgress: {
        Insert: {
          createdAt?: string;
          format: string;
          id?: string;
          slug: string;
          status: string;
          userId: string;
        };
        Row: {
          createdAt: string;
          format: string;
          id: string;
          slug: string;
          status: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          format?: string;
          id?: string;
          slug?: string;
          status?: string;
          userId?: string;
        };
      };
      SitePerformance: {
        Insert: {
          country?: string | null;
          createdAt?: string | null;
          duration?: number | null;
          event?: string | null;
          id?: string;
          referrer?: string | null;
          url?: string | null;
          userEmail?: string | null;
        };
        Row: {
          country: string | null;
          createdAt: string | null;
          duration: number | null;
          event: string | null;
          id: string;
          referrer: string | null;
          url: string | null;
          userEmail: string | null;
        };
        Update: {
          country?: string | null;
          createdAt?: string | null;
          duration?: number | null;
          event?: string | null;
          id?: string;
          referrer?: string | null;
          url?: string | null;
          userEmail?: string | null;
        };
      };
      _prisma_migrations: {
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}
