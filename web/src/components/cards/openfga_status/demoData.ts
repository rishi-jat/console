/**
 * Demo data for the OpenFGA status card.
 * OpenFGA is a flexible authorization/relationship-based access control system.
 */

export interface OpenFGAStore {
  id: string
  name: string
  models: number
  tuples: number
  status: 'active' | 'inactive'
}

export interface OpenFGADemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  serverPods: { ready: number; total: number }
  totalStores: number
  totalModels: number
  totalTuples: number
  queriesPerSecond: number
  stores: OpenFGAStore[]
  lastCheckTime: string
}

export const OPENFGA_DEMO_DATA: OpenFGADemoData = {
  health: 'healthy',
  serverPods: { ready: 3, total: 3 },
  totalStores: 5,
  totalModels: 12,
  totalTuples: 45678,
  queriesPerSecond: 1250,
  stores: [
    {
      id: 'store-001',
      name: 'production-app',
      models: 4,
      tuples: 25000,
      status: 'active',
    },
    {
      id: 'store-002',
      name: 'staging-app',
      models: 3,
      tuples: 12000,
      status: 'active',
    },
    {
      id: 'store-003',
      name: 'internal-tools',
      models: 2,
      tuples: 5000,
      status: 'active',
    },
    {
      id: 'store-004',
      name: 'legacy-system',
      models: 3,
      tuples: 3678,
      status: 'inactive',
    },
  ],
  lastCheckTime: new Date(Date.now() - 30000).toISOString(),
}
