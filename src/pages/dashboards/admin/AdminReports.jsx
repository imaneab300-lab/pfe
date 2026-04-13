import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../components/ui/Toast';
import { Download, FileText, PieChart, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminReports() {
  const { success } = useToast();

  const reports = [
    { title: 'Academic Performance Q3', type: 'Academic', date: 'Oct 15, 2026', size: '2.4 MB' },
    { title: 'Financial Audit Report', type: 'Finance', date: 'Oct 10, 2026', size: '1.8 MB' },
    { title: 'Student Attendance Summary', type: 'Administrative', date: 'Oct 01, 2026', size: '3.1 MB' },
    { title: 'Staff Evaluation Summary', type: 'HR', date: 'Sep 28, 2026', size: '4.5 MB' },
  ];

  const handleDownload = (title) => {
    // Generate dummy PDF file
    const element = document.createElement("a");
    const file = new Blob([`Dummy PDF Content for ${title}`], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    success(`Successfully downloaded ${title}.`);
  };

  const handleCustomReport = () => {
    success("Generating custom report data. You will be notified when it's ready.");
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Institutional Reports</h1>
        </div>
        <Button variant="primary" onClick={handleCustomReport}>Generate Custom Report</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <button style={{ background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-5px)' } }}>
            <TrendingUp size={32} />
            <h3 style={{ fontSize: '1.25rem' }}>Academic Analytics</h3>
            <p style={{ opacity: 0.8, fontSize: '0.875rem' }}>Generate GPA trends, passing rates, and subject analytics.</p>
        </button>
        <button style={{ background: 'var(--color-success)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s' }}>
            <DollarSign size={32} />
            <h3 style={{ fontSize: '1.25rem' }}>Financial Reports</h3>
            <p style={{ opacity: 0.8, fontSize: '0.875rem' }}>Revenue tracking, pending dues, and ledger summaries.</p>
        </button>
        <button style={{ background: 'var(--color-warning)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s' }}>
            <PieChart size={32} />
            <h3 style={{ fontSize: '1.25rem' }}>Demographic Data</h3>
            <p style={{ opacity: 0.8, fontSize: '0.875rem' }}>Enrollment stats, gender distribution, and geographic data.</p>
        </button>
      </div>

      <Card style={{ padding: 0 }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ margin: 0 }}>Generated Reports Archive</h3>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
            <tr style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Document Name</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Category</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Generated Date</th>
                <th style={{ padding: '1.5rem', fontWeight: '600', textAlign: 'right' }}>Action</th>
            </tr>
            </thead>
            <tbody>
            {reports.map((report, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1.5rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FileText size={20} color="var(--color-primary)" /> {report.title}
                </td>
                <td style={{ padding: '1.5rem' }}>
                    <span style={{ background: 'var(--color-bg)', padding: '0.25rem 0.75rem', borderRadius: '1rem', border: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: '500' }}>{report.type}</span>
                </td>
                <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>{report.date}</td>
                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                    <Button variant="outline" size="sm" onClick={() => handleDownload(report.title)}>
                        <Download size={16} style={{ marginRight: 8 }} /> Download PDF
                    </Button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </Card>
    </div>
  );
}
