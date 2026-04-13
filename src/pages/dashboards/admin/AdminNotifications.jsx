import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markAllNotificationsRead } from '../../../store/adminSlice';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Bell, AlertCircle, CheckCircle, Info, Calendar } from 'lucide-react';

export default function AdminNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.admin.notifications);

  const getIcon = (type) => {
    switch(type) {
        case 'system': return <Info size={24} color="var(--color-primary)" />;
        case 'alert': return <AlertCircle size={24} color="var(--color-warning)" />;
        case 'success': return <CheckCircle size={24} color="var(--color-success)" />;
        case 'event': return <Calendar size={24} color="var(--color-secondary)" />;
        default: return <Bell size={24} color="var(--color-text-muted)" />;
    }
  };

  const handleMarkAllRead = () => {
    dispatch(markAllNotificationsRead());
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Notifications Array</h1>
        <Button variant="outline" onClick={handleMarkAllRead}>Mark All as Read</Button>
      </div>

      <Card style={{ padding: 0 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {notifications.map((notif, idx) => (
                <li key={idx} style={{ 
                    padding: '1.5rem', 
                    borderBottom: '1px solid var(--color-border)', 
                    display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
                    background: notif.unread ? 'var(--color-primary-light)' : 'transparent',
                    transition: 'background 0.2s'
                }}>
                    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                        {getIcon(notif.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-text-main)' }}>{notif.title}</h3>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{notif.date}</span>
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>{notif.desc}</p>
                    </div>
                    {notif.unread && (
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)', marginTop: '0.5rem' }}></div>
                    )}
                </li>
            ))}
        </ul>
      </Card>
    </div>
  );
}
