import JobBoard from "@/components/JobBoard";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Jobstronaut</h1>
      <JobBoard />
    </main>
  );
}
