import React, { useState, useRef } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Upload, Plus, FileText, Video, Link, Trash2, Download } from 'lucide-react';

export default function TeacherUploadMaterials() {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const [materials, setMaterials] = useState([
    { id: 1, name: 'Chapter 5 - Forces & Motion.pdf', type: 'PDF', size: '2.4 MB', date: 'Oct 24, 2026', class: 'Physics 101' },
    { id: 2, name: 'Lab Experiment Guide.pdf', type: 'PDF', size: '1.1 MB', date: 'Oct 20, 2026', class: 'Advanced Physics' },
    { id: 3, name: 'Introduction to Newton Laws (Video).mp4', type: 'Video', size: '145 MB', date: 'Oct 18, 2026', class: 'Physics 101' },
  ]);

  const handleAddLink = () => {
      const link = window.prompt("Enter resource URL:");
      if(link) setMaterials(prev => [{ id: Date.now(), name: link, type: 'Link', size: '-', date: new Date().toLocaleDateString(), class: 'General' }, ...prev]);
  };

  const processUpload = (file) => {
      if(!file) return;
      setMaterials(prev => [{ id: Date.now(), name: file.name, type: file.type || 'File', size: (file.size / 1024 / 1024).toFixed(2) + ' MB', date: new Date().toLocaleDateString(), class: 'General' }, ...prev]);
  };

  const handleDrop = (e) => {
      e.preventDefault();
      setDragOver(false);
      if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          processUpload(e.dataTransfer.files[0]);
      }
  };

  const handleDownload = (material) => {
      const element = document.createElement("a");
      const file = new Blob([`Mock content for ${material.name}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = material.name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Upload Materials</h1>
        <Button variant="primary" onClick={handleAddLink}><Plus size={18} style={{ marginRight: 8 }} /> Add Link Resource</Button>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '4rem 2rem',
          textAlign: 'center',
          background: dragOver ? 'var(--color-primary-light)' : 'var(--color-surface)',
          transition: 'all 0.3s',
          cursor: 'pointer',
          marginBottom: '2rem',
        }}
      >
        <div style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Upload size={32} />
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>Drag & drop files here</h3>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Support for PDF, DOCX, PPTX, MP4, and more. Max 500MB per file.</p>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => processUpload(e.target.files[0])} />
        <Button variant="outline" onClick={() => fileInputRef.current.click()}>Browse Files</Button>
      </div>

      {/* Uploaded Materials */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Uploaded Materials</h3>
          <select style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }}>
            <option>All Classes</option>
            <option>Physics 101</option>
            <option>Advanced Physics</option>
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>File Name</th>
              <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Type</th>
              <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Class</th>
              <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '1.25rem 1.5rem', fontWeight: '600', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1.5rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.type === 'Video' ? <Video size={20} color="var(--color-primary)" /> : m.type === 'Link' ? <Link size={20} color="var(--color-primary)" /> : <FileText size={20} color="var(--color-primary)" />}
                  {m.name}
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <span style={{ background: 'var(--color-bg)', padding: '0.25rem 0.75rem', borderRadius: '1rem', border: '1px solid var(--color-border)', fontSize: '0.75rem' }}>{m.type}</span>
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>{m.class}</td>
                <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>{m.date}</td>
                <td style={{ padding: '1.5rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => handleDownload(m)} style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-muted)' }}><Download size={16}/></button>
                  <button onClick={() => setMaterials(prev => prev.filter(x => x.id !== m.id))} style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-danger)' }}><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
