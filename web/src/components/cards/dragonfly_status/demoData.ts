/**
 * Demo data for the Dragonfly status card.
 * Dragonfly provides P2P-based image and file distribution.
 */

export interface DragonflyPeer {
  id: string
  hostname: string
  status: 'running' | 'disconnected'
  downloadTasks: number
  uploadSpeed: string
}

export interface DragonflyDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  managerPods: { ready: number; total: number }
  schedulerPods: { ready: number; total: number }
  seedPeers: number
  totalPeers: number
  activeTasks: number
  bandwidthSaved: string
  peers: DragonflyPeer[]
  lastCheckTime: string
}

export const DRAGONFLY_DEMO_DATA: DragonflyDemoData = {
  health: 'healthy',
  managerPods: { ready: 1, total: 1 },
  schedulerPods: { ready: 3, total: 3 },
  seedPeers: 3,
  totalPeers: 24,
  activeTasks: 156,
  bandwidthSaved: '2.4 TB',
  peers: [
    {
      id: 'peer-001',
      hostname: 'node-1',
      status: 'running',
      downloadTasks: 12,
      uploadSpeed: '450 MB/s',
    },
    {
      id: 'peer-002',
      hostname: 'node-2',
      status: 'running',
      downloadTasks: 8,
      uploadSpeed: '380 MB/s',
    },
    {
      id: 'peer-003',
      hostname: 'node-3',
      status: 'running',
      downloadTasks: 15,
      uploadSpeed: '520 MB/s',
    },
    {
      id: 'peer-004',
      hostname: 'node-4',
      status: 'disconnected',
      downloadTasks: 0,
      uploadSpeed: '0 MB/s',
    },
  ],
  lastCheckTime: new Date(Date.now() - 25000).toISOString(),
}
