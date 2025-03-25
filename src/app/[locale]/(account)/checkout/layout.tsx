import Header from '@/components/common/Header'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  )
}
