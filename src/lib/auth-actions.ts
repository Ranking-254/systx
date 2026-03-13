import { supabase } from "@/lib/superbase";

export const handleSignUp = async (email: string, password: string, displayName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        access_level: 'PLATINUM', // Default level for SYSTX
      },
    },
  });
  if (error) throw error;
  return data;
};

export const handleSignIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};