import mockData from '../data/mockData.json';

const STORAGE_KEYS = {
  HELP_REQUESTS: 'help_bridge_requests',
  VOLUNTEERS: 'help_bridge_volunteers',
  PARTICIPATIONS: 'help_bridge_participations',
};

// Initialize storage with mock data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(mockData.helpRequests));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(mockData.volunteers));
  }
};

// Help Requests
export const getHelpRequests = () => {
  const data = localStorage.getItem(STORAGE_KEYS.HELP_REQUESTS);
  return data ? JSON.parse(data) : mockData.helpRequests;
};

export const saveHelpRequest = (request) => {
  const requests = getHelpRequests();
  const newRequest = { ...request, id: Date.now(), date: new Date().toISOString().split('T')[0], status: 'Open' };
  const updatedRequests = [newRequest, ...requests];
  localStorage.setItem(STORAGE_KEYS.HELP_REQUESTS, JSON.stringify(updatedRequests));
  return newRequest;
};

// Volunteers
export const getVolunteers = () => {
  const data = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
  return data ? JSON.parse(data) : mockData.volunteers;
};

export const saveVolunteer = (volunteer) => {
  const volunteers = getVolunteers();
  const newVolunteer = { ...volunteer, id: Date.now() };
  const updatedVolunteers = [newVolunteer, ...volunteers];
  localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(updatedVolunteers));
  return newVolunteer;
};

// NGOs (Read only from mock for now)
export const getNGOs = () => {
  return mockData.ngos;
};

// Events (Read only from mock for now)
export const getEvents = () => {
  return mockData.events;
};

// Blogs (Read only from mock for now)
export const getBlogs = () => {
  return mockData.blogs;
};

// Event Participation
export const joinEvent = (eventId) => {
  const participations = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTICIPATIONS) || '[]');
  if (!participations.includes(eventId)) {
    participations.push(eventId);
    localStorage.setItem(STORAGE_KEYS.PARTICIPATIONS, JSON.stringify(participations));
    return true;
  }
  return false;
};

export const isParticipating = (eventId) => {
  const participations = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTICIPATIONS) || '[]');
  return participations.includes(eventId);
};
