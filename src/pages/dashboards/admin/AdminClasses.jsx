import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClass, addEvent } from '../../../store/adminSlice';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { useToast } from '../../../components/ui/Toast';
import { BookOpen, Users, Clock, MoreHorizontal, Plus } from 'lucide-react';

export default function AdminClasses() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.admin.classes);
  const { success } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', instructor: '', capacity: 30, schedule: '', color: 'var(--color-primary)' });

  const handleCreateCourse = (e) => {
    e.preventDefault();
    // Dispatch new class to Redux
    dispatch(addClass({
      name: formData.name,
      instructor: formData.instructor,
      capacity: parseInt(formData.capacity) || 30,
      schedule: formData.schedule,
      color: formData.color,
    }));
    
    // Dispatch a dummy event to the master schedule as requested
    dispatch(addEvent({
      title: formData.name,
      type: 'class',
      day: 1, // Defaulting to Monday
      startTime: '09:00', // Defaulting to 9 AM
      endTime: '10:30',
      location: 'Room TBD'
    }));

    setIsModalOpen(false);
    success('Course successfully created & schedule updated.');
    setFormData({ name: '', instructor: '', capacity: 30, schedule: '', color: 'var(--color-primary)' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Class & Course Management</h1>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: 8 }} /> Create Course
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {courses.map((course, idx) => (
          <Card key={idx} hoverEffect={true} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '1rem', background: `${course.color}20`, color: course.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{course.name}</h3>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{course.id}</span>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                  <MoreHorizontal size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Instructor</div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{course.instructor}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Schedule</div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12}/> {course.schedule}</div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}><Users size={16}/> Enrolled Students</span>
                <span style={{ fontWeight: '600', color: course.students >= course.capacity ? 'var(--color-danger)' : 'var(--color-text-main)' }}>{course.students} / {course.capacity}</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--color-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(course.students / course.capacity) * 100}%`, background: course.students >= course.capacity ? 'var(--color-danger)' : course.color, borderRadius: '4px' }}></div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                <Button variant="outline" size="sm" style={{ flex: 1 }}>View Details</Button>
                <Button variant="outline" size="sm" style={{ flex: 1 }}>Manage Roster</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Course">
        <form onSubmit={handleCreateCourse} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Course Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Instructor</label>
            <input required type="text" value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Capacity</label>
              <input required type="number" min="1" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Schedule Text</label>
              <input required type="text" placeholder="e.g. Mon, Wed 09:00 AM" value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Theme Color</label>
            <select value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}>
              <option value="var(--color-primary)">Primary Blue</option>
              <option value="var(--color-secondary)">Secondary Purple</option>
              <option value="var(--color-success)">Success Green</option>
              <option value="var(--color-warning)">Warning Orange</option>
              <option value="var(--color-accent)">Accent Pink</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Course</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
