import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { LONGHORN_DEMO_DATA, type LonghornDemoData } from './demoData'

export type LonghornStatus = LonghornDemoData

const INITIAL_DATA: LonghornStatus = {
  health: 'not-installed',
  managerPods: { ready: 0, total: 0 },
  driverPods: { ready: 0, total: 0 },
  totalVolumes: 0,
  totalCapacity: '0',
  usedCapacity: '0',
  schedulableNodes: 0,
  volumes: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'longhorn-status'

async function fetchLonghornStatus(): Promise<LonghornStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseLonghornStatusResult {
  data: LonghornStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useLonghornStatus(): UseLonghornStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<LonghornStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: LONGHORN_DEMO_DATA,
      persist: true,
      fetcher: fetchLonghornStatus,
    })

  const hasAnyData = (data.managerPods?.total ?? 0) > 0 || data.volumes.length > 0

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
