import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { NOTARY_DEMO_DATA, type NotaryDemoData } from './demoData'

export type NotaryStatus = NotaryDemoData

const INITIAL_DATA: NotaryStatus = {
  health: 'not-installed',
  serverPods: { ready: 0, total: 0 },
  totalSignatures: 0,
  validSignatures: 0,
  expiredSignatures: 0,
  repositories: 0,
  signatures: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'notary-status'

async function fetchNotaryStatus(): Promise<NotaryStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseNotaryStatusResult {
  data: NotaryStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useNotaryStatus(): UseNotaryStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<NotaryStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: NOTARY_DEMO_DATA,
      persist: true,
      fetcher: fetchNotaryStatus,
    })

  const hasAnyData = (data.serverPods?.total ?? 0) > 0 || data.signatures.length > 0

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
