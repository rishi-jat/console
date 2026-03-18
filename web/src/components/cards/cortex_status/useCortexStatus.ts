import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { CORTEX_DEMO_DATA, type CortexDemoData } from './demoData'

export type CortexStatus = CortexDemoData

const INITIAL_DATA: CortexStatus = {
  health: 'not-installed',
  distributorPods: { ready: 0, total: 0 },
  ingesterPods: { ready: 0, total: 0 },
  queryPods: { ready: 0, total: 0 },
  totalSeries: 0,
  samplesPerSecond: 0,
  queriesPerSecond: 0,
  ingesters: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'cortex-status'

async function fetchCortexStatus(): Promise<CortexStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseCortexStatusResult {
  data: CortexStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useCortexStatus(): UseCortexStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<CortexStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: CORTEX_DEMO_DATA,
      persist: true,
      fetcher: fetchCortexStatus,
    })

  const hasAnyData = (data.ingesterPods?.total ?? 0) > 0 || data.ingesters.length > 0

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
