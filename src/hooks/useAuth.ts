import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "analyst";

export interface AuthState {
  session: Session | null;
  user: User | null;
  roles: AppRole[];
  loading: boolean;
}

/**
 * Client-side auth hook. Subscribes to Supabase auth state changes and
 * fetches the current user's roles from `public.user_roles`.
 *
 * The `_authenticated` route gate is the source of truth for access
 * control (server-validated). This hook is for UI affordances only:
 * showing the display name, gating admin-only nav items, etc.
 */
export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Subscribe first, then hydrate — avoids missing an event during init.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (cancelled) return;
      setSession(next);
      if (!next) {
        setRoles([]);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    let cancelled = false;

    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Failed to load roles", error);
          setRoles([]);
          return;
        }
        setRoles((data ?? []).map((r) => r.role as AppRole));
      });

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  return {
    session,
    user: session?.user ?? null,
    roles,
    loading,
  };
}
