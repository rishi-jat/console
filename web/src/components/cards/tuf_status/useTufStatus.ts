import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { TUF_DEMO_DATA, type TufDemoData } from './demoData'

export type TufStatus = TufDemoData

const INITIAL_DATA: TufStatus = {
  health: 'not-installed',
  totalRepositories: 0,
  validRepositories: 0,
  expiredRepositories: 0,
  totalTargets: 0,
  repositories: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'tuf-status'

async function fetchTufStatus(): Promise<TufStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseTufStatusResult {
  data: TufStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useTufStatus(): UseTufStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<TufStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: TUF_DEMO_DATA,
      persist: true,
      fetcher: fetchTufStatus,
    })

  const hasAnyData = data.totalRepositories > 0 || data.repositories.length > 0

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
