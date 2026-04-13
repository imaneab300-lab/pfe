import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Calendar as CalendarIcon, X } from 'lucide-react';
import { useToast } from '../../../components/ui/Toast';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function TeacherCalendar() {
  const { success } = useToast();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
      title: '', date: '', time: '', description: '', class: 'Mathematics 10A'
  });

  const [events, setEvents] = useState([
    { id: 1, day: 24, month: currentMonth, year: currentYear, title: 'Physics Lab Session', time: '9:00 AM', description: 'Mandatory lab session for Class 11B.', class: 'Physics 11B', color: 'var(--color-primary)' },
    { id: 2, day: 24, month: currentMonth, year: currentYear, title: 'Department Meeting', time: '2:00 PM', description: 'Monthly syllabus review.', class: 'Staff', color: 'var(--color-warning)' },
    { id: 3, day: 28, month: currentMonth, year: currentYear, title: 'Exam Preparation Q&A', time: '10:00 AM', description: 'Open session for all students.', class: 'All Classes', color: 'var(--color-success)' },
  ]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const eventDate = new Date(newEvent.date);
    const id = events.length + 1;
    setEvents(prev => [...prev, { 
        ...newEvent, 
        id,
        day: eventDate.getDate(), 
        month: eventDate.getMonth(), 
        year: eventDate.getFullYear(),
        color: 'var(--color-primary)' 
    }]);
    setIsModalOpen(false);
    setNewEvent({ title: '', date: '', time: '', description: '', class: 'Mathematics 10A' });
    success('Event added to calendar!');
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => { if(currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y-1); } else setCurrentMonth(m => m-1); };
  const nextMonth = () => { if(currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y+1); } else setCurrentMonth(m => m+1); };

  const cells = [];
  for(let i = 0; i < firstDay; i++) cells.push(null);
  for(let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Academic Calendar</h1>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
          <Plus size={20} style={{ marginRight: 8 }} /> New Event
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>{MONTHS[currentMonth]} {currentYear}</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={prevMonth} style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--color-surface)' }}><ChevronLeft size={18}/></button>
              <button onClick={nextMonth} style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'var(--color-surface)' }}><ChevronRight size={18}/></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {DAYS.map(d => <div key={d} style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600', fontSize: '0.875rem' }}>{d}</div>)}
            {cells.map((day, i) => {
              const dayEvents = events.filter(e => e.day === day && e.month === currentMonth && e.year === currentYear);
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              return (
                <div key={i} onClick={() => day && dayEvents[0] && setSelectedEvent(dayEvents[0])} style={{
                  aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
                  padding: '0.5rem', borderRadius: 'var(--radius-md)', cursor: (day && dayEvents.length > 0) ? 'pointer' : 'default',
                  background: isToday ? 'var(--color-primary)' : 'transparent',
                  color: isToday ? 'white' : 'var(--color-text-main)',
                  position: 'relative',
                  border: '1px solid var(--color-bg-2)',
                  transition: 'all 0.2s'
                }}>
                  {day && <span style={{ fontWeight: isToday ? '700' : '500', fontSize: '1rem' }}>{day}</span>}
                  <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
                      {dayEvents.map((e, idx) => (
                          <div key={idx} style={{ width: '6px', height: '6px', borderRadius: '50%', background: isToday ? 'white' : e.color }}></div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card style={{ position: 'sticky', top: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={20} color="var(--color-primary)"/> Upcoming Events</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {events.filter(e => e.day >= today.getDate()).slice(0, 4).map((ev, idx) => (
                <div key={idx} onClick={() => setSelectedEvent(ev)} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', cursor: 'pointer', padding: '0.75rem', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: '4px', borderRadius: '4px', background: ev.color, alignSelf: 'stretch', flexShrink: 0 }}></div>
                  <div>
                    <div style={{ fontWeight: '700', marginBottom: '0.25rem' }}>{ev.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{MONTHS[ev.month]} {ev.day} • {ev.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* New Event Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule New Event" size="md">
          <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Event Title</label>
                  <input required value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }} placeholder="e.g. Parent-Teacher Meeting" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Date</label>
                      <input type="date" required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }} />
                  </div>
                  <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Time</label>
                      <input type="time" required value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }} />
                  </div>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Involved Class (Optional)</label>
                  <select value={newEvent.class} onChange={e => setNewEvent({...newEvent, class: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }}>
                      <option>Mathematics 10A</option>
                      <option>Physics 11B</option>
                      <option>Staff Meeting</option>
                      <option>All Classes</option>
                  </select>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                  <textarea rows={3} value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }} placeholder="What is this event about?" />
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">Save Event</Button>
              </div>
          </form>
      </Modal>

      {/* Event Details Modal */}
      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} title="Event Details" size="sm">
          {selectedEvent && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: selectedEvent.color }}></div>
                      <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{selectedEvent.title}</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)' }}>
                          <CalendarIcon size={18} />
                          <span>{MONTHS[selectedEvent.month]} {selectedEvent.day}, {selectedEvent.year}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)' }}>
                          <Clock size={18} />
                          <span>{selectedEvent.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)' }}>
                          <Users size={18} />
                          <span>{selectedEvent.class}</span>
                      </div>
                  </div>
                  <p style={{ lineHeight: 1.6, color: 'var(--color-text-main)', margin: 0 }}>{selectedEvent.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '1rem' }}>
                      <Button variant="outline" onClick={() => setSelectedEvent(null)}>Close</Button>
                      <Button variant="danger" onClick={() => {
                          setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
                          setSelectedEvent(null);
                          success('Event removed.');
                      }}>Delete</Button>
                  </div>
              </div>
          )}
      </Modal>
    </div>
  );
}
