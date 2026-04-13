import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Check, X, Clock, HelpCircle, Save, Calendar, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../../components/ui/Toast';

export default function TeacherAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('Mathematics 10A');
  const { success } = useToast();

  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', class: 'Mathematics 10A', status: 'present', note: '' },
    { id: 2, name: 'Mia Johnson', class: 'Mathematics 10A', status: 'absent', note: '' },
    { id: 3, name: 'Emily Davis', class: 'Mathematics 10A', status: 'late', note: '' },
    { id: 4, name: 'Michael Smith', class: 'Mathematics 10A', status: 'present', note: '' },
    { id: 5, name: 'Sarah Wilson', class: 'Physics 11B', status: 'present', note: '' },
    { id: 6, name: 'James Brown', class: 'Physics 11B', status: 'absent', note: '' },
  ]);

  const filteredStudents = students.filter(s => s.class === selectedClass);

  const handleMark = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleNoteChange = (id, note) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, note } : s));
  };

  const handleSaveAttendance = () => {
    success('Attendance for ' + selectedClass + ' on ' + date + ' has been saved successfully!');
  };

  const handleDownloadAbsenceList = () => {
    const absentStudents = students.filter(s => s.status === 'absent');
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Name,Class,Status,Note\n"
      + absentStudents.map(s => `${s.id},${s.name},${s.class},${s.status},${s.note}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `absence_list_${selectedClass}_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Absence list downloaded successfully!');
  };

  const handleUploadAttendance = () => {
      // Mock upload
      success('Attendance file uploaded and processed!');
  };

  const getStatusColor = (status) => {
      if(status === 'present') return 'var(--color-success)';
      if(status === 'absent') return 'var(--color-danger)';
      if(status === 'late') return 'var(--color-warning)';
      if(status === 'excused') return 'var(--color-text-muted)';
      return 'var(--color-border)';
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Attendance Roll Call</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-muted)' }} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.875rem' }} />
            </div>
            <Button variant="outline" onClick={handleUploadAttendance}>
                <Upload size={18} style={{ marginRight: 8 }} /> Upload
            </Button>
            <Button variant="outline" onClick={handleDownloadAbsenceList}>
                <Download size={18} style={{ marginRight: 8 }} /> Download Absences
            </Button>
            <Button variant="primary" onClick={handleSaveAttendance} style={{ padding: '0.75rem 1.5rem' }}>
                <Save size={18} style={{ marginRight: 8 }} /> Save Attendance
            </Button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ 
                padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)', 
                border: '1.5px solid var(--color-border)', background: 'var(--color-surface)',
                color: 'var(--color-text-main)', fontSize: '1rem', fontWeight: '600',
                cursor: 'pointer', outline: 'none', minWidth: '200px',
                boxShadow: 'var(--shadow-sm)'
            }}
          >
              <option value="Mathematics 10A">Mathematics 10A</option>
              <option value="Physics 11B">Physics 11B</option>
              <option value="Advanced Chemistry">Advanced Chemistry</option>
          </select>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: 'var(--shadow-md)', flex: 1, minWidth: '180px' }}>
              <div style={{ background: 'var(--color-success-light)', color: 'var(--color-success)', padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}><Check size={24}/></div>
              <div><div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{filteredStudents.filter(s => s.status === 'present').length}</div><div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Present</div></div>
          </div>
          <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: 'var(--shadow-md)', flex: 1, minWidth: '180px' }}>
              <div style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)', padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}><X size={24}/></div>
              <div><div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{filteredStudents.filter(s => s.status === 'absent').length}</div><div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Absent</div></div>
          </div>
          <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: 'var(--shadow-md)', flex: 1, minWidth: '180px' }}>
              <div style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)', padding: '0.75rem', borderRadius: 'var(--radius-lg)' }}><Clock size={24}/></div>
              <div><div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{filteredStudents.filter(s => s.status === 'late').length}</div><div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Late</div></div>
          </div>
      </div>

      <Card style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
            <tr style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Student Name</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>ID</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Class</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Quick Mark</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Notes</th>
            </tr>
            </thead>
            <tbody>
            {filteredStudents.map((st, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '1.5rem', fontWeight: '600' }}>{st.name}</td>
                    <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>STD-20{st.id}4</td>
                    <td style={{ padding: '1.5rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'var(--color-bg-2)', fontSize: '0.75rem', fontWeight: '600' }}>{st.class}</span></td>
                    <td style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', gap: '0.625rem' }}>
                            {[
                              { s: 'present', i: <Check size={18}/>, c: 'var(--color-success)' },
                              { s: 'absent', i: <X size={18}/>, c: 'var(--color-danger)' },
                              { s: 'late', i: <Clock size={18}/>, c: 'var(--color-warning)' },
                              { s: 'excused', i: <HelpCircle size={18}/>, c: 'var(--color-text-muted)' },
                            ].map(btn => (
                                <motion.button
                                    key={btn.s}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleMark(st.id, btn.s)}
                                    style={{
                                        width: '36px', height: '36px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer',
                                        background: st.status === btn.s ? btn.c : 'var(--color-bg-2)',
                                        color: st.status === btn.s ? 'white' : 'var(--color-text-muted)',
                                        border: `1.5px solid ${st.status === btn.s ? btn.c : 'var(--color-border)'}`,
                                        transition: 'all 0.2s',
                                        boxShadow: st.status === btn.s ? `0 0 10px ${btn.c}40` : 'none'
                                    }}
                                >
                                    {btn.i}
                                </motion.button>
                            ))}
                        </div>
                    </td>
                    <td style={{ padding: '1.25rem' }}>
                        <input
                            type="text"
                            value={st.note}
                            onChange={(e) => handleNoteChange(st.id, e.target.value)}
                            placeholder="Add a comment..."
                            style={{
                                width: '100%', padding: '0.625rem 0.875rem',
                                borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                                outline: 'none', background: 'var(--color-surface)',
                                color: 'var(--color-text-main)', fontSize: '0.875rem'
                            }}
                        />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </Card>
    </div>
  );
}
