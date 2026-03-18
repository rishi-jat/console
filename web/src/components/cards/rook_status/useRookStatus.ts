import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { ROOK_DEMO_DATA, type RookDemoData } from './demoData'

export type RookStatus = RookDemoData

const INITIAL_DATA: RookStatus = {
  health: 'not-installed',
  operatorPods: { ready: 0, total: 0 },
  monPods: { ready: 0, total: 0 },
  totalOSDs: 0,
  healthyOSDs: 0,
  totalCapacity: '0',
  usedCapacity: '0',
  pools: 0,
  osds: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'rook-status'

async function fetchRookStatus(): Promise<RookStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseRookStatusResult {
  data: RookStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useRookStatus(): UseRookStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<RookStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: ROOK_DEMO_DATA,
      persist: true,
      fetcher: fetchRookStatus,
    })

  const hasAnyData = (data.operatorPods?.total ?? 0) > 0 || data.osds.length > 0

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
