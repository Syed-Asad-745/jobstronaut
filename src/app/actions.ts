"use server";

import { pool } from "@/lib/db";
import { Job } from "@/types/job";

export async function addJob(company: string, role: string): Promise<Job> {
  const { rows } = await pool.query<Job>("INSERT INTO jobs (company, role) VALUES ($1, $2) RETURNING id, company, role, status", [company.trim(), role.trim()]);
  return rows[0];
}
