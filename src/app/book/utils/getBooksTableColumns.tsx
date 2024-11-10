import { Button } from '@/components/ui/Button'
import { IBook } from '@/interface/book'
import { ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

export const getBooksTableColumns = ({ handleDelete }: { handleDelete: (id: number) => void }): ColumnDef<IBook>[] => [
  {
    accessorKey: 'title',
    header: 'Título',
  },
  {
    accessorKey: 'author',
    header: 'Autor',
  },
  {
    accessorKey: 'releaseDate',
    header: 'Lançamento',
  },
  {
    accessorKey: 'isbn',
    header: 'ISBN',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
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
              handleDelete(row?.original?.id as number)
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
