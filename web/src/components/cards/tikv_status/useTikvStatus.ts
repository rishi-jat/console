import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { TIKV_DEMO_DATA, type TikvDemoData } from './demoData'

export type TikvStatus = TikvDemoData

const INITIAL_DATA: TikvStatus = {
  health: 'not-installed',
  pdPods: { ready: 0, total: 0 },
  tikvPods: { ready: 0, total: 0 },
  totalStores: 0,
  totalRegions: 0,
  totalCapacity: '0',
  usedCapacity: '0',
  stores: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'tikv-status'

async function fetchTikvStatus(): Promise<TikvStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseTikvStatusResult {
  data: TikvStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useTikvStatus(): UseTikvStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<TikvStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: TIKV_DEMO_DATA,
      persist: true,
      fetcher: fetchTikvStatus,
    })

  const hasAnyData = (data.tikvPods?.total ?? 0) > 0 || data.stores.length > 0

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
