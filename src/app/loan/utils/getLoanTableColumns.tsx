import { ILoan } from '@/interface/loan'
import { ColumnDef } from '@tanstack/react-table'
import { LOAN_STATUS } from './loanStatus'

import { format, parse } from 'date-fns'

export const getLoanTableColumns = (): ColumnDef<ILoan>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'libraryUser',
    header: 'Usuário',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.libraryUser.name}
        </div>
      )
    }
  },
  {
    accessorKey: 'book',
    header: 'Livro',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.book.title}
        </div>
      )
    }
  },
  {
    accessorKey: 'loanDate',
    header: 'Data de Emprestimo',
    cell: ({ row }) => {
      const formatedDateTime = format(
        parse(
          row.original.loanDate, 
          "yyyy-MM-dd'T'HH:mm:ss", 
          new Date()
        ), "dd/MM/yyyy")
      return (
        <span>{formatedDateTime}</span>
      )
    }
  },
  {
    accessorKey: 'returnDate',
    header: 'Data de Devolução',
    cell: ({ row }) => {
      const formatedDateTime = format(
        parse(
          row.original.returnDate, 
          "yyyy-MM-dd'T'HH:mm:ss", 
          new Date()
        ), "dd/MM/yyyy")
      return (
        <span>{formatedDateTime}</span>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const statusItem = LOAN_STATUS[row.original.status as keyof typeof LOAN_STATUS]

      return (
        <span style={{ color: statusItem.color }}>
          {statusItem.label}
        </span>
      )
    }
  }
]
