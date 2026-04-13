import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Search, Mail, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TeacherStudents() {
  const navigate = useNavigate();
  const [filterClass, setFilterClass] = useState('All Classes');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { name: 'Alex Johnson', id: 'STD-1002', class: 'Mathematics 10A', grade: '92%', lastAttendance: 'Present', avatar: 'A' },
    { name: 'Emily Davis', id: 'STD-1004', class: 'Mathematics 10A', grade: '88%', lastAttendance: 'Absent', avatar: 'E' },
    { name: 'Michael Smith', id: 'STD-1015', class: 'Physics 11B', grade: '76%', lastAttendance: 'Present', avatar: 'M' },
    { name: 'Sophia Martinez', id: 'STD-1022', class: 'Advanced Calculus', grade: '95%', lastAttendance: 'Present', avatar: 'S' },
  ];

  let filteredStudents = filterClass === 'All Classes' ? students : students.filter(s => s.class === filterClass);
  if (searchTerm) {
    filteredStudents = filteredStudents.filter(s => s.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Student Roster</h1>
      </div>

      <Card style={{ padding: 0 }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select 
               value={filterClass}
               onChange={(e) => setFilterClass(e.target.value)}
                style={{ padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.875rem' }}
            >
               <option>All Classes</option>
               <option>Mathematics 10A</option>
               <option>Physics 11B</option>
               <option>Advanced Calculus</option>
            </select>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: 12, top: 10, color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '280px', padding: '0.625rem 1rem 0.625rem 2.75rem', borderRadius: '2rem', border: '1.5px solid var(--color-border)', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.9375rem' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Student details</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Class</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Current Grade</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Recent Attendance</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)', cursor: 'pointer' }} onClick={() => navigate('/dashboard/teacher/profile')}>
                  <td style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {student.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{student.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{student.id}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>{student.class}</td>
                  <td style={{ padding: '1.5rem', fontWeight: '600', color: parseInt(student.grade) > 85 ? 'var(--color-success)' : (parseInt(student.grade) > 70 ? 'var(--color-warning)' : 'var(--color-danger)') }}>
                      {student.grade}
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600',
                      background: student.lastAttendance === 'Present' ? 'var(--color-success)20' : 'var(--color-danger)20',
                      color: student.lastAttendance === 'Present' ? 'var(--color-success)' : 'var(--color-danger)',
                    }}>
                      {student.lastAttendance}
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button style={{ background: 'var(--color-surface-2)', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', cursor: 'pointer' }} title="Email Student" onClick={(e) => e.stopPropagation()}>
                          <Mail size={16} />
                        </button>
                        <button style={{ background: 'var(--color-surface-2)', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', cursor: 'pointer' }} title="Message Parent" onClick={(e) => e.stopPropagation()}>
                          <MessageSquare size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
