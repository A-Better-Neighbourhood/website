/** @format */

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signUpUser,
  signInUser,
  getUserProfile,
  signOutUser,
} from "@/actions/auth";
import { SignUpRequest, SignInRequest, User } from "@/types/api";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};

// Hooks
export function useUserProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const response = await getUserProfile();
      return response.data;
    },
    retry: (failureCount, error: any) => {
      // Don't retry on auth errors
      if (error?.status === 401) return false;
      return failureCount < 2;
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: SignUpRequest) => signUpUser(userData),
    onSuccess: (data) => {
      // Set user data in cache after successful signup
      if (data.data) {
        queryClient.setQueryData(authKeys.profile(), data.data);
      }
    },
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInRequest) => signInUser(credentials),
    onSuccess: (data) => {
      // Set user data in cache after successful signin
      if (data.data) {
        queryClient.setQueryData(authKeys.profile(), data.data);
      }
      // Invalidate and refetch profile to get complete user data
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
    },
  });
}

// Auth state hook
export function useAuth() {
  const { data: user, isLoading, error } = useUserProfile();

  return {
    user: user as User | undefined,
    isLoading,
    isAuthenticated: !!user && !error,
    error,
  };
}
