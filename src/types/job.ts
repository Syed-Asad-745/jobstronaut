export type JobStatus = "wishlist" | "applied" | "interview" | "offer" | "rejected";

export type Job = {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
};
