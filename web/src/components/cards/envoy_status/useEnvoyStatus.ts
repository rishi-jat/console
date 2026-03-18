import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { ENVOY_DEMO_DATA, type EnvoyDemoData } from './demoData'

export type EnvoyStatus = EnvoyDemoData

const INITIAL_DATA: EnvoyStatus = {
  health: 'not-installed',
  totalProxies: 0,
  healthyProxies: 0,
  totalClusters: 0,
  totalListeners: 0,
  requestsPerSecond: 0,
  proxies: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'envoy-status'

async function fetchEnvoyStatus(): Promise<EnvoyStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseEnvoyStatusResult {
  data: EnvoyStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useEnvoyStatus(): UseEnvoyStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<EnvoyStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: ENVOY_DEMO_DATA,
      persist: true,
      fetcher: fetchEnvoyStatus,
    })

  const hasAnyData = data.totalProxies > 0 || data.proxies.length > 0

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
