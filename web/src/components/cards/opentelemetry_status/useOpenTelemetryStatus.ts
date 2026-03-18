import { useCache } from '../../../lib/cache'
import { useCardLoadingState } from '../CardDataContext'
import { OTEL_DEMO_DATA, type OtelDemoData } from './demoData'

export type OpenTelemetryStatus = OtelDemoData

const INITIAL_DATA: OpenTelemetryStatus = {
  health: 'not-installed',
  collectorPods: { ready: 0, total: 0 },
  totalCollectors: 0,
  totalReceivers: 0,
  totalExporters: 0,
  spansPerSecond: 0,
  metricsPerSecond: 0,
  logsPerSecond: 0,
  collectors: [],
  lastCheckTime: new Date().toISOString(),
}

const CACHE_KEY = 'opentelemetry-status'

async function fetchOpenTelemetryStatus(): Promise<OpenTelemetryStatus> {
  return { ...INITIAL_DATA, lastCheckTime: new Date().toISOString() }
}

export interface UseOpenTelemetryStatusResult {
  data: OpenTelemetryStatus
  loading: boolean
  isRefreshing: boolean
  error: boolean
  consecutiveFailures: number
  showSkeleton: boolean
  showEmptyState: boolean
}

export function useOpenTelemetryStatus(): UseOpenTelemetryStatusResult {
  const { data, isLoading, isRefreshing, isFailed, consecutiveFailures, isDemoFallback } =
    useCache<OpenTelemetryStatus>({
      key: CACHE_KEY,
      category: 'default',
      initialData: INITIAL_DATA,
      demoData: OTEL_DEMO_DATA,
      persist: true,
      fetcher: fetchOpenTelemetryStatus,
    })

  const hasAnyData = (data.collectorPods?.total ?? 0) > 0 || data.collectors.length > 0

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
