import JobBoard from "@/components/JobBoard";
import { pool } from "@/lib/db";
import { Job } from "@/types/job";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { rows } = await pool.query<Job>("SELECT id, company, role, status FROM jobs ORDER BY created_at DESC");

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Jobstronaut</h1>
      <JobBoard initialJobs={rows} />
    </main>
  );
}
