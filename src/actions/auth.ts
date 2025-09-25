/** @format */

import {
  SignUpRequest,
  SignInRequest,
  AuthApiResponse,
  UserProfileResponse,
} from "@/types/api";
import { apiPost, apiGet, api } from "@/lib/api";
import axios from "axios";

export async function signUpUser(
  userData: SignUpRequest
): Promise<AuthApiResponse> {
  try {
    const response = await apiPost("/auth/signup", userData);

    // Store token if provided
    const authData = response.data as any;
    if (authData?.token && typeof window !== "undefined") {
      localStorage.setItem("auth_token", authData.token);
    }

    return response as AuthApiResponse;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

export async function signInUser(
  credentials: SignInRequest
): Promise<AuthApiResponse> {
  try {
    const response = await api.post("/auth/signin", credentials);
    console.log(response);

    // Token is set as HTTP-only cookie automatically by backend
    return response.data as AuthApiResponse;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

export async function getUserProfile(): Promise<UserProfileResponse> {
  try {
    const response = await apiGet("/auth/profile", true);
    return response as UserProfileResponse;
  } catch (error) {
    console.error("Get profile error:", error);
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }

    // Optionally call backend logout endpoint if it exists
    // await apiPost('/auth/logout', {}, true);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}
