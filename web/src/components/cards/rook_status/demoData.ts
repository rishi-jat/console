/**
 * Demo data for the Rook status card.
 * Rook is a storage orchestrator for Kubernetes with Ceph support.
 */

export interface RookOSD {
  id: number
  host: string
  status: 'up' | 'down'
  capacity: string
  used: string
}

export interface RookDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  operatorPods: { ready: number; total: number }
  monPods: { ready: number; total: number }
  totalOSDs: number
  healthyOSDs: number
  totalCapacity: string
  usedCapacity: string
  pools: number
  osds: RookOSD[]
  lastCheckTime: string
}

export const ROOK_DEMO_DATA: RookDemoData = {
  health: 'healthy',
  operatorPods: { ready: 1, total: 1 },
  monPods: { ready: 3, total: 3 },
  totalOSDs: 6,
  healthyOSDs: 6,
  totalCapacity: '12 TB',
  usedCapacity: '4.8 TB',
  pools: 3,
  osds: [
    {
      id: 0,
      host: 'node-1',
      status: 'up',
      capacity: '2 TB',
      used: '800 GB',
    },
    {
      id: 1,
      host: 'node-1',
      status: 'up',
      capacity: '2 TB',
      used: '750 GB',
    },
    {
      id: 2,
      host: 'node-2',
      status: 'up',
      capacity: '2 TB',
      used: '820 GB',
    },
    {
      id: 3,
      host: 'node-2',
      status: 'up',
      capacity: '2 TB',
      used: '790 GB',
    },
  ],
  lastCheckTime: new Date(Date.now() - 40000).toISOString(),
}
