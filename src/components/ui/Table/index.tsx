'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Spinner } from '@/components/ui/Spinner'

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onClickRow?: (data: TData) => void
  emptyMessage?: string
  sortOptions?: { sortField: string, sortDir: 'ASC' | 'DESC' }
  handleChangeSortOptions?: (sortField: string, sortDir: 'ASC' | 'DESC') => void
  isLoading?: boolean
}

const DataTable = ({
  columns,
  data,
  onClickRow,
  emptyMessage,
  sortOptions,
  handleChangeSortOptions,
  isLoading
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: TableProps<any, any>) => {
  const { sortField, sortDir } = sortOptions || {}

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const onClickSort = ({ sortField, sortDir }: { sortField: string, sortDir: 'ASC' | 'DESC' }) => {
    if (!handleChangeSortOptions) return
    handleChangeSortOptions(sortField, sortDir)
  }

  if (!table) return null

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col rounded-md border border-black/10 overflow-hidden">
        <Table className="overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-table-header text-black cursor-pointer"
                    >
                      <div className="flex flex-row items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                        }
                        {header.column.getCanSort() && (
                          <div>
                            {header?.id === sortField && sortDir === 'ASC' && (
                              <ArrowUp onClick={() => onClickSort({ sortField, sortDir: 'DESC' })} className="w-4 h-4" />
                            )}
                            {header?.id === sortField && sortDir === 'DESC' && (
                              <ArrowDown onClick={() => onClickSort({ sortField, sortDir: 'ASC' })} className="w-4 h-4"  />
                            )}
                            {sortOptions && header?.id !== sortField && (
                              <ArrowUpDown onClick={() => onClickSort({ sortField: header.id, sortDir: 'ASC' })} className="w-4 h-4" />
                            )}
                          </div>  
                        )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="h-fit overflow-y-auto scrollbar scrollbar-thumb-primary scrollbar-w-2">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={onClickRow ? 'cursor-pointer' : ''}
                  onClick={() => onClickRow && onClickRow(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                {isLoading ? (
                  <TableCell colSpan={columns.length}>
                    <Spinner />
                  </TableCell>
                ) : (
                  <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage || 'Nenhum registro encontrado'}
                </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable
