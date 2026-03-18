/**
 * Demo data for the Notary status card.
 * Notary provides trust over arbitrary collections of data via TUF.
 */

export interface NotarySignature {
  repository: string
  tag: string
  signer: string
  status: 'valid' | 'expired' | 'revoked'
  signedAt: string
}

export interface NotaryDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  serverPods: { ready: number; total: number }
  totalSignatures: number
  validSignatures: number
  expiredSignatures: number
  repositories: number
  signatures: NotarySignature[]
  lastCheckTime: string
}

export const NOTARY_DEMO_DATA: NotaryDemoData = {
  health: 'healthy',
  serverPods: { ready: 2, total: 2 },
  totalSignatures: 234,
  validSignatures: 228,
  expiredSignatures: 6,
  repositories: 45,
  signatures: [
    {
      repository: 'myregistry.io/api-server',
      tag: 'v2.4.1',
      signer: 'release-bot',
      status: 'valid',
      signedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      repository: 'myregistry.io/web-frontend',
      tag: 'v1.8.0',
      signer: 'ci-pipeline',
      status: 'valid',
      signedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      repository: 'myregistry.io/worker',
      tag: 'v3.1.2',
      signer: 'release-bot',
      status: 'expired',
      signedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      repository: 'myregistry.io/db-migration',
      tag: 'v1.0.5',
      signer: 'ops-team',
      status: 'valid',
      signedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
  ],
  lastCheckTime: new Date(Date.now() - 45000).toISOString(),
}
