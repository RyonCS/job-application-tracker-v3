import { useJobs } from '../../../contexts/JobContext';
import type { JobApplication } from '../../../types/jobApplication';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';

interface Props {
  jobApplication: JobApplication;
}

const DeleteJobButton = ({jobApplication}: Props) => {
    const {jobApplications, setJobApplications} = useJobs();

    const deleteJob = async () => {
        try {
            const res = await axios.delete(`${BACKEND_URL}/api/v1/applications/${jobApplication.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            console.log(res);
            setJobApplications(jobApplications.filter((j) => j.id !== jobApplication.id));
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
