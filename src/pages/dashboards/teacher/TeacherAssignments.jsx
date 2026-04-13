import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import { FileText, Plus, CheckCircle, Clock, Trash2, Edit2, ChevronRight, User, GraduationCap, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/ui/Toast';

export default function TeacherAssignments() {
  const navigate = useNavigate();
  const { success } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingSubmissions, setViewingSubmissions] = useState(null);
  
  const [newAssignment, setNewAssignment] = useState({
      title: '', description: '', class: 'Mathematics 10A', subject: 'Algebra', dueDate: '', type: 'File Upload'
  });

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Algebra Weekly Quiz', class: 'Mathematics 10A', subject: 'Algebra', dueDate: '2026-10-25', submitted: 28, total: 32, status: 'Active', description: 'Complete all questions in Section 2.1' },
    { id: 2, title: 'Kinematics Lab Report', class: 'Physics 11B', subject: 'Physics', dueDate: '2026-10-28', submitted: 15, total: 28, status: 'Active', description: 'Detail your observations from the Monday lab.' },
    { id: 3, title: 'Derivatives Worksheet', class: 'Advanced Calculus', subject: 'Calculus', dueDate: '2026-10-20', submitted: 24, total: 24, status: 'Completed', description: 'Exercises 1 through 15.' },
  ]);

  const [submissions, setSubmissions] = useState([
      { id: 1, assignmentId: 1, studentName: 'Alex Johnson', date: 'Oct 23, 2:15 PM', status: 'Graded', grade: '18/20', feedback: 'Great work on the logic!', file: 'quiz_alex.pdf' },
      { id: 2, assignmentId: 1, studentName: 'Mia Johnson', date: 'Oct 23, 4:30 PM', status: 'Pending', grade: '', feedback: '', file: 'quiz_mia.pdf' },
      { id: 3, assignmentId: 1, studentName: 'Michael Smith', date: 'Oct 24, 9:00 AM', status: 'Pending', grade: '', feedback: '', file: 'quiz_mike.pdf' },
  ]);

  const handleCreateAssignment = (e) => {
      e.preventDefault();
      const id = assignments.length + 1;
      setAssignments(prev => [{ ...newAssignment, id, submitted: 0, total: 30, status: 'Active' }, ...prev]);
      setIsModalOpen(false);
      setNewAssignment({ title: '', description: '', class: 'Mathematics 10A', subject: 'Algebra', dueDate: '', type: 'File Upload' });
      success('Assignment created successfully!');
  };

  const handleGradeSubmission = (subId, grade, feedback) => {
      setSubmissions(prev => prev.map(s => s.id === subId ? { ...s, grade, feedback, status: 'Graded' } : s));
      success('Grade submitted!');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Assignments & Grading
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Manage curriculum tasks and grade student submissions.</p>
        </div>
        {!viewingSubmissions ? (
          <Button variant="primary" onClick={() => setIsModalOpen(true)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <Plus size={20} style={{ marginRight: 8 }} /> Create Assignment
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setViewingSubmissions(null)} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)' }}>
            Back to List
          </Button>
        )}
      </div>

      {!viewingSubmissions ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {assignments.map((assignment) => (
            <Card key={assignment.id} style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid var(--color-border)' }} onClick={() => setViewingSubmissions(assignment)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: assignment.status === 'Completed' ? 'var(--color-success-light)' : 'var(--color-primary-light)', color: assignment.status === 'Completed' ? 'var(--color-success)' : 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={24} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', padding: '0.35rem 0.75rem', borderRadius: '2rem', background: assignment.status === 'Completed' ? 'var(--color-success-light)' : 'var(--color-primary-light)', color: assignment.status === 'Completed' ? 'var(--color-success)' : 'var(--color-primary)' }}>
                        {assignment.status}
                    </span>
                </div>
                
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{assignment.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{assignment.description}</p>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        <GraduationCap size={14}/> {assignment.class}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        <Clock size={14}/> {assignment.dueDate}
                    </div>
                </div>

                <div style={{ padding: '1rem', background: 'var(--color-bg-2)', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        <span style={{ fontWeight: '600' }}>Submissions</span>
                        <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{assignment.submitted}/{assignment.total}</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                            style={{ height: '100%', background: 'var(--gradient-primary)' }}
                        />
                    </div>
                </div>
                
                <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.875rem' }}>
                        View Submissions <ChevronRight size={16}/>
                    </div>
                </div>
            </Card>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
            <Card style={{ padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>Student Submissions</h2>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{submissions.filter(s => s.assignmentId === viewingSubmissions.id).length} results</span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--color-bg-2)', color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'left' }}>
                            <th style={{ padding: '1rem 1.5rem' }}>Student</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Grade</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.filter(s => s.assignmentId === viewingSubmissions.id).map(sub => (
                            <tr key={sub.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={16}/></div>
                                        <span style={{ fontWeight: '600' }}>{sub.studentName}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{sub.date}</td>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <span style={{ padding: '0.25rem 0.625rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '700', background: sub.status === 'Graded' ? 'var(--color-success-light)' : 'var(--color-warning-light)', color: sub.status === 'Graded' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                                        {sub.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>{sub.grade || '--'}</td>
                                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                    <Button size="sm" variant="outline" onClick={() => {
                                        const g = window.prompt("Enter Grade (e.g. 18/20):", sub.grade);
                                        const f = window.prompt("Enter Feedback:", sub.feedback);
                                        if(g !== null) handleGradeSubmission(sub.id, g, f);
                                    }}>Grade</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Card>
                    <h3 style={{ marginBottom: '1.25rem' }}>Assignment Info</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Title</div>
                            <div style={{ fontWeight: '600' }}>{viewingSubmissions.title}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Due Date</div>
                            <div style={{ fontWeight: '600', color: 'var(--color-danger)' }}>{viewingSubmissions.dueDate}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Description</div>
                            <div style={{ fontSize: '0.875rem' }}>{viewingSubmissions.description}</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Assignment" size="lg">
          <form onSubmit={handleCreateAssignment} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Assignment Title</label>
                  <input required value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }} placeholder="e.g. Chapter 1 Quiz" />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                  <textarea rows={3} value={newAssignment.description} onChange={e => setNewAssignment({...newAssignment, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }} placeholder="Instructions for students..." />
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Class</label>
                  <select value={newAssignment.class} onChange={e => setNewAssignment({...newAssignment, class: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }}>
                      <option>Mathematics 10A</option>
                      <option>Physics 11B</option>
                      <option>Advanced Calculus</option>
                  </select>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Subject</label>
                  <select value={newAssignment.subject} onChange={e => setNewAssignment({...newAssignment, subject: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }}>
                      <option>Algebra</option>
                      <option>Physics</option>
                      <option>Calculus</option>
                  </select>
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Due Date</label>
                  <input type="date" required value={newAssignment.dueDate} onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }} />
              </div>
              <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Submission Type</label>
                  <select value={newAssignment.type} onChange={e => setNewAssignment({...newAssignment, type: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg-2)', color: 'var(--color-text-main)' }}>
                      <option>File Upload</option>
                      <option>Text Entry</option>
                      <option>External Link</option>
                  </select>
              </div>
              <div style={{ gridColumn: 'span 2', marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">Create Assignment</Button>
              </div>
          </form>
      </Modal>
    </div>
  );
}
