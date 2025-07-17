export type Job = {
    id: string;
    applicationDate?: Date;
    company?: string;
    position?: string;
    location?: string;
    workMode?: 'REMOTE' | 'INPERSON' | 'HYBRID';
    status?: 'APPLIED' | 'PHONESCREEN' | 'INTERVIEW' | 'TAKEHOMEASSESSMENT' | 'OFFER' | 'REJECTED' | 'DECLINED';
    link?: string;
}

export type JobProps = {
  jobs: Job[];
  onUpdate: (job: Job) => void;
  fetchJobs: () => void;
};