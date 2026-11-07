export type JobStatus = "wishlist" | "applied" | "interview" | "offer" | "rejected";

export type Analysis = {
  missingSkills: string[];
  suggestions: string[];
};

export type Job = {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  jobDescription: string | null;
  matchScore: number | null;
  analysis: Analysis | null;
};
