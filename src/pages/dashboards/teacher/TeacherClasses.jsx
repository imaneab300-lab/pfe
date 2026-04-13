import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { BookOpen, Users, Clock, Download, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TeacherClasses() {
  const navigate = useNavigate();
  const classes = [
    { name: 'Mathematics 10A', room: 'Room 304', time: 'Mon, Wed 09:00 AM', students: 32, avgGrade: '88%' },
    { name: 'Physics 11B', room: 'Lab 2', time: 'Tue, Thu 11:00 AM', students: 28, avgGrade: '82%' },
    { name: 'Advanced Calculus', room: 'Room 310', time: 'Mon, Fri 02:00 PM', students: 24, avgGrade: '91%' },
  ];

  const handleDownloadSyllabus = () => {
    // Create a mock PDF blob for download
    const element = document.createElement("a");
    const file = new Blob(["Mock Syllabus Content for Teacher Classes"], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Class_Syllabus.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>My Classes</h1>
        <Button variant="primary" onClick={handleDownloadSyllabus}>
          <Download size={18} style={{ marginRight: 8 }} /> Download PDF
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {classes.map((cls, idx) => (
          <Card key={idx} hoverEffect={true} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px var(--color-primary-light)' }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{cls.name}</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{cls.room}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--color-surface-2)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.375rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Schedule</div>
                <div style={{ fontWeight: '600', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-text-main)' }}><Clock size={12} color="var(--color-primary)"/> {cls.time}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.375rem', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Class Average</div>
                <div style={{ fontWeight: '700', fontSize: '0.8125rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}><CheckCircle size={12}/> {cls.avgGrade}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    <Users size={16}/> {cls.students} Students Enrolled
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/teacher/classes/${idx + 1}`)}>
                  View Details
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
