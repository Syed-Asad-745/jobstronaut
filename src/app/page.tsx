import JobBoard from "@/components/JobBoard";
import { auth, signIn, signOut } from "@/auth";
import { pool } from "@/lib/db";
import { Job } from "@/types/job";
import Link from "next/link";
import Image from "next/image";

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
    <main className="relative p-8">
      <div className="relative mb-6 flex justify-center">
        <Image
          src={"/LongLogo.png"}
          alt={"Jobstronaut Logo"}
          width={999}
          height={999}
          loading="eager"
          className="rounded-xl h-56 w-fit"
        />

        <div className="absolute right-0 flex items-center gap-4 self-start">
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
      <span className="text-gray-600 absolute right-10 mt-1">version: 1.0.0</span>
    </main>
  );
}
