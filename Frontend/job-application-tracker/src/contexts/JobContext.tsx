import { createContext, useContext } from "react";
import type { Job } from "../types/job";

export const JobsContext = createContext<{
    jobs: Job[];
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
} | null>(null);

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used inside JobsProvider");
  return context;
};