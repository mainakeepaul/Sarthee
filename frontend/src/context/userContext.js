// import { createContext } from "react"

// const UserContext=createContext()

// export default UserContext

// src/context/userContext.js
"use client";
import { createContext } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export default UserContext;
