import { z } from 'zod'

export const libraryUserZodSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1, { message: 'Nome obrigatorio' }),
  email: z.string().email('Email inválido').min(1, { message: 'Email obrigatorio' }),
  phone: z.string().min(1, { message: 'Telefone obrigatorio' }),
})
