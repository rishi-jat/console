import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { VITESS_DEMO_DATA, type VitessDemoData } from './demoData'

export type VitessStatus = VitessDemoData

const INITIAL_DATA: VitessStatus = {
  health: 'not-installed',
  vtgatePods: { ready: 0, total: 0 },
  vtctldPods: { ready: 0, total: 0 },
  totalKeyspaces: 0,
  totalShards: 0,
  totalTablets: 0,
  qps: 0,
  tablets: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'vitess-status'

async function fetchVitessStatus(): Promise<VitessStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseVitessStatusResult {
  data: VitessStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useVitessStatus(): UseVitessStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<VitessStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: VITESS_DEMO_DATA,
      persist: true,
      fetcher: fetchVitessStatus,
    })

  const hasAnyData = (data.vtgatePods?.total ?? 0) > 0 || data.tablets.length > 0

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
