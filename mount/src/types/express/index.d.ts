import { User } from "@supabase/supabase-js";
import express, { Request } from "express";

declare module 'express' {
  interface Request {
    user?: User,
    files?: File
  }
}