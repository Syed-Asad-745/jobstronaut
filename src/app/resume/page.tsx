import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getResume } from "@/app/actions";
import ResumeForm from "@/components/ResumeForm";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const resume = await getResume();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link
        href="/"
        className="text-sm text-gray-500"
      >
        ← Back to board
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">Your resume</h1>
      <ResumeForm initialContent={resume} />
    </main>
  );
}
