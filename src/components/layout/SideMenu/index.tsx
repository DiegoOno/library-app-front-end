'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const SideMenu = () => {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col p-16 pt-32  bg-[#f1f1f1] rounded-tr-lg rounded-br-lg gap-4">
      <Link 
        className={cn("text-xl font-bold text-[#505050]", pathname === '/library-user' ? 'text-primary' : '')} 
        href="/library-user"
      >
        Usuários
      </Link>
      <Link 
        className={cn("text-xl font-bold text-[#505050]", pathname === '/book' ? 'text-primary' : '')} 
        href="/book"
      >
        Livros
      </Link>
      <Link 
        className={cn("text-xl font-bold text-[#505050]", pathname === '/loan' ? 'text-primary' : '')} 
        href="/loan"
      >
        Emprestimos
      </Link>
    </div>
  )
}

export default SideMenu
