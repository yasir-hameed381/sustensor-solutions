import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface Column<Row> {
  key: string;
  header: string;
  /** The first column is rendered as the row header. */
  render: (row: Row) => ReactNode;
  className?: string;
}

interface DataTableProps<Row> {
  caption: string;
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  className?: string;
}

/**
 * A real <table> from `md` up; below that each row becomes a stacked card with inline labels.
 * The caption is visually hidden but announced by screen readers.
 */
export function DataTable<Row>({ caption, columns, rows, rowKey, className }: DataTableProps<Row>) {
  const [first, ...rest] = columns;
  return (
    <div className={cn('md:overflow-hidden md:rounded-xl md:border md:border-hairline md:bg-surface', className)}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="hidden bg-canvas md:table-header-group">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="border-b border-hairline px-6 py-3.5 text-eyebrow uppercase text-fg-subtle"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="grid gap-3 md:table-row-group">
          {rows.map((row) => (
            <tr
              key={rowKey(row)}
              className="grid gap-3 rounded-xl border border-hairline bg-surface p-5 shadow-xs md:table-row md:rounded-none md:border-0 md:border-b md:p-0 md:shadow-none md:last:border-b-0 md:hover:bg-canvas"
            >
              <th scope="row" className={cn('text-h4 text-fg md:px-6 md:py-5 md:align-top', first.className)}>
                {first.render(row)}
              </th>
              {rest.map((column) => (
                <td key={column.key} className={cn('md:px-6 md:py-5 md:align-top', column.className)}>
                  <span className="mb-1 block text-eyebrow uppercase text-fg-subtle md:hidden">{column.header}</span>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
