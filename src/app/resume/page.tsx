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
    <main className="mx-auto min-w-250 p-8">
      <Link
        href="/"
        className="text-sm text-blue-500 hover:bg-gray-200 px-4 py-2 rounded-lg"
      >
        ⮜ Back to board
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        Your resume <span className="text-gray-500 font-light text-2xl">(text only)</span>
      </h1>
      <ResumeForm initialContent={resume} />
    </main>
  );
}
