import { Button } from '@/components/ui/Button'
import { ILibraryUser } from '@/interface/libraryUser'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

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
            Excluir
          </Button>
        </div>
      )
    },
  }
]