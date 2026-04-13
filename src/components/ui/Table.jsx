import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, Download } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Table({ 
  columns, 
  data, 
  searchable = true, 
  searchPlaceholder = "Search...",
  filterable = false,
  exportable = false,
  pagination = true,
  itemsPerPage = 10,
  onRowClick,
  emptyMessage = "No data available" 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting Logic
  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
        const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Searching Logic
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;
    
    return sortedData.filter(item => {
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [sortedData, searchTerm]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pagination ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : filteredData;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const requestSort = (key, sortable = true) => {
    if (!sortable) return;
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    // Simple CSV export simulation
    console.log("Exporting data...", filteredData);
    alert("Exporting CSV (Simulation)");
  };

  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      {/* Toolbar */}
      {(searchable || filterable || exportable) && (
        <div style={{ 
          padding: '1.25rem 1.5rem', 
          borderBottom: '1px solid var(--color-border)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'var(--color-surface)'
        }}>
          {searchable && (
            <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '400px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%', padding: '0.625rem 1rem 0.625rem 2.75rem',
                  borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-2)', fontSize: '0.875rem',
                  outline: 'none', transition: 'all var(--transition-fast)'
                }}
                onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(79, 70, 229, 0.2)'}
                onBlur={e => e.target.style.boxShadow = 'none'}
              />
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {filterable && (
              <Button variant="outline" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={16} /> Filters
              </Button>
            )}
            {exportable && (
              <Button variant="outline" size="sm" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={16} /> Export
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-2)', borderBottom: '1px solid var(--color-border)' }}>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  onClick={() => requestSort(col.key, col.sortable)}
                  style={{ 
                    padding: '1rem 1.5rem', 
                    fontWeight: '600', 
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-text-muted)',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                    userSelect: 'none',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={e => { if (col.sortable !== false) e.currentTarget.style.background = 'var(--color-border)'}}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: col.align || 'flex-start' }}>
                    {col.label}
                    {col.sortable !== false && sortConfig?.key === col.key && (
                      <span style={{ color: 'var(--color-primary)' }}>
                        {sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {currentItems.length > 0 ? (
                currentItems.map((row, rowIdx) => (
                  <motion.tr 
                    key={row.id || rowIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: rowIdx * 0.02 }}
                    onClick={() => onRowClick && onRowClick(row)}
                    style={{ 
                      borderBottom: '1px solid var(--color-border)',
                      cursor: onRowClick ? 'pointer' : 'default',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = 'var(--color-bg-2)'}}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-main)', textAlign: col.align || 'left' }}>
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      <Search size={40} style={{ opacity: 0.2 }} />
                      <p>{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div style={{ 
          padding: '1rem 1.5rem', 
          borderTop: '1px solid var(--color-border)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'var(--color-surface)',
          flexWrap: 'wrap', gap: '1rem'
        }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.375rem', borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: currentPage === 1 ? 'var(--color-text-subtle)' : 'var(--color-text-main)',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                background: 'transparent', transition: 'background var(--transition-fast)'
              }}
              onMouseEnter={e => { if (currentPage !== 1) e.currentTarget.style.background = 'var(--color-bg-2)'}}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              // Simple pagination logic to limit visible pages
              if (
                idx === 0 || 
                idx === totalPages - 1 || 
                (idx >= currentPage - 2 && idx <= currentPage)
              ) {
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    style={{
                      width: '32px', height: '32px', borderRadius: 'var(--radius-md)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.875rem', fontWeight: currentPage === idx + 1 ? '600' : '500',
                      background: currentPage === idx + 1 ? 'var(--color-primary-light)' : 'transparent',
                      color: currentPage === idx + 1 ? 'var(--color-primary)' : 'var(--color-text-main)',
                      cursor: 'pointer', transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={e => { if (currentPage !== idx + 1) e.currentTarget.style.background = 'var(--color-bg-2)'}}
                    onMouseLeave={e => { if (currentPage !== idx + 1) e.currentTarget.style.background = 'transparent'}}
                  >
                    {idx + 1}
                  </button>
                );
              } else if (
                idx === 1 && currentPage > 3 ||
                idx === totalPages - 2 && currentPage < totalPages - 2
              ) {
                return <span key={idx} style={{ color: 'var(--color-text-muted)', padding: '0 0.25rem' }}>...</span>;
              }
              return null;
            })}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.375rem', borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: currentPage === totalPages ? 'var(--color-text-subtle)' : 'var(--color-text-main)',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                background: 'transparent', transition: 'background var(--transition-fast)'
              }}
              onMouseEnter={e => { if (currentPage !== totalPages) e.currentTarget.style.background = 'var(--color-bg-2)'}}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
