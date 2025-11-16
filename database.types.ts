export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      albums: {
        Row: {
          artist: string
          cover_url: string | null
          created_at: string | null
          external_id: string
          genres: Json | null
          id: number
          last_unverified_rated_at: string | null
          last_verified_rated_at: string | null
          media_links: Json | null
          score: string | null
          search_text: string | null
          title: string
          unverified_rating: number | null
          unverified_rating_count: number | null
          updated_at: string | null
          verified_rating: number | null
          verified_rating_count: number | null
          video_date: string | null
          vref: string | null
          year: number | null
        }
        Insert: {
          artist: string
          cover_url?: string | null
          created_at?: string | null
          external_id: string
          genres?: Json | null
          id?: number
          last_unverified_rated_at?: string | null
          last_verified_rated_at?: string | null
          media_links?: Json | null
          score?: string | null
          search_text?: string | null
          title: string
          unverified_rating?: number | null
          unverified_rating_count?: number | null
          updated_at?: string | null
          verified_rating?: number | null
          verified_rating_count?: number | null
          video_date?: string | null
          vref?: string | null
          year?: number | null
        }
        Update: {
          artist?: string
          cover_url?: string | null
          created_at?: string | null
          external_id?: string
          genres?: Json | null
          id?: number
          last_unverified_rated_at?: string | null
          last_verified_rated_at?: string | null
          media_links?: Json | null
          score?: string | null
          search_text?: string | null
          title?: string
          unverified_rating?: number | null
          unverified_rating_count?: number | null
          updated_at?: string | null
          verified_rating?: number | null
          verified_rating_count?: number | null
          video_date?: string | null
          vref?: string | null
          year?: number | null
        }
        Relationships: []
      }
      credit_usage: {
        Row: {
          created_at: string | null
          credits_used: number | null
          id: string
          subscription_id: string | null
          usage_window_end: string
          usage_window_start: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          subscription_id?: string | null
          usage_window_end: string
          usage_window_start: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_used?: number | null
          id?: string
          subscription_id?: string | null
          usage_window_end?: string
          usage_window_start?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "credit_usage_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      credit_usage_log: {
        Row: {
          created_at: string | null
          credits_used: number
          feature_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          credits_used: number
          feature_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          credits_used?: number
          feature_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_usage_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          album_id: number | null
          created_at: string | null
          guest_identifier: string | null
          id: number
          is_verified: boolean
          rating: number | null
          review_text: string | null
          updated_at: string | null
          user_id: string | null
          video_url: string | null
        }
        Insert: {
          album_id?: number | null
          created_at?: string | null
          guest_identifier?: string | null
          id?: number
          is_verified?: boolean
          rating?: number | null
          review_text?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Update: {
          album_id?: number | null
          created_at?: string | null
          guest_identifier?: string | null
          id?: number
          is_verified?: boolean
          rating?: number | null
          review_text?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          billing_cycle: string
          cancel_at_period_end: boolean | null
          created_at: string | null
          end_date: string
          id: string
          is_active: boolean | null
          start_date: string
          stripe_subscription_id: string | null
          tier: string
          user_id: string | null
        }
        Insert: {
          billing_cycle: string
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          start_date: string
          stripe_subscription_id?: string | null
          tier: string
          user_id?: string | null
        }
        Update: {
          billing_cycle?: string
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          start_date?: string
          stripe_subscription_id?: string | null
          tier?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          additional_context: string | null
          clerk_user_id: string
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          modified_at: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          additional_context?: string | null
          clerk_user_id: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          modified_at?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          additional_context?: string | null
          clerk_user_id?: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          modified_at?: string | null
          stripe_subscription_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
