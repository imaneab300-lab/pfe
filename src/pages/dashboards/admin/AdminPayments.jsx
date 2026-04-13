import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useToast } from '../../../components/ui/Toast';
import { Download, TrendingUp, TrendingDown, Filter } from 'lucide-react';

export default function AdminPayments() {
  const { success } = useToast();
  
  const [filterMode, setFilterMode] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const allTransactions = [
    { id: 'TRX-99381', name: 'Alex Johnson', date: '2026-10-24', displayDate: 'Oct 24, 2026', amount: '$2,450.00', status: 'Completed' },
    { id: 'TRX-99382', name: 'Mia Johnson', date: '2026-10-23', displayDate: 'Oct 23, 2026', amount: '$2,100.00', status: 'Completed' },
    { id: 'TRX-99383', name: 'Emily Davis', date: '2026-10-23', displayDate: 'Oct 23, 2026', amount: '$450.00', status: 'Failed' },
    { id: 'TRX-99384', name: 'Michael Smith', date: '2026-10-22', displayDate: 'Oct 22, 2026', amount: '$2,450.00', status: 'Pending' },
  ];

  const filteredTransactions = allTransactions.filter(tx => {
    if (!dateRange.from && !dateRange.to) return true;
    const txDate = new Date(tx.date).getTime();
    const fromDate = dateRange.from ? new Date(dateRange.from).getTime() : 0;
    const toDate = dateRange.to ? new Date(dateRange.to).getTime() : Infinity;
    return txDate >= fromDate && txDate <= toDate;
  });

  const handleExport = () => {
    const textData = "Transaction ID,Student,Date,Amount,Status\n" + 
      filteredTransactions.map(t => `${t.id},${t.name},${t.date},${t.amount},${t.status}`).join("\n");
      
    const element = document.createElement("a");
    const file = new Blob([textData], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = "Finance_Report_Export.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
    
    success("Report generated and downloaded successfully.");
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Payment Gateway & Finance</h1>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download size={18} style={{ marginRight: 8 }} /> Export Report
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Total Revenue (MTD)</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>$124,500</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: '500' }}>
                <TrendingUp size={16}/> +12.5% from last month
            </div>
        </Card>
        <Card>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Pending Dues</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>$45,200</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-danger)', fontSize: '0.875rem', fontWeight: '500' }}>
                <TrendingDown size={16}/> Action required for 32 accounts
            </div>
        </Card>
        <Card>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Successful Transactions</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>1,245</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success)', fontSize: '0.875rem', fontWeight: '500' }}>
                <TrendingUp size={16}/> 98% success rate
            </div>
        </Card>
      </div>

      <Card style={{ padding: 0 }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ margin: 0 }}>Recent Transactions</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {filterMode && (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input type="date" value={dateRange.from} onChange={e => setDateRange({...dateRange, from: e.target.value})} style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                        <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                        <input type="date" value={dateRange.to} onChange={e => setDateRange({...dateRange, to: e.target.value})} style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }} />
                        <Button variant="outline" size="sm" onClick={() => { setDateRange({ from: '', to: '' }); setFilterMode(false); }}>Clear</Button>
                    </div>
                )}
                <Button variant="outline" size="sm" onClick={() => setFilterMode(!filterMode)}>
                    <Filter size={16} style={{ marginRight: 8 }}/> Filter Records
                </Button>
            </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
            <tr style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Transaction ID</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Student / Family</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Date</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Amount</th>
                <th style={{ padding: '1.5rem', fontWeight: '600' }}>Status</th>
            </tr>
            </thead>
            <tbody>
            {filteredTransactions.length === 0 ? (
                <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No transactions within this date range.</td>
                </tr>
            ) : filteredTransactions.map((tx, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>{tx.id}</td>
                <td style={{ padding: '1.5rem', fontWeight: '500' }}>{tx.name}</td>
                <td style={{ padding: '1.5rem', color: 'var(--color-text-muted)' }}>{tx.displayDate}</td>
                <td style={{ padding: '1.5rem', fontWeight: '600' }}>{tx.amount}</td>
                <td style={{ padding: '1.5rem' }}>
                    <span style={{ 
                    padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600',
                    background: tx.status === 'Completed' ? 'var(--color-success)20' : (tx.status === 'Pending' ? 'var(--color-warning)20' : 'var(--color-danger)20'),
                    color: tx.status === 'Completed' ? 'var(--color-success)' : (tx.status === 'Pending' ? 'var(--color-warning)' : 'var(--color-danger)'),
                    }}>
                    {tx.status}
                    </span>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </Card>
    </div>
  );
}
