'use client'

import SliderDialog from '@/components/ui/SliderDialog'
import { createLibraryUser, findLibraryUserById, updateLibraryUser } from '@/service/libraryUserService'
import { useEffect } from 'react'

import * as Form from '@/components/ui/Form'
import { useForm } from 'react-hook-form'
import { libraryUserZodShema } from '../validation/libraryUserZodShema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/Input'
import MaskedInput from '@/components/ui/MaskedInput'
import { Button } from '@/components/ui/Button'

import { format } from 'date-fns'
import { toast } from '@/hooks/use-toast'
import { removeSpecialCharacters } from '@/core/utils/string'
import { ILibraryUser } from '@/interface/libraryUser'

interface LibraryUserModalProps {
  isOpen: boolean
  selectedUserId?: number
  onClose?: () => void
  onSuccess?: () => Promise<void>
}
const LibraryUserModal = ({ isOpen, selectedUserId, onClose, onSuccess }: LibraryUserModalProps) => {

  const form = useForm<z.infer<typeof libraryUserZodShema>>({
    resolver: zodResolver(libraryUserZodShema),
    defaultValues: {
      id: null,
      name: '',
      email: '',
      phone: '',
    },
  })
  
  const loadUser = async () => {
    try {
      const user = await findLibraryUserById(selectedUserId as number);
      form.setValue('id', user.id)
      form.setValue('name', user.name)
      form.setValue('email', user.email)
      form.setValue('phone', user.phone)
    } catch(error) {
      console.log(error);
      form.reset();
    }
  }

  const handleSave = async () => {
    const values = form.getValues();
    delete values.id

    try {
      let response = null

      const form = {
        ...values,
        ...(selectedUserId && { id: selectedUserId }),
        phone: removeSpecialCharacters(values.phone),
        registerDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")
      }

      if (selectedUserId) {
        response = await updateLibraryUser(form as ILibraryUser)
      } else {
        response = await createLibraryUser(form as ILibraryUser)
      }

      if (response) {
        toast({
          title: 'Usuário salvo com sucesso',
          description: 'O usuário foi salvo com sucesso',
          variant: 'success',
          duration: 3000
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onSuccess && onSuccess()
      }
    } catch(error) {
      console.log(error);
      toast({
        title: 'Erro ao salvar usuário',
        description: 'Ocorreu um erro ao salvar o usuário',
        variant: 'destructive',
        duration: 3000
      })
    }
  }

  useEffect(() => {
    if (selectedUserId && isOpen) {
      loadUser()
    }

    if (!isOpen) {
      form.reset()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedUserId])
  
  if (!isOpen) return null

  return (
    <SliderDialog
      open={isOpen}
      onClose={onClose}
      title={selectedUserId ? 'Editar Usuário' : 'Criar Usuário'}
    >
      <Form.Form {...form}>
        <form 
          className="flex flex-col h-full justify-between" 
          onSubmit={form.handleSubmit(handleSave)}
        >
          <div className="flex flex-col gap-4">
            <Form.FormField 
              name='name'
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Nome</Form.FormLabel>
                  <Form.FormControl>
                    <Input {...field} />
                  </Form.FormControl>
                  <Form.FormMessage className='text-xs text-red-400 pl-2' />
                </Form.FormItem>
              )}
            />
            <Form.FormField 
              name='email'
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Email</Form.FormLabel>
                  <Form.FormControl>
                    <Input {...field} />
                  </Form.FormControl>
                  <Form.FormMessage className='text-xs text-red-400 pl-2' />
                </Form.FormItem>
              )}
            />
            <Form.FormField 
              name='phone'
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Telefone</Form.FormLabel>
                  <Form.FormControl>
                    <MaskedInput mask="(##) #####-####" placeholder='(00) 00000-0000' {...field} />
                  </Form.FormControl>
                  <Form.FormMessage className='text-xs text-red-400 pl-2' />
                </Form.FormItem>
              )}
            />
          </div>
          <Button type="submit" className='bg-primary text-white font-bold'>Salvar</Button>
        </form>
      </Form.Form>
    </SliderDialog>
  )
}

export default LibraryUserModal
