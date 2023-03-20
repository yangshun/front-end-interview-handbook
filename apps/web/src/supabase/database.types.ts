export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      EmailSubscriber: {
        Row: {
          createdAt: string | null;
          email: string;
          id: string;
        };
        Insert: {
          createdAt?: string | null;
          email: string;
          id?: string;
        };
        Update: {
          createdAt?: string | null;
          email?: string;
          id?: string;
        };
      };
      Event: {
        Row: {
          action: string;
          country: string | null;
          createdAt: string | null;
          id: number;
          payload: Json | null;
          referer: string | null;
          userId: string;
        };
        Insert: {
          action: string;
          country?: string | null;
          createdAt?: string | null;
          id?: number;
          payload?: Json | null;
          referer?: string | null;
          userId: string;
        };
        Update: {
          action?: string;
          country?: string | null;
          createdAt?: string | null;
          id?: number;
          payload?: Json | null;
          referer?: string | null;
          userId?: string;
        };
      };
      FeedbackMessage: {
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
        Row: {
          createdAt: string;
          id: string;
          plan: string | null;
          premium: boolean;
          stripeCustomer: string | null;
        };
        Insert: {
          createdAt?: string;
          id: string;
          plan?: string | null;
          premium?: boolean;
          stripeCustomer?: string | null;
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
        Row: {
          createdAt: string;
          format: string;
          id: string;
          slug: string;
          status: string;
          user_id: string | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          format: string;
          id?: string;
          slug: string;
          status: string;
          user_id?: string | null;
          userId: string;
        };
        Update: {
          createdAt?: string;
          format?: string;
          id?: string;
          slug?: string;
          status?: string;
          user_id?: string | null;
          userId?: string;
        };
      };
      SitePerformance: {
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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
