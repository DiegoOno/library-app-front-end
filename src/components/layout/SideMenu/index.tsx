import Link from 'next/link'

const SideMenu = () => {
  return (
    <div className="h-full flex flex-col p-16 pt-32  bg-[#f1f1f1] rounded-tr-lg rounded-br-lg gap-4">
      <Link 
        className="text-2xl font-bold" 
        href="/library-user"
      >
        Usuários
      </Link>
      <Link 
        className="text-2xl font-bold" 
        href="/book"
      >
        Livros
      </Link>
      <Link 
        className="text-2xl font-bold" 
        href="/loan"
      >
        Emprestimos
      </Link>
    </div>
  )
}

export default SideMenu
