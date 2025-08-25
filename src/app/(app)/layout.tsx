import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SiteShell from '@/components/SiteShell'
import { mockUser } from '@/lib/mock'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <SiteShell user={mockUser}>
      {children}
    </SiteShell>
  )
}