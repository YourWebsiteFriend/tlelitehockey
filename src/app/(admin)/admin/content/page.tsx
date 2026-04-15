import { ContentEditor } from '@/components/admin/ContentEditor';

export const metadata = { title: 'Content | TL Elite Admin' };

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Site Content</h1>
        <p className="text-white/40 text-sm mt-1">
          Edit dynamic content blocks that appear on the public site.
        </p>
      </div>

      <ContentEditor />
    </div>
  );
}
