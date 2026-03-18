/**
 * Demo data for the SPIFFE/SPIRE status card.
 * SPIFFE (Secure Production Identity Framework for Everyone) provides
 * workload identity in cloud-native environments.
 */

export interface SpiffeIdentity {
  spiffeId: string
  workload: string
  namespace: string
  status: 'active' | 'expiring' | 'expired'
  expiresAt: string
}

export interface SpiffeDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  serverPods: { ready: number; total: number }
  agentPods: { ready: number; total: number }
  totalIdentities: number
  activeIdentities: number
  expiringIdentities: number
  identities: SpiffeIdentity[]
  lastCheckTime: string
}

export const SPIFFE_DEMO_DATA: SpiffeDemoData = {
  health: 'healthy',
  serverPods: { ready: 3, total: 3 },
  agentPods: { ready: 8, total: 8 },
  totalIdentities: 156,
  activeIdentities: 148,
  expiringIdentities: 8,
  identities: [
    {
      spiffeId: 'spiffe://cluster.local/ns/production/sa/api-gateway',
      workload: 'api-gateway',
      namespace: 'production',
      status: 'active',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      spiffeId: 'spiffe://cluster.local/ns/production/sa/payment-service',
      workload: 'payment-service',
      namespace: 'production',
      status: 'active',
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    },
    {
      spiffeId: 'spiffe://cluster.local/ns/staging/sa/order-processor',
      workload: 'order-processor',
      namespace: 'staging',
      status: 'expiring',
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      spiffeId: 'spiffe://cluster.local/ns/dev/sa/test-runner',
      workload: 'test-runner',
      namespace: 'dev',
      status: 'expired',
      expiresAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
  ],
  lastCheckTime: new Date(Date.now() - 30000).toISOString(),
}
