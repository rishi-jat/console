/**
 * Demo data for the OpenTelemetry status card.
 * OpenTelemetry provides unified observability telemetry collection.
 */

export interface OtelCollector {
  name: string
  status: 'running' | 'degraded' | 'stopped'
  receivers: string[]
  exporters: string[]
  spansPerSecond: number
}

export interface OtelDemoData {
  health: 'healthy' | 'degraded' | 'not-installed'
  collectorPods: { ready: number; total: number }
  totalCollectors: number
  totalReceivers: number
  totalExporters: number
  spansPerSecond: number
  metricsPerSecond: number
  logsPerSecond: number
  collectors: OtelCollector[]
  lastCheckTime: string
}

export const OTEL_DEMO_DATA: OtelDemoData = {
  health: 'healthy',
  collectorPods: { ready: 4, total: 4 },
  totalCollectors: 4,
  totalReceivers: 8,
  totalExporters: 5,
  spansPerSecond: 15000,
  metricsPerSecond: 45000,
  logsPerSecond: 8000,
  collectors: [
    {
      name: 'otel-collector-0',
      status: 'running',
      receivers: ['otlp', 'jaeger', 'zipkin'],
      exporters: ['otlp', 'prometheus'],
      spansPerSecond: 4200,
    },
    {
      name: 'otel-collector-1',
      status: 'running',
      receivers: ['otlp', 'jaeger'],
      exporters: ['otlp', 'prometheus'],
      spansPerSecond: 3800,
    },
    {
      name: 'otel-collector-2',
      status: 'running',
      receivers: ['otlp'],
      exporters: ['otlp', 'loki'],
      spansPerSecond: 4100,
    },
    {
      name: 'otel-collector-3',
      status: 'degraded',
      receivers: ['otlp'],
      exporters: ['otlp'],
      spansPerSecond: 2900,
    },
  ],
  lastCheckTime: new Date(Date.now() - 15000).toISOString(),
}
