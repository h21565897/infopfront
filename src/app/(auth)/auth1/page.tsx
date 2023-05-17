"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

function Signinpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <label>username</label>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="text"
        name="username"
        id="username"
      />
      <label>password</label>
      <input
        type="text"
        name="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          signIn("credentials", {
            username,
            password,
            redirect: true,
            callbackUrl: "/",
          });
        }}
      >
        submit
      </button>
    </div>
  );
}

export default Signinpage;
