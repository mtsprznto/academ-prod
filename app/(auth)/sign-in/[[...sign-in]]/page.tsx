"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

export default function SignInPage() {
  const { isSignedIn, user } = useUser();
  useEffect(() => {
    try {
      if (isSignedIn !== false) {
        axios
          .post("/api/auth/register", {
            userId: user?.id,
          })
          .then((response) => {
            console.log("Respuesta de la API:", response.data);
          })
          .catch((error) => {
            console.error("Error al registrar usuario:", error);
          });
      }
    } catch (error) {
      console.log("ERROR AXIOS", error);
    }
  }, [isSignedIn, user]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-semibold text-4xl">Welcome back! 👋</h1>
      <p className="text-xl">Sign in to continue to your account</p>
      <SignIn />
    </div>
  );
}
