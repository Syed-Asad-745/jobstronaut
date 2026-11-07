import { Job, JobStatus } from "@/types/job";

const statuses: JobStatus[] = ["wishlist", "applied", "interview", "offer", "rejected"];

export default function JobCard({ job, onStatusChange }: { job: Job; onStatusChange: (id: string, status: JobStatus) => void }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{job.role}</h3>
      <p className="text-sm text-gray-500">{job.company}</p>
      <select
        value={job.status}
        onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
        className="mt-3 rounded border px-2 py-1 text-sm"
      >
        {statuses.map((s) => (
          <option
            key={s}
            value={s}
          >
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
