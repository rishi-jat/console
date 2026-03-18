import { CheckCircle, AlertTriangle, RefreshCw, Share2, Users, Download } from 'lucide-react'
import { Skeleton } from '../../ui/Skeleton'
import { useDragonflyStatus } from './useDragonflyStatus'

function useFormatRelativeTime() {
  return (isoString: string): string => {
    const diff = Date.now() - new Date(isoString).getTime()
    if (isNaN(diff) || diff < 0) return 'just now'
    const minute = 60_000
    const hour = 60 * minute
    const day = 24 * hour
    if (diff < minute) return 'just now'
    if (diff < hour) return `${Math.floor(diff / minute)}m ago`
    if (diff < day) return `${Math.floor(diff / hour)}h ago`
    return `${Math.floor(diff / day)}d ago`
  }
}

interface MetricTileProps {
  label: string
  value: number | string
  colorClass: string
  icon: React.ReactNode
}

function MetricTile({ label, value, colorClass, icon }: MetricTileProps) {
  return (
    <div className="flex-1 p-3 rounded-lg bg-secondary/30 text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1">{icon}</div>
      <span className={`text-2xl font-bold ${colorClass}`}>{value}</span>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </div>
  )
}

export function DragonflyStatus() {
  const formatRelativeTime = useFormatRelativeTime()
  const { data, error, showSkeleton, showEmptyState, isRefreshing } = useDragonflyStatus()

  if (showSkeleton) {
    return (
      <div className="h-full flex flex-col min-h-card gap-3">
        <Skeleton variant="rounded" height={36} />
        <div className="flex gap-2">
          <Skeleton variant="rounded" height={80} className="flex-1" />
          <Skeleton variant="rounded" height={80} className="flex-1" />
          <Skeleton variant="rounded" height={80} className="flex-1" />
        </div>
        <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" height={40} />
      </div>
    )
  }

  if (error || showEmptyState) {
    return (
      <div className="h-full flex flex-col items-center justify-center min-h-card text-muted-foreground gap-2">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <p className="text-sm text-red-400">
          {error ? 'Failed to fetch Dragonfly status' : 'No Dragonfly cluster found'}
        </p>
        <p className="text-xs">Deploy Dragonfly for P2P image distribution.</p>
      </div>
    )
  }

  if (data.health === 'not-installed') {
    return (
      <div className="h-full flex flex-col items-center justify-center min-h-card text-muted-foreground gap-2">
        <Share2 className="w-6 h-6 text-muted-foreground/50" />
        <p className="text-sm font-medium">Dragonfly not detected</p>
        <p className="text-xs text-center max-w-xs">
          Deploy Dragonfly for P2P-based file and image distribution.
        </p>
      </div>
    )
  }

  const isHealthy = data.health === 'healthy'

  return (
    <div className="h-full flex flex-col min-h-card content-loaded gap-4">
      {/* Health badge + last check */}
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            isHealthy ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}
        >
          {isHealthy ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {isHealthy ? 'Healthy' : 'Degraded'}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{formatRelativeTime(data.lastCheckTime)}</span>
        </div>
      </div>

      {/* Metric tiles */}
      <div className="flex gap-3">
        <MetricTile
          label="Peers"
          value={data.totalPeers}
          colorClass="text-blue-400"
          icon={<Users className="w-4 h-4 text-blue-400" />}
        />
        <MetricTile
          label="Tasks"
          value={data.activeTasks}
          colorClass="text-green-400"
          icon={<Download className="w-4 h-4 text-green-400" />}
        />
        <MetricTile
          label="Saved"
          value={data.bandwidthSaved}
          colorClass="text-purple-400"
          icon={<Share2 className="w-4 h-4 text-purple-400" />}
        />
      </div>

      {/* Pod status */}
      <div className="flex gap-4 text-xs">
        <span className="text-muted-foreground">
          Manager: {data.managerPods.ready}/{data.managerPods.total}
        </span>
        <span className="text-muted-foreground">
          Scheduler: {data.schedulerPods.ready}/{data.schedulerPods.total}
        </span>
        <span className="text-muted-foreground">Seeds: {data.seedPeers}</span>
      </div>

      {/* Peer list */}
      <div className="flex-1 flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">Active Peers</p>
        <div className="space-y-1.5">
          {data.peers.slice(0, 4).map((peer) => (
            <div key={peer.id} className="flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  peer.status === 'running' ? 'bg-green-400' : 'bg-red-400'
                }`}
              />
              <span className="truncate flex-1 text-muted-foreground">{peer.hostname}</span>
              <span className="text-muted-foreground/60 shrink-0">{peer.uploadSpeed}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-border/50 text-xs text-muted-foreground">
        <a
          href="https://d7y.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-blue-400 transition-colors"
        >
          Open Dragonfly Docs
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
