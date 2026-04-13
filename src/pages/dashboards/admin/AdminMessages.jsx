import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../../../store/adminSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Search, Send, Image, Paperclip } from 'lucide-react';

export default function AdminMessages() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.admin.contacts);
  const messagesStore = useSelector(state => state.admin.messages);

  const [activeChat, setActiveChat] = useState('SJ');
  const [inputText, setInputText] = useState('');

  const activeContact = contacts.find(c => c.id === activeChat) || contacts[0];
  const activeMessages = messagesStore[activeChat] || [];

  const handleSend = () => {
    if (!inputText.trim()) return;
    dispatch(sendMessage({
      contactId: activeChat,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me'
    }));
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Internal Messaging</h1>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 3fr', gap: '1.5rem', overflow: 'hidden' }}>
        {/* Contacts Sidebar */}
        <Card style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: 12, top: 10, color: 'var(--color-text-muted)' }} />
                    <input type="text" placeholder="Search contacts..." style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '2rem', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg)' }} />
                </div>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
                {contacts.map((contact) => (
                    <div 
                        key={contact.id} 
                        onClick={() => setActiveChat(contact.id)}
                        style={{ 
                            padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '1rem', cursor: 'pointer',
                            background: activeChat === contact.id ? 'var(--color-bg)' : 'transparent',
                            transition: 'background 0.2s'
                        }}
                    >
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            {contact.id}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: contact.unread ? '600' : '500', color: 'var(--color-text-main)' }}>{contact.name}</span>
                                <span style={{ fontSize: '0.75rem', color: contact.unread ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{contact.time}</span>
                            </div>
                            <div style={{ fontSize: '0.875rem', color: contact.unread ? 'var(--color-text-main)' : 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {contact.lastMsg}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>

        {/* Chat Area */}
        <Card style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {activeContact.id}
                </div>
                <div>
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{activeContact.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{activeContact.role} • Online</span>
                </div>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--color-bg)' }}>
                <AnimatePresence>
                  {activeMessages.map((msg) => (
                    <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                        style={{ alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}
                    >
                        {msg.sender === 'me' ? (
                            <div style={{ background: 'var(--color-primary)', padding: '1rem', borderRadius: '1rem', borderBottomRightRadius: 0, boxShadow: 'var(--shadow-sm)', color: '#fff' }}>
                                {msg.text}
                            </div>
                        ) : (
                            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '1rem', borderBottomLeftRadius: 0, boxShadow: 'var(--shadow-sm)', color: 'var(--color-text-main)' }}>
                                {msg.text}
                            </div>
                        )}
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
                            {msg.time}
                        </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
            </div>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--color-surface)' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Paperclip size={20}/></button>
                <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}><Image size={20}/></button>
                <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '2rem', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg)', color: 'var(--color-text-main)' }} 
                />
                <Button variant="primary" style={{ padding: '0.75rem', borderRadius: '50%' }} onClick={handleSend}>
                    <Send size={18} />
                </Button>
            </div>
        </Card>
      </div>
    </div>
  );
}
