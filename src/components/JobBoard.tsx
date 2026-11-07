"use client";

import { useState } from "react";
import { Job } from "@/types/job";
import { sampleJobs } from "@/data/sample-jobs";
import Board from "@/components/Board";

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);

  return <Board jobs={jobs} />;
}
