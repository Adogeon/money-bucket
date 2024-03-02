import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/transaction')({
  component: () => <div>Hello /transaction!</div>
})