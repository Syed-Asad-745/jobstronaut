"use server";

import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { Job, JobStatus } from "@/types/job";

async function requireUserId(): Promise<string> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Not signed in");
  return userId;
}

export async function addJob(company: string, role: string): Promise<Job> {
  const userId = await requireUserId();
  const { rows } = await pool.query<Job>("INSERT INTO jobs (company, role, user_id) VALUES ($1, $2, $3) RETURNING id, company, role, status", [company.trim(), role.trim(), userId]);
  return rows[0];
}

export async function updateJobStatus(id: string, status: JobStatus): Promise<void> {
  const userId = await requireUserId();
  await pool.query("UPDATE jobs SET status = $1 WHERE id = $2 AND user_id = $3", [status, id, userId]);
}

export async function deleteJob(id: string): Promise<void> {
  const userId = await requireUserId();
  await pool.query("DELETE FROM jobs WHERE id = $1 AND user_id = $2", [id, userId]);
}

export async function getResume(): Promise<string> {
  const userId = await requireUserId();
  const { rows } = await pool.query<{ content: string }>("SELECT content FROM resumes WHERE user_id = $1", [userId]);
  return rows[0]?.content ?? "";
}

export async function saveResume(content: string): Promise<void> {
  const userId = await requireUserId();
  await pool.query(
    `INSERT INTO resumes (user_id, content) VALUES ($1, $2)
     ON CONFLICT (user_id) DO UPDATE SET content = $2, updated_at = now()`,
    [userId, content.trim()],
  );
}
