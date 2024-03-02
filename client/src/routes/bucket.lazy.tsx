import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/bucket')({
  component: () => <div>Hello /bucket!</div>
})