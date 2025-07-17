import axios from 'axios';
import {useEffect, useState} from 'react';
import { JobsContext } from '../contexts/JobContext';
import type { Job } from '../types/job';
import JobApplicationTable from '../components/JobApplicationComponents/JobApplicationTableComponents/JobApplicationTable';
import ApplicationSummaryCard from '../components/JobApplicationComponents/ApplicationSummaryCard';


// Main page component to display and manage the list of job applications.
const JobApplicationsPage = () => {
    // State to hold the list of jobs fetched from the backend API.
    const [jobs, setJobs] = useState<Job[]>([]);

    const fetchJobs = async () => {
        try {
            // Make a GET request to fetch job applications.
            const res = await axios.get('http://localhost:3000/api/v1/applications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach token for auth.
                },
            });
            // Update the jobs state with the received applications data.
            setJobs(res.data.applications);

        } catch (error) {
            console.error("Failed to fetch jobs.", error);
        }
    };

    // useEffect runs once when the component mounts to fetch job data from the server.
    // runs again whenever jobs changes (mainly to update with a sorted job list for adding new jobs.)
    // TODO: Need a better method.
    useEffect(() => {
        fetchJobs();
    }, []);

    // Handler function to update a job.
    const handleJobUpdate = async (updatedJob: Job) => {
        // Optimistic updating.
        // We go through the list of jobs and replace the old job with the newly updated job before making the API call.
        setJobs(prevJobs => {
            return prevJobs.map(job => job.id === updatedJob.id ? updatedJob : job)
        })

        try {
            // Send a PUT request to update the job on the server.
            await axios.put(`http://localhost:3000/api/v1/applications/${updatedJob.id}`, updatedJob, {
                headers: { Authorization :  `Bearer ${localStorage.getItem('token')}`},
            })
        } catch (error) {
            console.error('Update Failed: ', error);
        }
    };

    // Render the JobApplicationTable component, passing the jobs list and update handler.
    return (
    // Context wrapped to pass down the current state of jobs and the ability to update them.
    <JobsContext.Provider value={{ jobs, setJobs }}>
        {/* Job application table */}
        <div className="flex items-center justify-center justify-items-center">
            <ApplicationSummaryCard summaryType="total" cardHeaderText='Total' />
            <ApplicationSummaryCard summaryType="weekly" cardHeaderText='This Week' />
        </div>
        

        <JobApplicationTable jobs={jobs} onUpdate={handleJobUpdate} fetchJobs={fetchJobs} />
    </JobsContext.Provider>
    )
}

export default JobApplicationsPage;
