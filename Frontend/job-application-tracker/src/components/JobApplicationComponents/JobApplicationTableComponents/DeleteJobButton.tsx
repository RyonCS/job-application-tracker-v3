import { useJobs } from '../../../contexts/JobContext';
import type { JobApplication } from '../../../types/jobApplication';
import axios from 'axios';

interface Props {
  job: JobApplication;
}

const DeleteJobButton = ({job}: Props) => {
    const {jobApplications, setJobApplications} = useJobs();

    const deleteJob = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/applications/${job.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            console.log(res);
            setJobApplications(jobApplications.filter((j) => j.id !== job.id));
        } catch (error) {
            console.error('Failed to delete job', error)
        }     
    }

  return (
    <button
      onClick={deleteJob}
      className="w-18 h-8 flex items-center justify-center rounded-2xl shadow-sm
      bg-red-100 text-red-600 hover:bg-red-600 hover:text-red-100 transition"
      title="Delete Job"
    >
      ×
    </button>
  )
}

export default DeleteJobButton;
