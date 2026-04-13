import React, { useState, useRef } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Download, Save, Upload, CheckCircle, Search, Filter } from 'lucide-react';
import { useToast } from '../../../components/ui/Toast';

export default function TeacherGrades() {
  const [subject, setSubject] = useState('Physics 101');
  const [selectedClass, setSelectedClass] = useState('Section A');
  const [published, setPublished] = useState(false);
  const { success, error } = useToast();
  const fileInputRef = useRef();

  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', class: 'Section A', q1: 18, mid: 15, proj: 17, fin: 16, total: '16.5' },
    { id: 2, name: 'Mia Johnson', class: 'Section A', q1: 12, mid: 14, proj: 15, fin: 13, total: '13.8' },
    { id: 3, name: 'Emily Davis', class: 'Section B', q1: 20, mid: 19, proj: 18, fin: 19, total: '19.2' },
    { id: 4, name: 'Michael Smith', class: 'Section A', q1: 15, mid: 12, proj: 14, fin: 0, total: 'Pending' },
  ]);

  const filteredStudents = students.filter(s => s.class === selectedClass);

  const handleGradeChange = (id, field, value) => {
    const numValue = parseFloat(value);
    if (numValue > 20) {
        error('Grade cannot exceed 20');
        return;
    }
    if (numValue < 0) {
        error('Grade cannot be negative');
        return;
    }

    setStudents(prev => prev.map(s => {
      if(s.id === id) {
          const updated = { ...s, [field]: value === '' ? 0 : numValue };
          if (updated.fin > 0 || updated.q1 > 0) {
             const tot = ((updated.q1 * 0.1) + (updated.mid * 0.3) + (updated.proj * 0.2) + (updated.fin * 0.4)).toFixed(1);
             updated.total = tot;
          } else {
             updated.total = 'Pending';
          }
          return updated;
      }
      return s;
    }));
  };

  const handlePublish = () => {
    setPublished(true);
    success('Grades for ' + subject + ' ' + selectedClass + ' have been published!');
  };

  const handleExportCSV = () => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Student ID,Student Name,Quiz 1,Midterm,Project,Final,Total\n"
        + filteredStudents.map(s => `${s.id},${s.name},${s.q1},${s.mid},${s.proj},${s.fin},${s.total}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `grades_${subject}_${selectedClass}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      success('Grades exported successfully!');
  };

  const handleImportCSV = (e) => {
      const file = e.target.files[0];
      if (file) {
          success('CSV Grades Imported Successfully!');
          setStudents(prev => prev.map(s => ({ 
              ...s, 
              q1: Math.floor(Math.random() * 5) + 15,
              total: (Math.random() * 5 + 14).toFixed(1)
          })));
      }
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Gradebook (0-20 Scale)
            {published && <span style={{ fontSize: '0.875rem', fontWeight: '600', padding: '0.35rem 0.85rem', background: 'var(--color-success-light)', color: 'var(--color-success)', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.35rem', border: '1px solid var(--color-success)' }}><CheckCircle size={14}/> Published</span>}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="file" accept=".csv" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImportCSV} />
            <Button variant="outline" onClick={() => fileInputRef.current.click()} style={{ borderColor: 'var(--color-border)' }}><Upload size={18} style={{ marginRight: 8 }}/> Import CSV</Button>
            <Button variant="outline" onClick={handleExportCSV} style={{ borderColor: 'var(--color-border)' }}><Download size={18} style={{ marginRight: 8 }}/> Export Grades</Button>
            <Button variant="primary" onClick={handlePublish} disabled={published} style={{ minWidth: '160px' }}>
                <Save size={18} style={{ marginRight: 8 }}/> {published ? 'Published' : 'Save & Publish'}
            </Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '300px' }}>
            <Filter size={18} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-muted)' }} />
            <select value={subject} onChange={(e) => setSubject(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.925rem', fontWeight: '600', appearance: 'none' }}>
                <option>Physics 101</option>
                <option>Advanced Mathematics</option>
                <option>Quantum Mechanics</option>
            </select>
        </div>
        <div style={{ position: 'relative', flex: 1, maxWidth: '200px' }}>
            <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-muted)' }} />
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontSize: '0.925rem', fontWeight: '600', appearance: 'none' }}>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
            </select>
        </div>
      </div>

      <Card style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
            <tr style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Student Name</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Quiz 1 (10%)</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Midterm (30%)</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Project (20%)</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700' }}>Final (40%)</th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>Final Score / 20</th>
            </tr>
            </thead>
            <tbody>
            {filteredStudents.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1.5rem', fontWeight: '600', color: 'var(--color-text-main)' }}>{s.name}</td>
                    <td style={{ padding: '1.5rem' }}>
                        <input 
                            type="number" 
                            min="0"
                            max="20"
                            step="0.5"
                            value={s.q1} 
                            onChange={(e) => handleGradeChange(s.id, 'q1', e.target.value)} 
                            style={{ 
                                width: '70px', padding: '0.75rem', border: '1.5px solid var(--color-border)', 
                                borderRadius: 'var(--radius-lg)', textAlign: 'center', background: 'var(--color-surface)',
                                color: 'var(--color-text-main)', transition: 'all 0.2s', outline: 'none',
                                fontWeight: '600'
                            }} 
                            onFocus={e => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                        <input type="number" min="0" max="20" step="0.5" value={s.mid} onChange={(e) => handleGradeChange(s.id, 'mid', e.target.value)} style={{ width: '70px', padding: '0.75rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontWeight: '600', outline: 'none' }} />
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                        <input type="number" min="0" max="20" step="0.5" value={s.proj} onChange={(e) => handleGradeChange(s.id, 'proj', e.target.value)} style={{ width: '70px', padding: '0.75rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontWeight: '600', outline: 'none' }} />
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                        <input type="number" min="0" max="20" step="0.5" value={s.fin === 0 ? '' : s.fin} onChange={(e) => handleGradeChange(s.id, 'fin', e.target.value)} placeholder="-" style={{ width: '70px', padding: '0.75rem', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', background: 'var(--color-surface)', color: 'var(--color-text-main)', fontWeight: '600', outline: 'none' }} />
                    </td>
                    <td style={{ padding: '1.5rem', fontWeight: '800', fontSize: '1.25rem', color: s.total === 'Pending' ? 'var(--color-text-muted)' : 'var(--color-primary)' }}>
                        {s.total}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </Card>
    </div>
  );
}
