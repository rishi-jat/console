import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { CILIUM_DEMO_DATA, type CiliumDemoData } from './demoData'

export type CiliumStatus = CiliumDemoData

const INITIAL_DATA: CiliumStatus = {
  health: 'not-installed',
  operatorPods: { ready: 0, total: 0 },
  agentPods: { ready: 0, total: 0 },
  totalEndpoints: 0,
  totalIdentities: 0,
  totalPolicies: 0,
  hubbleEnabled: false,
  agents: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'cilium-status'

async function fetchCiliumStatus(): Promise<CiliumStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseCiliumStatusResult {
  data: CiliumStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useCiliumStatus(): UseCiliumStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<CiliumStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: CILIUM_DEMO_DATA,
      persist: true,
      fetcher: fetchCiliumStatus,
    })

  const hasAnyData = (data.agentPods?.total ?? 0) > 0 || data.agents.length > 0

  const { showSkeleton, showEmptyState } = useCardLoadingState({
    isLoading,
    hasAnyData,
    isFailed,
    consecutiveFailures,
    isDemoData: isDemoFallback && !isLoading,
  })

  return {
    data,
    loading: isLoading,
    isRefreshing,
    error: isFailed && !hasAnyData,
    consecutiveFailures,
    showSkeleton,
    showEmptyState,
  }
}
