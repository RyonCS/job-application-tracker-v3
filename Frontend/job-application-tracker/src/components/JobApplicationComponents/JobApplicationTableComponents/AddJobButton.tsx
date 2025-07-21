import axios from 'axios';
import { useJobs } from '../../../contexts/JobContext';
import { BACKEND_URL } from '../../../config';

const AddJobButton = () => {
    const {jobApplications, setJobApplications} = useJobs();

    const createNewJob = async () => {
        try {
            const newJob = {
                applicationDate: new Date().toISOString(),
                company: "",
                position: "",
                location: "",
                status: 'APPLIED',
                workMode: 'REMOTE',
                linkToJobPosting: ""
            }

            const res = await axios.post(`${BACKEND_URL}/api/v1/applications/`, newJob, 
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );

            // Sort new job list; simulating backend sorting without the API call.
            setJobApplications([...jobApplications, res.data.newApp].sort(
              (a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()));
        } catch (error) {
            console.error('Failed to create job: ', error);
        }
    }

  return (
    <button
      onClick={createNewJob}
      className="w-25 h-8 mb-2 mt-2 flex items-center justify-center rounded-2xl shadow-sm
      bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-emerald-100 transition"
      title="Add Job"
    >
      Add Job
    </button>
  )
}

export default AddJobButton;
