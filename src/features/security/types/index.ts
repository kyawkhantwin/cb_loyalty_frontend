export type AlertSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface SecurityAlert {
  id: string;
  type: string;
  severity: AlertSeverity;
  memberId?: string;
  description: string;
  timestamp: string;
}

export interface SystemHealth {
  status: 'Operational' | 'Degraded' | 'Down';
  latency: number;
  uptime: number;
}
