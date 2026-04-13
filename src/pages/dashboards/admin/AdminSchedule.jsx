import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent } from '../../../store/adminSlice';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { useToast } from '../../../components/ui/Toast';
import { Calendar, ChevronLeft, ChevronRight, Plus, Printer } from 'lucide-react';

export default function AdminSchedule() {
  const dispatch = useDispatch();
  const events = useSelector(state => state.admin.events);
  const { success } = useToast();
  
  const [currentWeek, setCurrentWeek] = useState('October 19 - October 25, 2026');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'internal', day: '1', startTime: '10:00', endTime: '11:00', location: '' });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    dispatch(addEvent({
      ...formData,
      day: parseInt(formData.day)
    }));
    setIsModalOpen(false);
    success('Event added to the master schedule.');
    setFormData({ title: '', type: 'internal', day: '1', startTime: '10:00', endTime: '11:00', location: '' });
  };

  const handlePrint = () => {
    window.print();
  };

  const getPositionStyles = (startTime, endTime) => {
    const parseTime = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h + (m / 60);
    };
    const startH = parseTime(startTime);
    const endH = parseTime(endTime);
    // Base 08:00 = 0px. Each hour is 80px.
    const top = (startH - 8) * 80;
    const height = (endH - startH) * 80;
    return { top: `${Math.max(top, 0)}px`, height: `${Math.max(height, 20)}px` };
  };

  const getColorTheme = (type) => {
    switch (type) {
      case 'class': return { bg: 'rgba(59, 130, 246, 0.1)', border: 'var(--color-primary)', text: 'var(--color-primary)' };
      case 'internal': return { bg: 'rgba(16, 185, 129, 0.1)', border: 'var(--color-success)', text: 'var(--color-success)' };
      case 'general': return { bg: 'rgba(245, 158, 11, 0.1)', border: 'var(--color-warning)', text: 'var(--color-warning)' };
      default: return { bg: 'rgba(99, 102, 241, 0.1)', border: 'var(--color-secondary)', text: 'var(--color-secondary)' };
    }
  };

  return (
    <div className="schedule-print-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }} className="no-print">
        <div>
          <h1 style={{ fontSize: '2rem' }}>Master Schedule</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="outline" onClick={handlePrint}>
              <Printer size={18} style={{ marginRight: 8 }} /> Print Schedule
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} style={{ marginRight: 8 }} /> Create Event
            </Button>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .schedule-print-container, .schedule-print-container * { visibility: visible; }
          .schedule-print-container { position: absolute; left: 0; top: 0; width: 100%; padding: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      <Card style={{ padding: 0 }}>
        <div className="no-print" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <select style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}>
                    <option>All Grades</option>
                    <option>10th Grade</option>
                </select>
                <select style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}>
                    <option>All Teachers</option>
                    <option>Dr. Sarah Jenkins</option>
                </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: '600' }}>{currentWeek}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="outline" size="sm" style={{ padding: '0.5rem' }}><ChevronLeft size={18} /></Button>
                    <Button variant="outline" size="sm" style={{ padding: '0.5rem' }}><ChevronRight size={18} /></Button>
                </div>
            </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: '800px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
                    <div style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: 'var(--color-text-muted)' }}>Time</div>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
                        <div key={idx} style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', borderLeft: '1px solid var(--color-border)' }}>
                            {day}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr)', position: 'relative' }}>
                    <div style={{ borderRight: '1px solid var(--color-border)' }}>
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                            <div key={time} style={{ height: '80px', padding: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>
                                {time}
                            </div>
                        ))}
                    </div>

                    {Array(5).fill(null).map((_, i) => {
                        const dayEvents = events.filter(e => e.day === i + 1);
                        return (
                        <div key={i} style={{ borderRight: '1px solid var(--color-border)', position: 'relative' }}>
                            {Array(9).fill(null).map((_, j) => (
                                <div key={j} style={{ height: '80px', borderBottom: '1px solid var(--color-border)' }}></div>
                            ))}

                            {dayEvents.map(evt => {
                                const styles = getPositionStyles(evt.startTime, evt.endTime);
                                const theme = getColorTheme(evt.type);
                                return (
                                <div key={evt.id} style={{ 
                                    position: 'absolute', top: styles.top, left: '5px', right: '5px', height: styles.height, 
                                    background: theme.bg, borderLeft: `4px solid ${theme.border}`, borderRadius: '4px', padding: '0.25rem 0.5rem',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: theme.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt.title}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{evt.startTime} - {evt.endTime}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{evt.location}</div>
                                </div>
                                );
                            })}
                        </div>
                    )})}
                </div>
            </div>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Calendar Event">
        <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Event Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Day of Week</label>
                <select value={formData.day} onChange={e => setFormData({...formData, day: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                </select>
             </div>
             <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Type</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}>
                    <option value="class">Class</option>
                    <option value="internal">Internal Meeting</option>
                    <option value="general">General Event</option>
                </select>
             </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Start Time</label>
                <input required type="time" value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
             </div>
             <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>End Time</label>
                <input required type="time" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
             </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Location</label>
            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Event</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
