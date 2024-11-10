import { IBook } from './book'
import { ILibraryUser } from './libraryUser'

export interface ILoan {
  id: number
  loanDate: string
  returnDate: string
  libraryUser: ILibraryUser
  book: IBook
  status: 'ACTIVE' | 'COMPLETED' | 'OVERDUE'
}
