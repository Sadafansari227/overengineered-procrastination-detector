import React, { useState } from 'react';
import type { Incident } from '../types';
import { Search, Download, Trash2, AlertTriangle, Plus } from 'lucide-react';

interface IncidentsViewProps {
  incidents: Incident[];
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  onExport: (format: 'json' | 'csv') => void;
  onCreate: (incident: Omit<Incident, 'id' | 'timestamp'>) => void;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({
  incidents,
  onResolve,
  onDelete,
  onClear,
  onExport,
  onCreate,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newIncident, setNewIncident] = useState({
    category: '',
    severity: 'MEDIUM' as Incident['severity'],
    description: '',
  });

  const filteredIncidents = incidents.filter((incident) => {
    const matchesFilter = filter === 'ALL' || incident.status === filter;
    const matchesSearch =
      searchTerm === '' ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.category || !newIncident.description) return;
    
    onCreate({
      ...newIncident,
      status: 'PENDING',
      penalty: 'Document and resolve',
    });
    
    setNewIncident({ category: '', severity: 'MEDIUM', description: '' });
    setShowCreateForm(false);
  };

  const getSeverityBadge = (severity: Incident['severity']) => {
    switch (severity) {
      case 'LOW':
        return 'badge-success';
      case 'MEDIUM':
        return 'badge-warning';
      case 'HIGH':
        return 'badge-warning';
      case 'CRITICAL':
        return 'badge-critical';
      default:
        return 'badge-info';
    }
  };

  const getStatusBadge = (status: Incident['status']) => {
    switch (status) {
      case 'PENDING':
        return 'badge-warning';
      case 'RESOLVED':
        return 'badge-success';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--color-neon-green)] font-mono uppercase tracking-wider">
            INCIDENT_REGISTRY
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono mt-1">
            Manage procrastination incidents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[var(--color-amber)]" />
          <span className="text-xs text-[var(--color-amber)] font-mono">
            {incidents.length} INCIDENTS
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="panel p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="grep 'incident' ..."
              className="input w-full pl-10"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowCreateForm(!showCreateForm)} className="btn btn-primary">
              <Plus className="w-4 h-4" />
              CREATE
            </button>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'ALL' | 'PENDING' | 'RESOLVED')}
              className="input"
            >
              <option value="ALL">ALL_STATUS</option>
              <option value="PENDING">PENDING</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
            <button onClick={() => onExport('json')} className="btn btn-secondary">
              <Download className="w-4 h-4" />
              EXPORT
            </button>
            <button onClick={onClear} className="btn btn-danger">
              <Trash2 className="w-4 h-4" />
              CLEAR
            </button>
          </div>
        </div>
      </div>

      {/* Create Incident Form */}
      {showCreateForm && (
        <div className="panel p-4 animate-slide-in">
          <h3 className="text-xs font-semibold text-[var(--color-neon-green)] font-mono uppercase tracking-wider mb-4">
            CREATE_NEW_INCIDENT
          </h3>
          <form onSubmit={handleCreateIncident} className="space-y-4">
            <div>
              <label className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono block">
                CATEGORY
              </label>
              <input
                type="text"
                value={newIncident.category}
                onChange={(e) => setNewIncident({ ...newIncident, category: e.target.value })}
                placeholder="e.g., SOCIAL_MEDIA, FATIGUE, TASK_AVOIDANCE"
                className="input w-full"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono block">
                SEVERITY
              </label>
              <select
                value={newIncident.severity}
                onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value as Incident['severity'] })}
                className="input w-full"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono block">
                DESCRIPTION
              </label>
              <textarea
                value={newIncident.description}
                onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                placeholder="Describe the incident..."
                rows={3}
                className="input w-full resize-none"
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">
                RECORD_INCIDENT
              </button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="btn btn-secondary">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Incident Table */}
      <div className="panel overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>INCIDENT_ID</th>
              <th>CATEGORY</th>
              <th>SEVERITY</th>
              <th>TIMESTAMP</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-[var(--color-text-secondary)] font-mono text-xs">
                  // NO INCIDENTS RECORDED
                </td>
              </tr>
            ) : (
              filteredIncidents.map((incident) => (
                <tr key={incident.id}>
                  <td className="font-mono text-xs">{incident.id}</td>
                  <td>{incident.category}</td>
                  <td>
                    <span className={`badge ${getSeverityBadge(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="font-mono text-xs">{incident.timestamp}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {incident.status === 'PENDING' && (
                        <button
                          onClick={() => onResolve(incident.id)}
                          className="text-xs text-[var(--color-neon-green)] font-mono hover:underline"
                        >
                          RESOLVE
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(incident.id)}
                        className="text-xs text-[var(--color-critical)] font-mono hover:underline"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="panel p-4">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            TOTAL_INCIDENTS
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            {incidents.length}
          </div>
        </div>
        <div className="panel p-4">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            PENDING
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-amber)]">
            {incidents.filter((i) => i.status === 'PENDING').length}
          </div>
        </div>
        <div className="panel p-4">
          <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 font-mono">
            RESOLVED
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-neon-green)]">
            {incidents.filter((i) => i.status === 'RESOLVED').length}
          </div>
        </div>
      </div>
    </div>
  );
};
