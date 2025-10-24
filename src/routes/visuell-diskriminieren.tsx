import { createFileRoute } from '@tanstack/react-router'
import { VisuellDiskriminieren } from '@/pages/VisuellDiskriminieren.tsx'

export const Route = createFileRoute('/visuell-diskriminieren')({
  component: RouteComponent,
})

function RouteComponent() {
  return <VisuellDiskriminieren />
}
