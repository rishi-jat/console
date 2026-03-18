/**
 * Demo data for the Cortex status card.
 * Cortex provides horizontally scalable Prometheus-compatible metrics storage.
 */

export interface CortexIngester {
  id: string
  state: 'active' | 'leaving' | 'pending' | 'joining'
  zone: string
  tokens: number
}

export interface CortexDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  distributorPods: { ready: number; total: number }
  ingesterPods: { ready: number; total: number }
  queryPods: { ready: number; total: number }
  totalSeries: number
  samplesPerSecond: number
  queriesPerSecond: number
  ingesters: CortexIngester[]
  lastCheckTime: string
}

export const CORTEX_DEMO_DATA: CortexDemoData = {
  health: 'healthy',
  distributorPods: { ready: 3, total: 3 },
  ingesterPods: { ready: 6, total: 6 },
  queryPods: { ready: 2, total: 2 },
  totalSeries: 2450000,
  samplesPerSecond: 125000,
  queriesPerSecond: 450,
  ingesters: [
    {
      id: 'ingester-0',
      state: 'active',
      zone: 'zone-a',
      tokens: 512,
    },
    {
      id: 'ingester-1',
      state: 'active',
      zone: 'zone-a',
      tokens: 512,
    },
    {
      id: 'ingester-2',
      state: 'active',
      zone: 'zone-b',
      tokens: 512,
    },
    {
      id: 'ingester-3',
      state: 'joining',
      zone: 'zone-b',
      tokens: 256,
    },
  ],
  lastCheckTime: new Date(Date.now() - 20000).toISOString(),
}
