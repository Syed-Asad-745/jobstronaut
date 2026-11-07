import { Job } from "@/types/job";

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{job.role}</h3>
      <p className="text-sm text-gray-500">{job.company}</p>
    </div>
  );
}
