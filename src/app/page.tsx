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
      <main className="flex justify-center py-36 h-screen">
        <div className="bg-[#162938]/60 px-24 py-12 h-fit w-fit rounded-xl backdrop-blur-xs shadow-[0px_0px_12px_4px_#162938]">
          <h1 className="mb-10 text-3xl font-bold text-white">Jobstronaut</h1>
          <div className="flex flex-col gap-4">
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-[#11862f] cursor-pointer hover:shadow-[0px_0px_12px_#266e3c] px-6 py-3 text-white font-extralight"
              >
                Sign in with <span className="font-extrabold">GitHub</span>
              </button>
            </form>

            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="w-full rounded-lg bg-white cursor-pointer hover:shadow-[0px_0px_12px_#266e3c] px-6 py-3 text-black font-extralight"
              >
                Sign in with <span className="font-extrabold">Google</span>
              </button>
            </form>
          </div>
        </div>
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
          src={"/CompressedFullLogo.webp"}
          alt={"Jobstronaut Logo"}
          width={999}
          height={999}
          loading="eager"
          className="rounded-xl h-56 w-fit backdrop-blur-xs shadow-[0px_0px_32px_#162938]"
        />

        <div className="absolute right-0 flex items-center gap-4 self-start">
          <Link
            href="/resume"
            className="text-sm bg-white/60 px-6 py-2.5 text-[#162938] font-extralight rounded-md backdrop-blur-[2px] hover:shadow-[0px_0px_12px_white] hover:bg-white transition fixed top-8 left-8"
          >
            Resume
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <span className="mr-3 text-sm text-white">{session.user.name}</span>
            <button
              type="submit"
              className="rounded cursor-pointer bg-blue-600/60 text-white font-extralight px-6 py-2.5 text-sm hover:bg-blue-600 hover:shadow-[0px_0px_12px_#155dfc] transition"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
      <JobBoard initialJobs={rows} />{" "}
    </main>
  );
}
