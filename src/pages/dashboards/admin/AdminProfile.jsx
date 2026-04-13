import React, { useState, useRef } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../components/ui/Toast';
import { User, Shield, Key, Bell, Upload } from 'lucide-react';

export default function AdminProfile() {
  const { success } = useToast();
  const fileInputRef = useRef(null);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [formData, setFormData] = useState({ firstName: 'Principal', lastName: 'Director', phone: '+1 (555) 999-0000', assignment: 'Main Administration Building' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      success("Avatar uploaded and previewed successfully.");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    success("Profile modifications saved successfully.");
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Administrator Profile</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ 
                    width: '120px', height: '120px', borderRadius: '50%', 
                    background: avatarUrl ? 'transparent' : 'var(--color-primary-light)', 
                    backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'var(--color-primary)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', position: 'relative' 
                }}>
                    {!avatarUrl && "AD"}
                    <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current.click()} style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                        <Upload size={16} />
                    </button>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{formData.firstName} {formData.lastName}</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>superadmin@edusaas.com</span>
                <div style={{ marginTop: '1.5rem', width: '100%' }}>
                    <span style={{ display: 'inline-block', background: 'var(--color-primary)20', color: 'var(--color-primary)', padding: '0.25rem 1rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: '600', width: '100%' }}>System Administrator</span>
                </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'left', fontWeight: '500', cursor: 'pointer', color: 'var(--color-text-main)' }}>
                    <User size={18} /> Personal Info
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'transparent', border: '1px solid transparent', borderRadius: 'var(--radius-md)', textAlign: 'left', fontWeight: '500', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                    <Shield size={18} /> Security
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'transparent', border: '1px solid transparent', borderRadius: 'var(--radius-md)', textAlign: 'left', fontWeight: '500', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                    <Bell size={18} /> Notifications
                </button>
            </div>
        </div>

        <Card>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>Personal Information</h2>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>First Name</label>
                        <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Last Name</label>
                        <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg)' }} />
                    </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email Address</label>
                        <input type="email" defaultValue="superadmin@edusaas.com" readOnly style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text-muted)' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Phone Number</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg)' }} />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Campus Building Assignment</label>
                    <select value={formData.assignment} onChange={e => setFormData({...formData, assignment: e.target.value})} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg)' }}>
                        <option>Main Administration Building</option>
                        <option>Science Block</option>
                        <option>West Wing</option>
                    </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <Button variant="outline" type="button" onClick={() => setFormData({ firstName: 'Principal', lastName: 'Director', phone: '+1 (555) 999-0000', assignment: 'Main Administration Building' })}>Discard Changes</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </div>
            </form>
        </Card>
      </div>
    </div>
  );
}
