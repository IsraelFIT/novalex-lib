"use client";

import Button from "@/components/base/button";
import Checkbox from "@/components/base/checkbox";
import Input from "@/components/base/inputs";
import "@/styles/home.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate the user using the authStore
      useAuthStore.getState().login(email, password);

      // Redirect to dashboard after login
      router.push("/library");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome to NovaLex</h1>
            <h6>Please login to borrow a book</h6>
          </div>

          <div className="auth-body">
            {/* Email Input */}
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              description="Please enter your email"
            />

            {/* Password Input */}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              description="Please enter your password"
            />

            <div className="pre-login">
              {/* Remember Me Checkbox */}
              <Checkbox
                id="remember-me"
                label="Remember Me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mb-4"
              />
              <p>
                <Link href="/auth/register">Sign up</Link> to get your account.
              </p>
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="success-message">
              <p>{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {/* Login Button */}
          <Button
            text={loading ? "Loading..." : "Login"}
            onClick={handleLogin}
            loading={loading}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
