import axios from 'axios';
import { useJobs } from '../../../contexts/JobContext';

const AddJobButton = () => {
    const {jobs, setJobs} = useJobs();

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

            const res = await axios.post('http://localhost:3000/api/v1/applications/', newJob, 
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );
            console.log(res);
            setJobs([...jobs, res.data.newApp]);
        } catch (error) {
            console.error('Failed to create job: ', error);
        }
    }

  return (
    <button
      onClick={createNewJob}
      className="w-25 h-8 mb-2 mt-6 flex items-center justify-center rounded-2xl shadow-sm
      bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-emerald-100 transition"
      title="Add Job"
    >
      Add Job
    </button>
  )
}

export default AddJobButton;
