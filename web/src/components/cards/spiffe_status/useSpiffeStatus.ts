import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { SPIFFE_DEMO_DATA, type SpiffeDemoData } from './demoData'

export type SpiffeStatus = SpiffeDemoData

const INITIAL_DATA: SpiffeStatus = {
  health: 'not-installed',
  serverPods: { ready: 0, total: 0 },
  agentPods: { ready: 0, total: 0 },
  totalIdentities: 0,
  activeIdentities: 0,
  expiringIdentities: 0,
  identities: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'spiffe-status'

async function fetchSpiffeStatus(): Promise<SpiffeStatus> {
  // Placeholder - in production this would call the backend API
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseSpiffeStatusResult {
  data: SpiffeStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useSpiffeStatus(): UseSpiffeStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<SpiffeStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: SPIFFE_DEMO_DATA,
      persist: true,
      fetcher: fetchSpiffeStatus,
    })

  const hasAnyData = (data.serverPods?.total ?? 0) > 0 || data.identities.length > 0

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
