/**
 * Demo data for the TUF (The Update Framework) status card.
 * TUF provides secure software update systems.
 */

export interface TufRepository {
  name: string
  version: number
  targets: number
  status: 'valid' | 'expired' | 'invalid'
  expiresAt: string
}

export interface TufDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  totalRepositories: number
  validRepositories: number
  expiredRepositories: number
  totalTargets: number
  repositories: TufRepository[]
  lastCheckTime: string
}

export const TUF_DEMO_DATA: TufDemoData = {
  health: 'healthy',
  totalRepositories: 8,
  validRepositories: 7,
  expiredRepositories: 1,
  totalTargets: 234,
  repositories: [
    {
      name: 'production-releases',
      version: 45,
      targets: 89,
      status: 'valid',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: 'staging-releases',
      version: 23,
      targets: 56,
      status: 'valid',
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: 'container-images',
      version: 67,
      targets: 67,
      status: 'valid',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: 'legacy-artifacts',
      version: 12,
      targets: 22,
      status: 'expired',
      expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  lastCheckTime: new Date(Date.now() - 45000).toISOString(),
}
