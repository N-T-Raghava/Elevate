// Define interfaces for the JSON data structures
interface Contest {
  platform: string;
  code: string;
  name: string;
  status: string;
  start: string;
  end: string;
  duration: string;
  link: string;
}

interface Hackathon {
  title: string;
  url: string;
  organizer: string;
  startDate: string;
  endDate: string;
  tags: string[];
  location: string;
}

export interface Event {
  title: string;
  date: string;
  status: string;
  url?: string;
}

// Use require for JSON imports in React Native
const contestsData: Contest[] = require('./contests.json');
const hackathonsData: Hackathon[] = require('./all_hackathons.json');

export const getContests = (): Event[] => {
  return contestsData.map(contest => ({
    title: contest.name,
    date: formatDate(contest.start),
    status: contest.status,
    url: contest.link
  }));
};

export const getHackathons = (): Event[] => {
  return hackathonsData.map(hackathon => ({
    title: hackathon.title,
    date: `${formatDate(hackathon.startDate)} - ${formatDate(hackathon.endDate)}`,
    status: getHackathonStatus(new Date(hackathon.startDate), new Date(hackathon.endDate)),
    url: hackathon.url
  }));
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getHackathonStatus = (startDate: Date, endDate: Date): string => {
  const now = new Date();
  if (now < startDate) {
    return 'Upcoming';
  } else if (now > endDate) {
    return 'Ended';
  }
  return 'In Progress';
};