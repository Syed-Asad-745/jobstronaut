import JobBoard from "@/components/JobBoard";
import { auth, signIn, signOut } from "@/auth";
import { pool } from "@/lib/db";
import { Job } from "@/types/job";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="p-8">
        <h1 className="mb-6 text-3xl font-bold">Jobstronaut</h1>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Sign in with GitHub
          </button>
        </form>
      </main>
    );
  }

  const { rows } = await pool.query<Job>(
    `SELECT id, company, role, status,
            job_description AS "jobDescription",
            match_score AS "matchScore",
            analysis
     FROM jobs
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [session.user.id],
  );

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Jobstronaut</h1>
        <div className="flex items-center gap-4">
          <Link
            href="/resume"
            className="text-sm underline"
          >
            Resume
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <span className="mr-3 text-sm text-gray-500">{session.user.name}</span>
            <button
              type="submit"
              className="rounded border px-3 py-1 text-sm"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <JobBoard initialJobs={rows} />
    </main>
  );
}
