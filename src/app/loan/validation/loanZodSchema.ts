import { bookZodSchema } from '@/app/book/validation/bookZodSchema'
import { libraryUserZodSchema } from '@/app/library-user/validation/libraryUserZodShema'
import { z } from 'zod'

export const loanZodSchema = z.object({
  id: z.number().nullish(),
  libraryUser: libraryUserZodSchema,
  book: bookZodSchema,
  loanDate: z.string().min(1, { message: 'Data de emprestimo obrigatorio' }),
  returnDate: z.string().min(1, { message: 'Data de devolucao obrigatorio' }),
  status: z.string().min(1, { message: 'Status obrigatorio' }),
})