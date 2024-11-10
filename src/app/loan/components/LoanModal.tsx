/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"

import SliderDialog from "@/components/ui/SliderDialog"
import { createLoan, findLoanById, updateLoan } from "@/service/loanService"

import * as Form from "@/components/ui/Form"
import { useForm } from "react-hook-form"
import { loanZodSchema } from "../validation/loanZodSchema"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/Button"

import DatePicker from "@/components/ui/Datepicker"

import Select from 'react-select'
import { customStyles } from './styles'

import { findAllLibraryUsers } from "@/service/libraryUserService"
import { findAllAvailableBooks } from '@/service/bookService'

import { IBook } from '@/interface/book'
import { ILibraryUser } from '@/interface/libraryUser'
import { formatDate } from '@/core/utils/date'
import { ILoan } from '@/interface/loan'
import { toast } from '@/hooks/use-toast'
import { LOAN_STATUS } from '../utils/loanStatus'
import { Checkbox } from '@/components/ui/Checkbox'
import { findRecommendationsByLibraryUserId } from '@/service/recommendationService'

interface LoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => Promise<void>;
  selectedLoanId?: number;
}

const LoanModal = ({
  isOpen,
  onClose,
  onSuccess,
  selectedLoanId,
}: LoanModalProps) => {
  const [libraryUsers, setLibraryUsers] = useState<ILibraryUser[]>([]);
  const [books, setBooks] = useState<IBook[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const form = useForm<z.infer<typeof loanZodSchema>>({
    resolver: zodResolver(loanZodSchema),
    defaultValues: {
      id: null,
      libraryUser: {
        id: null,
        name: "",
        email: "",
        phone: "",
      },
      book: {
        id: null,
        title: "",
        author: "",
        releaseDate: "",
        isbn: "",
        category: "",
      },
      loanDate: "",
      returnDate: "",
      status: "ACTIVE",
    },
  });

  const loadLoan = async () => {
    try {
      const loan = await findLoanById(selectedLoanId as number);

      form.setValue('id', loan.id)
      form.setValue('libraryUser', loan.libraryUser)
      form.setValue('book', loan.book)
      form.setValue('loanDate', formatDate(loan.loanDate, "yyyy-MM-dd'T'HH:mm:ss", "dd/MM/yyyy"))
      form.setValue('returnDate', formatDate(loan.returnDate, "yyyy-MM-dd'T'HH:mm:ss", "dd/MM/yyyy"))
      form.setValue('status', loan.status)
    } catch (error) {
      console.error(error);
    }
  };

  const loadAvailableBooks = async () => {
    try {
      const books = await findAllAvailableBooks();
      setBooks(books);
    } catch (error) {
      console.error(error);
    }
  };

  const loadBooksRecommendations = async () => {
    try {
      const libraryUserId = form.getValues('libraryUser').id;
      const books = await findRecommendationsByLibraryUserId(libraryUserId as number);
      setBooks(books);
    } catch(error) {
      console.error(error);
    }
  }

  const loadLibraryUsers = async () => {
    try {
      const libraryUsers = await findAllLibraryUsers();
      setLibraryUsers(libraryUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const initSelects = async () => {
    await loadLibraryUsers();
    await loadAvailableBooks();
  };

  const handleSave = async (data: z.infer<typeof loanZodSchema>) => {
    const form = {
      ...(selectedLoanId && { id: data.id }),
      libraryUser: data.libraryUser,
      book: data.book,
      loanDate: formatDate(data.loanDate, "dd/MM/yyyy", "yyyy-MM-dd'T'HH:mm:ss"),
      returnDate: formatDate(data.returnDate, "dd/MM/yyyy", "yyyy-MM-dd'T'HH:mm:ss"),
      status: data.status
    }

    try {
      if (selectedLoanId) {
        await updateLoan(form as ILoan);
      } else {
        await createLoan(form as ILoan);
      }

      if (onSuccess) await onSuccess();
      toast({
        title: 'Emprestimo salvo com sucesso',
        description: 'O emprestimo foi salvo com sucesso',
        variant: 'success',
        duration: 3000
      })
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  useEffect(() => {
    if (showRecommendations && form.getValues('libraryUser')?.id) {
      loadBooksRecommendations();
    } else {
      loadAvailableBooks();
    }
  }, [showRecommendations])

  useEffect(() => {
    if (isOpen) {
      initSelects();
    }

    if (isOpen && selectedLoanId) {
      loadLoan();
    }

    if (!isOpen) {
      form.reset();
      setShowRecommendations(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <SliderDialog
      open={isOpen}
      onClose={onClose}
      title={selectedLoanId ? "Editar empréstimo" : "Novo empréstimo"}
    >
      <Form.Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className="flex flex-col gap-4 justify-between h-full"
        >
          <div className="flex flex-col gap-4">
            <Form.FormField
              name="libraryUser"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Usuário</Form.FormLabel>
                    <Form.FormControl>
                      <Select 
                        {...field} 
                        styles={customStyles}
                        options={libraryUsers} 
                        getOptionLabel={(option) => option.name} 
                        getOptionValue={(option) => option.id}
                        isDisabled={!!selectedLoanId}
                      />
                    </Form.FormControl>
                    <Form.FormMessage className="text-xs text-red-400" />
                  </Form.FormItem>
                );
              }}
            />
            <Form.FormField
              name="book"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <div className="flex flex-row justify-between items-center mb-1">
                      <Form.FormLabel>Livro</Form.FormLabel>
                      <div className="flex flex-row gap-2 items-center p-0">
                        <span className="text-xs">Mostrar recomendações</span>
                        <Checkbox 
                          className='h-4 w-4 text-white' 
                          checked={showRecommendations} 
                          onClick={() => setShowRecommendations(!showRecommendations)}
                          disabled={!form.getValues('libraryUser')?.id}
                        />
                      </div>
                    </div>
                    <Form.FormControl>
                      <Select
                        {...field}
                        styles={customStyles}
                        options={books}
                        getOptionLabel={(option) => option?.id ? `${option.title} - ${option.category}` : ''}
                        getOptionValue={(option) => option.id}
                        isDisabled={!!selectedLoanId}
                      />
                    </Form.FormControl>
                  </Form.FormItem>
                );
              }}
            />
            <Form.FormField
              name="loanDate"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Data de emprestimo</Form.FormLabel>
                    <Form.FormControl>
                    <DatePicker
                      onChange={field.onChange}
                      value={field.value}
                      hidden={{
                        after: new Date()
                      } as any}
                    />
                    </Form.FormControl>
                    <Form.FormMessage className='text-xs text-red-400' />
                  </Form.FormItem>
                );
              }}
            />
            <Form.FormField
              name="returnDate"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Data de devolução</Form.FormLabel>
                    <Form.FormControl>
                    <DatePicker
                      onChange={field.onChange}
                      value={field.value}
                      hidden={{
                        before: new Date()
                      } as any}
                    />
                    </Form.FormControl>
                    <Form.FormMessage className='text-xs text-red-400' />
                  </Form.FormItem>
                );
              }}
            />
            <Form.FormField 
              name="status"
              render={({ field }) => {
                return (
                  <Form.FormItem>
                    <Form.FormLabel>Status</Form.FormLabel>
                    <Form.FormControl>
                      <Select
                        {...field}
                        styles={customStyles}
                        value={{ value: field.value, label: LOAN_STATUS[field.value as keyof typeof LOAN_STATUS].label }}
                        onChange={(option) => field.onChange(option?.value)}
                        options={[
                          { value: 'ACTIVE', label: 'Ativo' },
                          { value: 'COMPLETED', label: 'Concluído' },
                          { value: 'OVERDUE', label: 'Atrasado' }
                        ]}
                        getOptionValue={(option) => option?.value}
                        getOptionLabel={(option) => option?.label}
                      />
                    </Form.FormControl>
                  </Form.FormItem>
                );
              }}
            />
          </div>
          <Button
            className="bg-primary text-white font-bold"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </Form.Form>
    </SliderDialog>
  );
};

export default LoanModal;
