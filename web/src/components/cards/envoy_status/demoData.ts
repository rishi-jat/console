/**
 * Demo data for the Envoy status card.
 * Envoy is a high-performance edge/middle/service proxy.
 */

export interface EnvoyProxy {
  name: string
  cluster: string
  status: 'healthy' | 'degraded' | 'unhealthy'
  uptime: string
  connections: number
}

export interface EnvoyDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  totalProxies: number
  healthyProxies: number
  totalClusters: number
  totalListeners: number
  requestsPerSecond: number
  proxies: EnvoyProxy[]
  lastCheckTime: string
}

export const ENVOY_DEMO_DATA: EnvoyDemoData = {
  health: 'healthy',
  totalProxies: 24,
  healthyProxies: 23,
  totalClusters: 45,
  totalListeners: 36,
  requestsPerSecond: 12500,
  proxies: [
    {
      name: 'istio-proxy-api-gateway',
      cluster: 'production',
      status: 'healthy',
      uptime: '15d 4h',
      connections: 1250,
    },
    {
      name: 'istio-proxy-payment-svc',
      cluster: 'production',
      status: 'healthy',
      uptime: '15d 4h',
      connections: 890,
    },
    {
      name: 'istio-proxy-order-svc',
      cluster: 'production',
      status: 'degraded',
      uptime: '2d 8h',
      connections: 456,
    },
    {
      name: 'istio-proxy-user-svc',
      cluster: 'staging',
      status: 'healthy',
      uptime: '7d 12h',
      connections: 234,
    },
  ],
  lastCheckTime: new Date(Date.now() - 15000).toISOString(),
}
