import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { DRAGONFLY_DEMO_DATA, type DragonflyDemoData } from './demoData'

export type DragonflyStatus = DragonflyDemoData

const INITIAL_DATA: DragonflyStatus = {
  health: 'not-installed',
  managerPods: { ready: 0, total: 0 },
  schedulerPods: { ready: 0, total: 0 },
  seedPeers: 0,
  totalPeers: 0,
  activeTasks: 0,
  bandwidthSaved: '0',
  peers: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'dragonfly-status'

async function fetchDragonflyStatus(): Promise<DragonflyStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseDragonflyStatusResult {
  data: DragonflyStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useDragonflyStatus(): UseDragonflyStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<DragonflyStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: DRAGONFLY_DEMO_DATA,
      persist: true,
      fetcher: fetchDragonflyStatus,
    })

  const hasAnyData = (data.managerPods?.total ?? 0) > 0 || data.peers.length > 0

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
