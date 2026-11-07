"use server";

import { pool } from "@/lib/db";
import { Job, JobStatus } from "@/types/job";

export async function addJob(company: string, role: string): Promise<Job> {
  const { rows } = await pool.query<Job>("INSERT INTO jobs (company, role) VALUES ($1, $2) RETURNING id, company, role, status", [company.trim(), role.trim()]);
  return rows[0];
}

export async function updateJobStatus(id: string, status: JobStatus): Promise<void> {
  await pool.query("UPDATE jobs SET status = $1 WHERE id = $2", [status, id]);
}

export async function deleteJob(id: string): Promise<void> {
  await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
}
