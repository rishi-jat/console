import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { CNI_DEMO_DATA, type CniDemoData } from './demoData'

export type CniStatus = CniDemoData

const INITIAL_DATA: CniStatus = {
  health: 'not-installed',
  primaryCni: '',
  totalNodes: 0,
  nodesWithCni: 0,
  totalPods: 0,
  networkPolicies: 0,
  plugins: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'cni-status'

async function fetchCniStatus(): Promise<CniStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseCniStatusResult {
  data: CniStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useCniStatus(): UseCniStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<CniStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: CNI_DEMO_DATA,
      persist: true,
      fetcher: fetchCniStatus,
    })

  const hasAnyData = data.totalNodes > 0 || data.plugins.length > 0

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
