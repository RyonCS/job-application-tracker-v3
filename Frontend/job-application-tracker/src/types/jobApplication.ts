export type JobApplication = {
    id: string;
    applicationDate?: Date;
    company?: string;
    position?: string;
    location?: string;
    workMode?: 'REMOTE' | 'INPERSON' | 'HYBRID';
    status?: 'APPLIED' | 'PHONESCREEN' | 'INTERVIEW' | 'TAKEHOMEASSESSMENT' | 'OFFER' | 'REJECTED' | 'DECLINED';
    linkToJobPosting?: string;
}

export type JobApplicationProps = {
  jobApplications: JobApplication[];
  onUpdate: (jobApplication: JobApplication) => void;
};