/** @format */

import {
  SignUpRequest,
  SignInRequest,
  AuthApiResponse,
  UserProfileResponse,
} from "@/types/api";
import { api } from "@/lib/api";
import axios from "axios";

export async function signUpUser(
  userData: SignUpRequest
): Promise<AuthApiResponse> {
  try {
    const response = await api.post("/auth/signup", userData);

    // Store token if provided
    const authData = response.data as any;
    if (authData?.token && typeof window !== "undefined") {
      localStorage.setItem("auth_token", authData.token);
    }

    return response.data as AuthApiResponse;
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
    const response = await api.get("/auth/profile");
    return response.data as UserProfileResponse;
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
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}
