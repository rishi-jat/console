/**
 * Demo data for the CNI status card.
 * CNI (Container Network Interface) plugins overview.
 */

export interface CniPlugin {
  name: string
  version: string
  type: 'bridge' | 'flannel' | 'calico' | 'weave' | 'cilium' | 'other'
  status: 'active' | 'inactive' | 'error'
  nodes: number
}

export interface CniDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  primaryCni: string
  totalNodes: number
  nodesWithCni: number
  totalPods: number
  networkPolicies: number
  plugins: CniPlugin[]
  lastCheckTime: string
}

export const CNI_DEMO_DATA: CniDemoData = {
  health: 'healthy',
  primaryCni: 'calico',
  totalNodes: 8,
  nodesWithCni: 8,
  totalPods: 456,
  networkPolicies: 32,
  plugins: [
    {
      name: 'calico',
      version: '3.26.1',
      type: 'calico',
      status: 'active',
      nodes: 8,
    },
    {
      name: 'flannel',
      version: '0.22.0',
      type: 'flannel',
      status: 'inactive',
      nodes: 0,
    },
    {
      name: 'bridge',
      version: '1.0.0',
      type: 'bridge',
      status: 'active',
      nodes: 8,
    },
    {
      name: 'loopback',
      version: '1.0.0',
      type: 'other',
      status: 'active',
      nodes: 8,
    },
  ],
  lastCheckTime: new Date(Date.now() - 25000).toISOString(),
}
