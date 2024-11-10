'use client'

import { useEffect, useReducer, useState } from 'react'

import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import { deleteBook, findAllBooks } from '@/service/bookService'
import { toast } from '@/hooks/use-toast'
import { getBooksTableColumns } from '../utils/getBooksTableColumns'
import BookModal from './BookModal'
import { Button } from '@/components/ui/Button'

const Content = () => {
  const [isLoading, toggleLoading] = useReducer((state) => !state, false)
  const [isOpen, setIsOpen] = useState(false)
  const [books, setBooks] = useState([])
  const [bookSelectedId, setBookSelectedId] = useState<number | undefined>(undefined)

  const loadBooks = async () => {
    if (isLoading) return

    try { 
      toggleLoading()
      const books = await findAllBooks()
      setBooks(books)
    } catch(error) {
      console.error(error);
    } finally {
      toggleLoading()
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id)
      loadBooks()
      toast({
        title: 'Livro deletado com sucesso',
        description: 'O livro foi deletado com sucesso',
        variant: 'success'
      })
    } catch(error) {
      console.error(error);
      toast({
        title: 'Erro ao deletar livro',
        description: 'Ocorreu um erro ao deletar o livro',
        variant: 'error'
      })
    }
  }

  const handleSuccess = async () => {
    setIsOpen(false)
    setBookSelectedId(undefined)
    await loadBooks()
  }

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const renderCreateButton = () => {
    return (
      <Button className="bg-primary text-white font-bold" onClick={handleOpenModal}>
        Criar Livro
      </Button>
    )
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <Card 
      className="h-fit" 
      title="Livros"
      headerButton={renderCreateButton()}
    >
      <DataTable
        columns={getBooksTableColumns({ handleDelete })}
        data={books}
        onClickRow={(row) => {
          console.log({ id: row.id })
          setBookSelectedId(row.id)
          handleOpenModal()
        }}
      />
      <BookModal 
        isOpen={isOpen}
        selectedBookId={bookSelectedId}
        onClose={() => {
          setIsOpen(false)
          setBookSelectedId(undefined)
        }}
        onSuccess={handleSuccess}
      />
    </Card>
  )
}

export default Content
