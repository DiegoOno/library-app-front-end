/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import SliderDialog from '@/components/ui/SliderDialog'
import { createBook, findBookById, updateBook } from '@/service/bookService'
import { useEffect, useReducer } from 'react'

import * as Form from '@/components/ui/Form'
import { useForm } from 'react-hook-form'
import { bookZodSchema } from '../validation/bookZodSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import DatePicker from '@/components/ui/Datepicker'
import { IBook } from '@/interface/book'
import { toast } from '@/hooks/use-toast'
import { format, parse } from 'date-fns'

interface BookModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => Promise<void>
  selectedBookId?: number | undefined
}

const BookModal = ({ isOpen, onClose, onSuccess, selectedBookId }: BookModalProps) => {
  const [isLoading, toggleLoading] = useReducer((state) => !state, false)

  const form = useForm<z.infer<typeof bookZodSchema>>({
    resolver: zodResolver(bookZodSchema),
    defaultValues: {
      id: null,
      title: '',
      author: '',
      releaseDate: '',
      isbn: '',
      category: '',
    },
  })

  const loadBook = async () => {
    if (!selectedBookId) return

    try {
      const book = await findBookById(selectedBookId)
      delete book.loans

      form.setValue('id', book.id)
      form.setValue('title', book.title)
      form.setValue('author', book.author)
      form.setValue('releaseDate', 
        format(parse(book.releaseDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
      )
      form.setValue('isbn', book.isbn)
      form.setValue('category', book.category)
    } catch(error) {
      console.error(error);
    }
  }

  const handleSaveBook = async (data: z.infer<typeof bookZodSchema>) => {
    try {
      toggleLoading()
      const form = {
        ...(selectedBookId && { id: data.id }),
        title: data.title,
        author: data.author,
        releaseDate: format(parse(data?.releaseDate, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
        isbn: data.isbn,
        category: data.category
      }

      if (selectedBookId) {
        await updateBook(form as IBook)
        if (onSuccess) await onSuccess()
      } else {
        await createBook(form as IBook)
        if (onSuccess) await onSuccess()
      }

      toast({
        title: 'Livro salvo com sucesso',
        description: 'O livro foi salvo com sucesso',
        variant: 'success',
        duration: 3000
      })
    } catch(error) {
      console.error(error);
    } finally {
      toggleLoading()
      onClose()
    }
  }

  useEffect(() => {
    if (!selectedBookId) return
    loadBook()
  }, [selectedBookId])

  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <SliderDialog 
      title={selectedBookId ? 'Editar Livro' : 'Criar Livro'}
      open={isOpen} 
      onClose={onClose}
    >
      <Form.Form {...form}>
        <form 
          className='flex flex-col gap-4 justify-between h-full'
          onSubmit={form.handleSubmit(handleSaveBook)}
        >
          <div className="flex flex-col gap-4">
            <Form.FormField 
              name="title"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Título</Form.FormLabel>
                    <Form.FormControl>
                      <Input placeholder="Título" {...field} />
                    </Form.FormControl>
                    <Form.FormMessage className="text-xs text-red-400" />
                  </Form.FormItem>
                )
              }}
            />
            <Form.FormField 
              name="author"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Autor</Form.FormLabel>
                    <Form.FormControl>
                      <Input placeholder="Autor" {...field} />
                    </Form.FormControl>
                    <Form.FormMessage className="text-xs text-red-400" />
                  </Form.FormItem>
                )
              }}
            />
            <Form.FormField 
              name="releaseDate"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Data de Lançamento</Form.FormLabel>
                      <Form.FormControl>
                        <DatePicker 
                          {...field}
                          onChange={(field.onChange)}
                          placeholder='dd/mm/aaaa'
                          hidden={{
                            after: new Date()
                          } as any}
                        />
                      </Form.FormControl>
                    <Form.FormMessage className="text-xs text-red-400" />
                  </Form.FormItem>
                )
              }}
            />
            <Form.FormField 
              name="isbn"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>ISBN</Form.FormLabel>
                    <Form.FormControl>
                      <Input placeholder="ISBN" {...field} />
                    </Form.FormControl>
                    <Form.FormMessage className="text-xs text-red-400" />
                  </Form.FormItem>
                )
              }}
            />
            <Form.FormField 
              name="category"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Categoria</Form.FormLabel>
                    <Form.FormControl>
                      <Input placeholder="Categoria" {...field} />
                    </Form.FormControl>
                    <Form.FormMessage className="text-xs text-red-400" />
                  </Form.FormItem>
                )
              }}
            />
          </div>
          <Button 
            type="submit"
            className="bg-primary text-white font-bold"
            disabled={isLoading}
            loading={isLoading}
          >
            Salvar
          </Button>
        </form>
      </Form.Form>
    </SliderDialog>
  )
}

export default BookModal
