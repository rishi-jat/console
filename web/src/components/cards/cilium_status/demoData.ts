/**
 * Demo data for the Cilium status card.
 * Cilium provides eBPF-based networking, observability, and security.
 */

export interface CiliumAgent {
  node: string
  status: 'ready' | 'not-ready' | 'pending'
  version: string
  endpoints: number
}

export interface CiliumDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  operatorPods: { ready: number; total: number }
  agentPods: { ready: number; total: number }
  totalEndpoints: number
  totalIdentities: number
  totalPolicies: number
  hubbleEnabled: boolean
  agents: CiliumAgent[]
  lastCheckTime: string
}

export const CILIUM_DEMO_DATA: CiliumDemoData = {
  health: 'healthy',
  operatorPods: { ready: 2, total: 2 },
  agentPods: { ready: 6, total: 6 },
  totalEndpoints: 342,
  totalIdentities: 156,
  totalPolicies: 24,
  hubbleEnabled: true,
  agents: [
    {
      node: 'node-1',
      status: 'ready',
      version: '1.14.5',
      endpoints: 58,
    },
    {
      node: 'node-2',
      status: 'ready',
      version: '1.14.5',
      endpoints: 62,
    },
    {
      node: 'node-3',
      status: 'ready',
      version: '1.14.5',
      endpoints: 55,
    },
    {
      node: 'node-4',
      status: 'ready',
      version: '1.14.5',
      endpoints: 48,
    },
  ],
  lastCheckTime: new Date(Date.now() - 20000).toISOString(),
}
