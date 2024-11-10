import { Button } from '@/components/ui/Button'
import { applyMask } from '@/core/utils/dataFormat'
import { ILibraryUser } from '@/interface/libraryUser'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

import { format, parse } from 'date-fns'

export const getLibraryUserTableColumns = ({ handleDelete }: { handleDelete: (id: number) => void }): ColumnDef<ILibraryUser>[] => [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    cell: ({ row }) => {
      return (
        <span>{applyMask(row.original.phone, '(##) # ####-####')}</span>
      )
    }
  },
  {
    accessorKey: 'registerDate',
    header: 'Data de Cadastro',
    cell: ({ row }) => {
      const formatedDateTime = format(
        parse(
          row.original.registerDate, 
          "yyyy-MM-dd'T'HH:mm:ss", 
          new Date()
        ), "dd/MM/yyyy HH:mm:ss")
      return (
        <span>{formatedDateTime}</span>
      )
    }
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button 
            onClick={(event) => {
              event.stopPropagation()
              handleDelete(row.original.id)
            }}
            className="text-white bg-red-300 hover:bg-red-500"
          >
            <Trash2 />
          </Button>
        </div>
      )
    },
  }
]