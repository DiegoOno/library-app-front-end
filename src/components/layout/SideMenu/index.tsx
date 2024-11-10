'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const SideMenu = () => {
  const pathname = usePathname()

  return (
    <div className="h-full flex w-[350px] flex-col  pt-32  bg-[#f1f1f1] rounded-tr-lg rounded-br-lg gap-4 items-center">
      <Link 
        className={cn(
          "text-xl font-bold text-[#505050] w-full py-2 rounded-md text-center", 
          pathname === '/library-user' ? 'text-white bg-primary' : ''
        )} 
        href="/library-user"
      >
        Usuários
      </Link>
      <Link 
        className={cn(
          "text-xl font-bold text-[#505050] w-full py-2 rounded-md text-center", 
          pathname === '/book' ? 'text-white bg-primary' : ''
        )} 
        href="/book"
      >
        Livros
      </Link>
      <Link 
        className={cn(
          "text-xl font-bold text-[#505050] w-full py-2 rounded-md text-center", 
          pathname === '/loan' ? 'text-white bg-primary' : ''
        )} 
        href="/loan"
      >
        Empréstimos
      </Link>
    </div>
  )
}

export default SideMenu
