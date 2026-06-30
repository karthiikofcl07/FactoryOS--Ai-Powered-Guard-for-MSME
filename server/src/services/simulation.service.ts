export type MachineStatus = 'running' | 'idle' | 'maintenance' | 'offline' | 'critical';

export interface MachineTelemetry {
  id: string;
  temperature: number;
  vibration: number;
  rpm: number;
  voltage: number;
  current: number;
  power: number;
  runtime: number;
  health: number;
  status: MachineStatus;
}

export function classifyMachineHealth(m: MachineTelemetry) {
  const stress = (m.temperature - 60) * 0.8 + m.vibration * 4 + (100 - m.health) * 0.6;
  if (m.status === 'critical' || stress > 75) return 'Critical';
  if (stress > 55) return 'Maintenance Required';
  if (stress > 35) return 'Warning';
  return 'Healthy';
}
