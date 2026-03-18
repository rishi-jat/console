/**
 * Demo data for the Longhorn status card.
 * Longhorn is a lightweight distributed block storage system for Kubernetes.
 */

export interface LonghornVolume {
  name: string
  size: string
  state: 'attached' | 'detached' | 'degraded'
  replicas: number
  robustness: 'healthy' | 'degraded' | 'faulted'
}

export interface LonghornDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  managerPods: { ready: number; total: number }
  driverPods: { ready: number; total: number }
  totalVolumes: number
  totalCapacity: string
  usedCapacity: string
  schedulableNodes: number
  volumes: LonghornVolume[]
  lastCheckTime: string
}

export const LONGHORN_DEMO_DATA: LonghornDemoData = {
  health: 'healthy',
  managerPods: { ready: 3, total: 3 },
  driverPods: { ready: 3, total: 3 },
  totalVolumes: 24,
  totalCapacity: '2 TB',
  usedCapacity: '1.2 TB',
  schedulableNodes: 5,
  volumes: [
    {
      name: 'pvc-postgres-data',
      size: '100 Gi',
      state: 'attached',
      replicas: 3,
      robustness: 'healthy',
    },
    {
      name: 'pvc-mongodb-data',
      size: '200 Gi',
      state: 'attached',
      replicas: 3,
      robustness: 'healthy',
    },
    {
      name: 'pvc-redis-data',
      size: '50 Gi',
      state: 'attached',
      replicas: 2,
      robustness: 'degraded',
    },
    {
      name: 'pvc-backup-storage',
      size: '500 Gi',
      state: 'detached',
      replicas: 3,
      robustness: 'healthy',
    },
  ],
  lastCheckTime: new Date(Date.now() - 35000).toISOString(),
}
