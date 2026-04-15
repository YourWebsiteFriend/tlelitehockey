import { getSupabaseServerClient } from '@/lib/supabase/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopbar } from '@/components/admin/AdminTopbar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userEmail = user?.email ?? null;

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <AdminTopbar userEmail={userEmail} />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-[#0a0a0a] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
