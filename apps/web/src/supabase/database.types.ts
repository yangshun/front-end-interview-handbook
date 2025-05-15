export type Json =
  Array<Json> | boolean | number | string | { [key: string]: Json | undefined } | null

export type Database = {
  public: {
    CompositeTypes: Record<never, never>,
    Enums: {
      LearningSessionProgressStatus: "COMPLETED"
      LearningSessionStatus: "IN_PROGRESS" | "STOPPED"
      QuestionSubmissionResult: "CORRECT" | "WRONG"
      QuestionUserInterfaceFramework:
        "ANGULAR" | "REACT" | "SVELTE" | "VANILLA" | "VUE"
      QuestionWorkingLanguage: "JS" | "TS"
    },
    Functions: Record<never, never>
    Tables: {
      _prisma_migrations: {
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
      },
      EmailSubscriber: {
        Insert: {
          createdAt?: string | null
          email: string
          id?: string
        },
        Relationships: [],
        Row: {
          createdAt: string | null
          email: string
          id: string
        },
        Update: {
          createdAt?: string | null
          email?: string
          id?: string
        }
      },
      FeedbackMessage: {
        Insert: {
          comments?: string | null
          createdAt?: string | null
          email?: string | null
          id?: string
          message: string
          metadata?: Json | null
          owner?: string | null
          resolved?: boolean
          userEmail?: string | null
        },
        Relationships: [],
        Row: {
          comments: string | null
          createdAt: string | null
          email: string | null
          id: string
          message: string
          metadata: Json | null
          owner: string | null
          resolved: boolean
          userEmail: string | null
        },
        Update: {
          comments?: string | null
          createdAt?: string | null
          email?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          owner?: string | null
          resolved?: boolean
          userEmail?: string | null
        }
      },
      LearningSession: {
        Insert: {
          createdAt?: string
          id?: string
          key: string
          status?: Database["public"]["Enums"]["LearningSessionStatus"]
          stoppedAt?: string | null
          userId: string
        },
        Relationships: [
          {
            columns: ["userId"],
            foreignKeyName: "LearningSession_userId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "Profile"
          }
        ],
        Row: {
          createdAt: string
          id: string
          key: string
          status: Database["public"]["Enums"]["LearningSessionStatus"]
          stoppedAt: string | null
          userId: string
        },
        Update: {
          createdAt?: string
          id?: string
          key?: string
          status?: Database["public"]["Enums"]["LearningSessionStatus"]
          stoppedAt?: string | null
          userId?: string
        }
      },
      LearningSessionProgress: {
        Insert: {
          createdAt?: string
          id?: string
          key: string
          sessionId: string
          status: Database["public"]["Enums"]["LearningSessionProgressStatus"]
        },
        Relationships: [
          {
            columns: ["sessionId"],
            foreignKeyName: "LearningSessionProgress_sessionId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "LearningSession"
          }
        ],
        Row: {
          createdAt: string
          id: string
          key: string
          sessionId: string
          status: Database["public"]["Enums"]["LearningSessionProgressStatus"]
        },
        Update: {
          createdAt?: string
          id?: string
          key?: string
          sessionId?: string
          status?: Database["public"]["Enums"]["LearningSessionProgressStatus"]
        }
      },
      Profile: {
        Insert: {
          avatarUrl?: string | null
          createdAt?: string
          id: string
          name?: string | null
          plan?: string | null
          premium?: boolean
          stripeCustomer?: string | null
          username?: string | null
        },
        Relationships: [],
        Row: {
          avatarUrl: string | null
          createdAt: string
          id: string
          name: string | null
          plan: string | null
          premium: boolean
          stripeCustomer: string | null
          username: string | null
        },
        Update: {
          avatarUrl?: string | null
          createdAt?: string
          id?: string
          name?: string | null
          plan?: string | null
          premium?: boolean
          stripeCustomer?: string | null
          username?: string | null
        }
      },
      QuestionDiscussionPost: {
        Insert: {
          contents: string
          createdAt?: string
          format: string
          id?: string
          slug: string
          updatedAt: string
          userId: string
        },
        Relationships: [
          {
            columns: ["userId"],
            foreignKeyName: "QuestionDiscussionPost_userId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "Profile"
          }
        ],
        Row: {
          contents: string
          createdAt: string
          format: string
          id: string
          slug: string
          updatedAt: string
          userId: string
        },
        Update: {
          contents?: string
          createdAt?: string
          format?: string
          id?: string
          slug?: string
          updatedAt?: string
          userId?: string
        }
      },
      QuestionJavaScriptCommunitySolution: {
        Insert: {
          code: string
          createdAt?: string
          id?: string
          language: Database["public"]["Enums"]["QuestionWorkingLanguage"]
          slug: string
          title: string
          updatedAt: string
          userId: string
          writeup: string
        },
        Relationships: [
          {
            columns: ["userId"],
            foreignKeyName: "QuestionJavaScriptCommunitySolution_userId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "Profile"
          }
        ],
        Row: {
          code: string
          createdAt: string
          id: string
          language: Database["public"]["Enums"]["QuestionWorkingLanguage"]
          slug: string
          title: string
          updatedAt: string
          userId: string
          writeup: string
        },
        Update: {
          code?: string
          createdAt?: string
          id?: string
          language?: Database["public"]["Enums"]["QuestionWorkingLanguage"]
          slug?: string
          title?: string
          updatedAt?: string
          userId?: string
          writeup?: string
        }
      },
      QuestionJavaScriptSubmission: {
        Insert: {
          code: string
          createdAt?: string
          id?: string
          language: Database["public"]["Enums"]["QuestionWorkingLanguage"]
          result: Database["public"]["Enums"]["QuestionSubmissionResult"]
          slug: string
          userId: string
        },
        Relationships: [
          {
            columns: ["userId"],
            foreignKeyName: "QuestionJavaScriptSubmission_userId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "Profile"
          }
        ],
        Row: {
          code: string
          createdAt: string
          id: string
          language: Database["public"]["Enums"]["QuestionWorkingLanguage"]
          result: Database["public"]["Enums"]["QuestionSubmissionResult"]
          slug: string
          userId: string
        },
        Update: {
          code?: string
          createdAt?: string
          id?: string
          language?: Database["public"]["Enums"]["QuestionWorkingLanguage"]
          result?: Database["public"]["Enums"]["QuestionSubmissionResult"]
          slug?: string
          userId?: string
        }
      },
      QuestionProgress: {
        Insert: {
          createdAt?: string
          format: string
          id?: string
          slug: string
          status: string
          userId: string
        },
        Relationships: [
          {
            columns: ["userId"],
            foreignKeyName: "QuestionProgress_userId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "Profile"
          }
        ],
        Row: {
          createdAt: string
          format: string
          id: string
          slug: string
          status: string
          userId: string
        },
        Update: {
          createdAt?: string
          format?: string
          id?: string
          slug?: string
          status?: string
          userId?: string
        }
      }
      QuestionUserInterfaceCommunitySolution: {
        Insert: {
          createdAt?: string
          files: string
          framework: Database["public"]["Enums"]["QuestionUserInterfaceFramework"]
          id?: string
          slug: string
          title: string
          updatedAt: string
          userId: string
          writeup: string
        },
        Relationships: [
          {
            columns: ["userId"],
            foreignKeyName: "QuestionUserInterfaceCommunitySolution_userId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "Profile"
          }
        ],
        Row: {
          createdAt: string
          files: string
          framework: Database["public"]["Enums"]["QuestionUserInterfaceFramework"]
          id: string
          slug: string
          title: string
          updatedAt: string
          userId: string
          writeup: string
        },
        Update: {
          createdAt?: string
          files?: string
          framework?: Database["public"]["Enums"]["QuestionUserInterfaceFramework"]
          id?: string
          slug?: string
          title?: string
          updatedAt?: string
          userId?: string
          writeup?: string
        }
      }
      QuestionUserInterfaceSave: {
        Insert: {
          createdAt?: string
          files: string
          framework: Database["public"]["Enums"]["QuestionUserInterfaceFramework"]
          id?: string
          name: string
          slug: string
          updatedAt: string
          userId: string
        },
        Relationships: [
          {
            columns: ["userId"],
            foreignKeyName: "QuestionUserInterfaceSave_userId_fkey",
            isOneToOne: false
            referencedColumns: ["id"],
            referencedRelation: "Profile"
          }
        ],
        Row: {
          createdAt: string
          files: string
          framework: Database["public"]["Enums"]["QuestionUserInterfaceFramework"]
          id: string
          name: string
          slug: string
          updatedAt: string
          userId: string
        },
        Update: {
          createdAt?: string
          files?: string
          framework?: Database["public"]["Enums"]["QuestionUserInterfaceFramework"]
          id?: string
          name?: string
          slug?: string
          updatedAt?: string
          userId?: string
        }
      }
    },
    Views: Record<never, never>
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
