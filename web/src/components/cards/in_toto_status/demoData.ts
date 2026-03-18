/**
 * Demo data for the in-toto status card.
 * in-toto provides software supply chain integrity.
 */

export interface InTotoLayout {
  name: string
  steps: number
  inspections: number
  status: 'verified' | 'pending' | 'failed'
  lastVerified: string
}

export interface InTotoDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  totalLayouts: number
  verifiedLayouts: number
  failedVerifications: number
  totalArtifacts: number
  layouts: InTotoLayout[]
  lastCheckTime: string
}

export const IN_TOTO_DEMO_DATA: InTotoDemoData = {
  health: 'healthy',
  totalLayouts: 12,
  verifiedLayouts: 11,
  failedVerifications: 1,
  totalArtifacts: 456,
  layouts: [
    {
      name: 'ci-pipeline-release',
      steps: 8,
      inspections: 3,
      status: 'verified',
      lastVerified: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      name: 'container-build',
      steps: 5,
      inspections: 2,
      status: 'verified',
      lastVerified: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: 'security-scan',
      steps: 3,
      inspections: 4,
      status: 'failed',
      lastVerified: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      name: 'artifact-signing',
      steps: 4,
      inspections: 1,
      status: 'verified',
      lastVerified: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
  ],
  lastCheckTime: new Date(Date.now() - 60000).toISOString(),
}
