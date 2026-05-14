import bcrypt from "bcryptjs";
import { supabase } from "../../../lib/supabase";

const SALT_ROUNDS = 10;
const SESSION_KEY = "hukum-taharah-user";

export interface AuthUser {
  id: string;
  username: string;
  role: string;
}

export function getSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setSession(user: AuthUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export async function registerUser(username: string, password: string): Promise<AuthUser> {
  const trimmed = username.trim().toLowerCase();

  if (trimmed.length < 3) throw new Error("Username minimal 3 karakter");
  if (password.length < 6) throw new Error("Password minimal 6 karakter");

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("username", trimmed)
    .maybeSingle();

  if (existing) throw new Error("Username sudah digunakan");

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  const { data, error } = await supabase
    .from("users")
    .insert({ username: trimmed, password_hash, role: "teacher" })
    .select("id, username, role")
    .single();

  if (error) throw new Error("Gagal mendaftar: " + error.message);

  const user: AuthUser = { id: data.id, username: data.username, role: data.role };
  setSession(user);
  return user;
}

export async function loginUser(username: string, password: string): Promise<AuthUser> {
  const trimmed = username.trim().toLowerCase();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, username, password_hash, role")
    .eq("username", trimmed)
    .maybeSingle();

  if (error || !user) throw new Error("Username atau password salah");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Username atau password salah");

  const authUser: AuthUser = { id: user.id, username: user.username, role: user.role };
  setSession(authUser);
  return authUser;
}

export function logoutUser() {
  clearSession();
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
