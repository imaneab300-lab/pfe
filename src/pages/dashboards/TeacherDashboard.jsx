import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, FileText, CheckCircle, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const classes = [
    { name: 'Mathematics 10A', students: 32, time: '09:00 AM' },
    { name: 'Physics 11B', students: 28, time: '11:00 AM' },
    { name: 'Advanced Calculus', students: 24, time: '02:00 PM' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Teacher Portal</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card 
          as={motion.div}
          whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', borderLeft: '4px solid var(--color-primary)' }} 
          onClick={() => navigate('/dashboard/teacher/students')}
        >
          <div style={{ background: 'var(--color-primary-light)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--color-primary)' }}>
            <Users size={32} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>84</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Total Students</div>
          </div>
        </Card>
        
        <Card 
          as={motion.div}
          whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', borderLeft: '4px solid var(--color-success)' }} 
          onClick={() => navigate('/dashboard/teacher/assignments')}
        >
          <div style={{ background: 'var(--color-success-light)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--color-success)' }}>
            <FileText size={32} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>12</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Assignments to Grade</div>
          </div>
        </Card>

        <Card 
          as={motion.div}
          whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', borderLeft: '4px solid var(--color-accent)' }} 
          onClick={() => navigate('/dashboard/teacher/grades')}
        >
          <div style={{ background: 'var(--color-accent-light)', padding: '1rem', borderRadius: 'var(--radius-lg)', color: 'var(--color-accent)' }}>
            <PieChart size={32} />
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-text-main)' }}>78%</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Class Average</div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Today's Classes & Attendance</h3>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/teacher/attendance')}>View All Calendar</Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {classes.map((cls, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.01 }}
                style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '1.25rem', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>{cls.name}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {cls.time} • {cls.students} Students
                  </p>
                </div>
                <Button variant="primary" size="sm" onClick={() => navigate('/dashboard/teacher/attendance')}>
                  <CheckCircle size={16} style={{ marginRight: '0.5rem' }} /> Mark Attendance
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ marginBottom: '1.5rem' }}>Recent Submissions</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4].map((item) => (
              <li key={item} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', background: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <FileText size={20} />
                </div>
                <div>
                  <h5 style={{ fontWeight: '600' }}>Math Homework #{item}</h5>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Submitted by John Doe</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
