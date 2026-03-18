import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { OPENFGA_DEMO_DATA, type OpenFGADemoData } from './demoData'

export type OpenFGAStatus = OpenFGADemoData

const INITIAL_DATA: OpenFGAStatus = {
  health: 'not-installed',
  serverPods: { ready: 0, total: 0 },
  totalStores: 0,
  totalModels: 0,
  totalTuples: 0,
  queriesPerSecond: 0,
  stores: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'openfga-status'

async function fetchOpenFGAStatus(): Promise<OpenFGAStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseOpenFGAStatusResult {
  data: OpenFGAStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useOpenFGAStatus(): UseOpenFGAStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<OpenFGAStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: OPENFGA_DEMO_DATA,
      persist: true,
      fetcher: fetchOpenFGAStatus,
    })

  const hasAnyData = (data.serverPods?.total ?? 0) > 0 || data.stores.length > 0

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
