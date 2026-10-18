import React, { useState } from 'react';
import type { Incident } from '../types';

interface IncidentDatabaseProps {
  incidents: Incident[];
  onResolve: (id: string) => void;
  onClear: () => void;
  onExport: (format: 'json' | 'csv') => void;
}

export const IncidentDatabase: React.FC<IncidentDatabaseProps> = ({
  incidents,
  onResolve,
  onClear,
  onExport,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIncidents = incidents.filter((incident) => {
    const matchesFilter = filter === 'ALL' || incident.status === filter;
    const matchesSearch = searchTerm === '' || 
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSeverityColor = (severity: Incident['severity']) => {
    switch (severity) {
      case 'LOW': return 'text-cyber-green';
      case 'MEDIUM': return 'text-cyber-amber';
      case 'HIGH': return 'text-cyber-red';
      case 'CRITICAL': return 'text-cyber-red font-bold';
      default: return 'text-gray-500';
    }
  };

  const getStatusColor = (status: Incident['status']) => {
    switch (status) {
      case 'PENDING': return 'text-cyber-amber';
      case 'RESOLVED': return 'text-cyber-green';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-cyber-panel border border-gray-700 rounded-lg p-6">
      <h2 className="text-xl font-bold text-cyber-cyan mb-2">
        PROCRASTINATION CRIMINAL DATABASE
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Fictional incident registry for humorous tracking purposes only.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search incidents..."
          className="flex-1 bg-cyber-dark border border-gray-600 rounded px-4 py-2 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-cyber-cyan font-mono text-sm"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'ALL' | 'PENDING' | 'RESOLVED')}
          className="bg-cyber-dark border border-gray-600 rounded px-4 py-2 text-gray-200 focus:outline-none focus:border-cyber-cyan font-mono text-sm"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto mb-6">
        {filteredIncidents.length === 0 ? (
          <div className="text-gray-600 text-center py-8">
            No incidents recorded. The system is disappointed by your compliance.
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-cyber-dark border border-gray-700 rounded-lg p-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gray-500 font-mono">{incident.id}</span>
                    <span className={`text-xs font-mono ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`text-xs font-mono ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  <div className="text-sm text-cyber-amber font-bold mb-1">
                    {incident.category}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    {incident.description}
                  </div>
                  <div className="text-xs text-cyber-green font-mono">
                    PENALTY: {incident.penalty}
                  </div>
                </div>
                {incident.status === 'PENDING' && (
                  <button
                    onClick={() => onResolve(incident.id)}
                    className="px-3 py-1 bg-cyber-green/20 border border-cyber-green text-cyber-green rounded hover:bg-cyber-green/30 transition-colors font-mono text-xs"
                  >
                    MARK RESOLVED
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onExport('json')}
          className="px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan/30 transition-colors font-mono text-sm"
        >
          EXPORT JSON
        </button>
        <button
          onClick={() => onExport('csv')}
          className="px-4 py-2 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded hover:bg-cyber-cyan/30 transition-colors font-mono text-sm"
        >
          EXPORT CSV
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-cyber-red/20 border border-cyber-red text-cyber-red rounded hover:bg-cyber-red/30 transition-colors font-mono text-sm"
        >
          CLEAR HISTORY
        </button>
      </div>
    </div>
  );
};
