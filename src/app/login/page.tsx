"use client";
import { signIn } from "next-auth/react";
import React from "react";

function Page() {
  return (
    <div>
      <button
        onClick={() => {
          signIn();
        }}
      >
        signin
      </button>
    </div>
  );
}

export default Page;
