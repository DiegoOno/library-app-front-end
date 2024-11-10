import { z } from 'zod'

export const bookZodSchema = z.object({
  id: z.number().nullish(),
  title: z.string().min(1, { message: 'Título obrigatorio' }),
  author: z.string().min(1, { message: 'Autor obrigatorio' }),
  releaseDate: z.string().min(1, { message: 'Data de lancamento obrigatorio' }),
  isbn: z.string().min(1, { message: 'ISBN obrigatorio' }),
  category: z.string().min(1, { message: 'Categoria obrigatorio' }),
})
