import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Upload, Shield, Bell, User, CheckCircle } from 'lucide-react';

export default function TeacherProfile() {
  const initialData = {
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'demo@teacher.com',
    phone: '+1 (555) 234-5678',
    subject: 'Physics, Advanced Mathematics',
    bio: 'Physics educator with 12+ years of experience. PhD in Applied Physics from MIT. Passionate about making science accessible and engaging for all students.'
  };

  const [formData, setFormData] = useState(initialData);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
      e.preventDefault();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
  };

  const handleDiscard = () => {
      setFormData(initialData);
  };
  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>My Profile</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', position: 'relative' }}>
              SJ
              <button style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Upload size={14}/>
              </button>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Dr. Sarah Jenkins</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.875rem' }}>Science Department</p>
            <span style={{ marginTop: '1rem', background: 'var(--color-primary)20', color: 'var(--color-primary)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600' }}>Senior Faculty</span>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[{ icon: <User size={18}/>, label: 'Personal Info', active: true }, { icon: <Shield size={18}/>, label: 'Security', active: false }, { icon: <Bell size={18}/>, label: 'Preferences', active: false }].map((item, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', background: item.active ? 'var(--color-bg)' : 'transparent', border: item.active ? '1px solid var(--color-border)' : '1px solid transparent', borderRadius: 'var(--radius-md)', cursor: 'pointer', color: item.active ? 'var(--color-text-main)' : 'var(--color-text-muted)', fontWeight: item.active ? '600' : '500' }}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>

        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
             <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Personal Information</h2>
             {success && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)', fontSize: '0.875rem' }}><CheckCircle size={16}/> Saved</span>}
          </div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" defaultValue="demo@teacher.com" readOnly style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg)', color: 'var(--color-text-muted)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Subject Specialization</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Bio</label>
              <textarea rows={4} name="bio" value={formData.bio} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Button type="button" variant="outline" onClick={handleDiscard}>Discard</Button>
              <Button type="submit" variant="primary">Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
