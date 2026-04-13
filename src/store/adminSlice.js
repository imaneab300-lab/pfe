import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    { id: 'USR001', name: 'Dr. Sarah Jenkins', role: 'Teacher', email: 's.jenkins@edusaas.com', phone: '+1 234-567-8901', status: 'Active', department: 'Science' },
    { id: 'USR002', name: 'Alex Johnson', role: 'Student', email: 'a.johnson@student.com', phone: '+1 234-567-8902', status: 'Active', department: 'Grade 10' },
    { id: 'USR003', name: 'Amanda Clarke', role: 'Parent', email: 'amanda.c@parents.com', phone: '+1 234-567-8903', status: 'Active', department: 'N/A' },
    { id: 'USR004', name: 'Prof. Mark Davis', role: 'Teacher', email: 'm.davis@edusaas.com', phone: '+1 234-567-8904', status: 'On Leave', department: 'Mathematics' },
    { id: 'USR005', name: 'Emily Davis', role: 'Student', email: 'e.davis@student.com', phone: '+1 234-567-8905', status: 'Inactive', department: 'Grade 12' },
  ],
  classes: [
    { id: 'CLS001', name: 'Advanced Mathematics', instructor: 'Prof. Mark Davis', students: 28, capacity: 30, schedule: 'Mon, Wed 09:00 AM', status: 'Active', color: 'var(--color-primary)' },
    { id: 'CLS002', name: 'Physics 101', instructor: 'Dr. Sarah Jenkins', students: 35, capacity: 40, schedule: 'Tue, Thu 11:00 AM', status: 'Active', color: 'var(--color-secondary)' },
    { id: 'CLS003', name: 'World History', instructor: 'Elena Rodríguez', students: 45, capacity: 45, schedule: 'Mon, Fri 01:00 PM', status: 'Full', color: 'var(--color-accent)' },
    { id: 'CLS004', name: 'Computer Science Fundamentals', instructor: 'James Wilson', students: 15, capacity: 30, schedule: 'Wed 02:00 PM', status: 'Active', color: 'var(--color-success)' },
  ],
  events: [
    { id: 'EVT001', title: 'Staff Meeting', type: 'internal', day: 2, startTime: '10:00', endTime: '11:50', location: 'Conference Room A' },
    { id: 'EVT002', title: 'School Assembly', type: 'general', day: 4, startTime: '13:00', endTime: '14:30', location: 'Main Hall' }
  ],
  messages: {
    'SJ': [
      { id: 1, text: 'Hello! I am preparing for the new semester. Can you approve the new physics lab equipment budget?', time: '10:30 AM', sender: 'them' },
      { id: 2, text: 'Hi Sarah, yes I have seen the proposal. I will approve it by end of day.', time: '10:35 AM', sender: 'me' },
      { id: 3, text: 'Excellent. I have updated the physics syllabus.', time: '10:45 AM', sender: 'them' }
    ]
  },
  contacts: [
    { id: 'SJ', name: 'Sarah Jenkins', role: 'Teacher', lastMsg: 'I have updated the physics syllabus.', time: '10:45 AM', unread: true },
    { id: 'MD', name: 'Mark Davis', role: 'Teacher', lastMsg: 'Can we schedule a meeting next week?', time: 'Yesterday', unread: false },
    { id: 'PR', name: 'Paul Rogers', role: 'Parent', lastMsg: 'Thank you for the update.', time: 'Monday', unread: false },
  ],
  notifications: [
    { id: 1, title: 'System Maintenance Scheduled', desc: 'The grading portal will be down for maintenance this Saturday from 2 AM to 4 AM.', type: 'system', date: 'Today, 09:00 AM', unread: true },
    { id: 2, title: 'New Teacher Registration', desc: 'Michael Scott has registered as a new English Teacher. Approval pending.', type: 'alert', date: 'Yesterday, 14:30 PM', unread: true },
    { id: 3, title: 'Fees Processed Successfully', desc: 'Batch payment processing for Fall 2026 completed with 0 errors.', type: 'success', date: 'Oct 24, 08:00 AM', unread: false },
    { id: 4, title: 'Meeting Reminder', desc: 'Board direction meeting at 1 PM in Conference Room A.', type: 'event', date: 'Oct 23, 11:00 AM', unread: false },
  ]
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        id: `USR00${state.users.length + 1}`,
        ...action.payload,
        status: 'Active'
      });
    },
    addClass: (state, action) => {
      state.classes.push({
        id: `CLS00${state.classes.length + 1}`,
        ...action.payload,
        students: 0,
        status: 'Active',
      });
    },
    addEvent: (state, action) => {
      state.events.push({
        id: `EVT00${state.events.length + 1}`,
        ...action.payload
      });
    },
    sendMessage: (state, action) => {
      const { contactId, text, time, sender } = action.payload;
      if (!state.messages[contactId]) {
        state.messages[contactId] = [];
      }
      state.messages[contactId].push({ id: Date.now(), text, time, sender });
      
      const contact = state.contacts.find(c => c.id === contactId);
      if (contact) {
        contact.lastMsg = text;
        contact.time = time;
      }
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.unread = false);
    }
  }
});

export const { addUser, addClass, addEvent, sendMessage, markAllNotificationsRead } = adminSlice.actions;
export default adminSlice.reducer;
