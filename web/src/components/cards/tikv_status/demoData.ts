/**
 * Demo data for the TiKV status card.
 * TiKV is a distributed transactional key-value database.
 */

export interface TikvStore {
  id: string
  address: string
  state: 'up' | 'offline' | 'tombstone'
  capacity: string
  available: string
  regionCount: number
}

export interface TikvDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  pdPods: { ready: number; total: number }
  tikvPods: { ready: number; total: number }
  totalStores: number
  totalRegions: number
  totalCapacity: string
  usedCapacity: string
  stores: TikvStore[]
  lastCheckTime: string
}

export const TIKV_DEMO_DATA: TikvDemoData = {
  health: 'healthy',
  pdPods: { ready: 3, total: 3 },
  tikvPods: { ready: 5, total: 5 },
  totalStores: 5,
  totalRegions: 2456,
  totalCapacity: '5 TB',
  usedCapacity: '2.3 TB',
  stores: [
    {
      id: 'store-1',
      address: 'tikv-0.tikv-peer:20160',
      state: 'up',
      capacity: '1 TB',
      available: '540 GB',
      regionCount: 512,
    },
    {
      id: 'store-2',
      address: 'tikv-1.tikv-peer:20160',
      state: 'up',
      capacity: '1 TB',
      available: '480 GB',
      regionCount: 498,
    },
    {
      id: 'store-3',
      address: 'tikv-2.tikv-peer:20160',
      state: 'up',
      capacity: '1 TB',
      available: '520 GB',
      regionCount: 486,
    },
    {
      id: 'store-4',
      address: 'tikv-3.tikv-peer:20160',
      state: 'up',
      capacity: '1 TB',
      available: '500 GB',
      regionCount: 480,
    },
  ],
  lastCheckTime: new Date(Date.now() - 30000).toISOString(),
}
