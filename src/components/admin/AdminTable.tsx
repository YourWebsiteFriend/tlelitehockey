interface AdminTableProps {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
}

export function AdminTable({ headers, children, emptyMessage = 'No records found.' }: AdminTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#111111] border-b border-white/10">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-wider font-medium"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-[#0d0d0d]">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function AdminTableEmptyRow({
  colSpan,
  message = 'No records found.',
}: {
  colSpan: number;
  message?: string;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center text-white/40">
        {message}
      </td>
    </tr>
  );
}
