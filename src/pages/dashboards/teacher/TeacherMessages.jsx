import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { Search, Send, Paperclip, Image, Plus, User, MoreVertical, Phone, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../../components/ui/Toast';

export default function TeacherMessages() {
  const { success } = useToast();
  const [activeChat, setActiveChat] = useState('ad');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const [contacts, setContacts] = useState([
    { id: 'ad', name: 'Administration', role: 'School Admin', initials: 'AD', lastMsg: 'Please review the updated syllabus.', time: '10:30 AM', unread: true, online: true },
    { id: 'aj', name: 'Alex Johnson (Parent)', role: 'Parent', initials: 'AJ', lastMsg: 'Thank you for the update!', time: 'Yesterday', unread: false, online: false },
    { id: 'ep', name: 'Emily Parker', role: 'Colleague', initials: 'EP', lastMsg: 'Are you available for a meeting?', time: 'Monday', unread: false, online: true },
    { id: 'ss', name: 'Sarah Smith', role: 'Student', initials: 'SS', lastMsg: 'I have a question about the homework.', time: 'Oct 20', unread: false, online: false },
  ]);

  const [messages, setMessages] = useState({
    'ad': [
        { id: 1, text: 'Hi! Please review the semester schedule I sent last week.', time: '10:10 AM', isMine: false },
        { id: 2, text: 'Sure, I have reviewed it. Tuesday evenings work best.', time: '10:25 AM', isMine: true },
        { id: 3, text: 'Please review the updated syllabus.', time: '10:30 AM', isMine: false },
    ],
    'aj': [
        { id: 1, text: 'Hello, how is Alex doing in Physics?', time: 'Yesterday', isMine: false },
        { id: 2, text: 'He is doing great! Keep it up.', time: 'Yesterday', isMine: true },
    ],
    'ep': [],
    'ss': []
  });

  const activeContact = contacts.find(c => c.id === activeChat);
  const currentMessages = messages[activeChat] || [];

  const handleSendMessage = () => {
      if(!newMessage.trim()) return;
      const msg = { 
          id: Date.now(), 
          text: newMessage, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          isMine: true 
      };
      setMessages(prev => ({
          ...prev,
          [activeChat]: [...(prev[activeChat] || []), msg]
      }));
      setNewMessage('');
      
      // Update last message in contacts
      setContacts(prev => prev.map(c => c.id === activeChat ? { ...c, lastMsg: newMessage, time: 'Now' } : c));
  };

  const startNewChat = (contact) => {
      if (!contacts.find(c => c.id === contact.id)) {
          setContacts(prev => [contact, ...prev]);
      }
      setActiveChat(contact.id);
      setIsNewChatModalOpen(false);
      success(`Started conversation with ${contact.name}`);
  };

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Messages</h1>
          <Button variant="primary" onClick={() => setIsNewChatModalOpen(true)} style={{ borderRadius: 'var(--radius-lg)' }}>
              <Plus size={18} style={{ marginRight: 8 }} /> New Chat
          </Button>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2.5fr', gap: '1.5rem', overflow: 'hidden' }}>
        <Card style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-muted)' }} />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search conversations..." style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-2)', fontSize: '0.875rem', color: 'var(--color-text-main)' }} />
            </div>
          </div>
          <div className="contacts-list" style={{ flex: 1, overflowY: 'auto' }}>
            {filteredContacts.length > 0 ? filteredContacts.map(c => (
              <div key={c.id} onClick={() => {
                  setActiveChat(c.id);
                  setContacts(prev => prev.map(con => con.id === c.id ? { ...con, unread: false } : con));
              }} style={{
                padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '1rem',
                cursor: 'pointer', background: activeChat === c.id ? 'var(--color-bg-2)' : 'transparent', transition: 'all 0.2s',
                borderLeft: activeChat === c.id ? '4px solid var(--color-primary)' : '4px solid transparent'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', flexShrink: 0, position: 'relative' }}>
                  {c.initials}
                  {c.online && <div style={{ position: 'absolute', bottom: 2, right: 2, width: '12px', height: '12px', background: 'var(--color-success)', border: '2px solid var(--color-surface)', borderRadius: '50%' }}></div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: c.unread ? '800' : '600', fontSize: '0.95rem', color: 'var(--color-text-main)' }}>{c.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: c.unread ? 'var(--color-text-main)' : 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: c.unread ? '600' : '400' }}>{c.lastMsg}</div>
                </div>
                {c.unread && <div style={{ width: '10px', height: '10px', background: 'var(--color-primary)', borderRadius: '50%', flexShrink: 0, marginTop: '6px', boxShadow: '0 0 8px var(--color-primary)' }}></div>}
              </div>
            )) : <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No contacts found</div>}
          </div>
        </Card>

        <Card style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>{activeContact?.initials}</div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0, color: 'var(--color-text-main)' }}>{activeContact?.name}</h3>
                <span style={{ fontSize: '0.75rem', color: activeContact?.online ? 'var(--color-success)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                   <div style={{ width: '6px', height: '6px', background: activeContact?.online ? 'var(--color-success)' : 'var(--color-text-muted)', borderRadius: '50%' }}></div>
                   {activeContact?.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}><Phone size={20}/></button>
                <button style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}><Video size={20}/></button>
                <button style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}><MoreVertical size={20}/></button>
            </div>
          </div>
          <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'var(--color-bg-2)', scrollbarWidth: 'thin' }}>
            {currentMessages.length > 0 ? currentMessages.map(msg => (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  style={{ alignSelf: msg.isMine ? 'flex-end' : 'flex-start', maxWidth: '75%' }}
                >
                  <div style={{ 
                    background: msg.isMine ? 'var(--gradient-primary)' : 'var(--color-surface)', 
                    color: msg.isMine ? 'white' : 'var(--color-text-main)', 
                    padding: '0.875rem 1.25rem', 
                    borderRadius: '1.15rem', 
                    borderBottomRightRadius: msg.isMine ? '0.25rem' : '1.15rem', 
                    borderBottomLeftRadius: msg.isMine ? '1.15rem' : '0.25rem', 
                    boxShadow: 'var(--shadow-sm)',
                    border: msg.isMine ? 'none' : '1px solid var(--color-border)',
                    fontSize: '0.9375rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.375rem', textAlign: msg.isMine ? 'right' : 'left', fontWeight: '600' }}>{msg.time}</div>
                </motion.div>
            )) : <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Start a conversation with {activeContact?.name}</div>}
          </div>
          <div style={{ padding: '1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '0.75rem', alignItems: 'center', background: 'var(--color-surface)' }}>
            <button style={{ background: 'var(--color-bg-2)', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Attach file"><Paperclip size={20}/></button>
            <input 
              type="text" 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
              placeholder="Write your message here..." 
              style={{ 
                flex: 1, padding: '0.875rem 1.5rem', borderRadius: '1.5rem', 
                border: '1.5px solid var(--color-border)', outline: 'none', 
                background: 'var(--color-bg-2)', color: 'var(--color-text-main)',
                fontSize: '0.95rem'
              }} 
            />
            <Button variant="primary" style={{ borderRadius: '50%', width: '48px', height: '48px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px var(--color-primary)40' }} onClick={handleSendMessage}><Send size={20}/></Button>
          </div>
        </Card>
      </div>

      <Modal isOpen={isNewChatModalOpen} onClose={() => setIsNewChatModalOpen(false)} title="Start New Conversation" size="sm">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-muted)' }} />
                  <input placeholder="Search users by name..." style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', outline: 'none' }} />
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                      { id: 'bw', name: 'Bruce Wayne', role: 'Parent', initials: 'BW' },
                      { id: 'ck', name: 'Clark Kent', role: 'Teacher', initials: 'CK' },
                      { id: 'dp', name: 'Diana Prince', role: 'Admin', initials: 'DP' },
                  ].map(u => (
                      <div key={u.id} onClick={() => startNewChat({ ...u, lastMsg: 'Joined the chat', time: 'Now', unread: false, online: true })} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>{u.initials}</div>
                          <div>
                              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{u.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{u.role}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </Modal>

      <style>{`
        .contacts-list::-webkit-scrollbar { width: 4px; }
        .contacts-list::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }
      `}</style>
    </>
  );
}
