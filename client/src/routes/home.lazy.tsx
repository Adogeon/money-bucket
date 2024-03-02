import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/home')({
  component: () => <div>Hello /home!</div>
})