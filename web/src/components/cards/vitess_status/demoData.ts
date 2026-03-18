/**
 * Demo data for the Vitess status card.
 * Vitess is a database clustering system for horizontal scaling of MySQL.
 */

export interface VitessTablet {
  alias: string
  keyspace: string
  shard: string
  type: 'primary' | 'replica' | 'rdonly'
  state: 'serving' | 'not_serving' | 'spare'
}

export interface VitessDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  vtgatePods: { ready: number; total: number }
  vtctldPods: { ready: number; total: number }
  totalKeyspaces: number
  totalShards: number
  totalTablets: number
  qps: number
  tablets: VitessTablet[]
  lastCheckTime: string
}

export const VITESS_DEMO_DATA: VitessDemoData = {
  health: 'healthy',
  vtgatePods: { ready: 3, total: 3 },
  vtctldPods: { ready: 2, total: 2 },
  totalKeyspaces: 4,
  totalShards: 16,
  totalTablets: 48,
  qps: 45000,
  tablets: [
    {
      alias: 'zone1-100',
      keyspace: 'commerce',
      shard: '-80',
      type: 'primary',
      state: 'serving',
    },
    {
      alias: 'zone1-101',
      keyspace: 'commerce',
      shard: '-80',
      type: 'replica',
      state: 'serving',
    },
    {
      alias: 'zone1-200',
      keyspace: 'commerce',
      shard: '80-',
      type: 'primary',
      state: 'serving',
    },
    {
      alias: 'zone1-300',
      keyspace: 'customer',
      shard: '0',
      type: 'primary',
      state: 'serving',
    },
  ],
  lastCheckTime: new Date(Date.now() - 25000).toISOString(),
}
