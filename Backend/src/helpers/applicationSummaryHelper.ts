import { JobApplication } from "@prisma/client";

export const getApplicationSummary = (jobApplications: any) => {
    const totalApplications = jobApplications.length;

    const now = new Date();
    const startOfTheWeek = getStartOfTheWeek(now);
    const weeklyApplications = jobApplications.filter((application: JobApplication) => {
        return new Date(application.applicationDate) >= startOfTheWeek
    }).length;

    return { totalApplications, weeklyApplications};
};

function getStartOfTheWeek(date: Date): Date {
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    start.setHours(0, 0, 0, 0);
    return start;
}
