import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { IN_TOTO_DEMO_DATA, type InTotoDemoData } from './demoData'

export type InTotoStatus = InTotoDemoData

const INITIAL_DATA: InTotoStatus = {
  health: 'not-installed',
  totalLayouts: 0,
  verifiedLayouts: 0,
  failedVerifications: 0,
  totalArtifacts: 0,
  layouts: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'in-toto-status'

async function fetchInTotoStatus(): Promise<InTotoStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseInTotoStatusResult {
  data: InTotoStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useInTotoStatus(): UseInTotoStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<InTotoStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: IN_TOTO_DEMO_DATA,
      persist: true,
      fetcher: fetchInTotoStatus,
    })

  const hasAnyData = data.totalLayouts > 0 || data.layouts.length > 0

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
