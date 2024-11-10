'use client'

import { useEffect, useState } from 'react';

import Card from '@/components/ui/Card';

import { deleteLibraryUser, findAllLibraryUsers } from '@/service/libraryUserService';
import { Button } from '@/components/ui/Button';
import LibraryUserModal from './LibraryUserModal';
import DataTable from '@/components/ui/Table';
import { getLibraryUserTableColumns } from '../utils/getLibraryUserTableColumns';
import { toast } from '@/hooks/use-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  
  const loadUsers = async () => {
    try {
      const users = await findAllLibraryUsers();
      setUsers(users);
    } catch(error) {
      console.error(error);
    }
  }

  const renderCreateButton = () => {
    return  (
      <Button 
        className="bg-primary text-white font-bold"
        onClick={() => setIsOpen(true)}
      >
        Criar Usuário
      </Button>
    )
  }

  const handleSelectUser = (id: number) => {
    setSelectedUserId(id)
    setIsOpen(true)
  }
  
  const handleDelete = async (id: number) => {

    if (window.confirm('Tem certeza que deseja excluir o usuário?')) {
      try {
        await deleteLibraryUser(id)
        await loadUsers()
        toast({
          title: 'Usuário excluido com sucesso',
          description: 'O usuário foi excluido com sucesso',
          variant: 'success',
          duration: 3000
        })
      } catch(error) {
        console.error(error);
      }
    }
  }

  const handleSuccess = async () => {
    setIsOpen(false)
    setSelectedUserId(undefined)
    await loadUsers()
  }

  useEffect(() => {
    loadUsers();
  }, [])

  return (
    <Card className="h-fit" title="Usuários" headerButton={renderCreateButton()}>
      <DataTable 
        columns={getLibraryUserTableColumns({ handleDelete })}
        data={users}
        isLoading={false}
        onClickRow={(data) => handleSelectUser(data.id)}
      />
      <LibraryUserModal 
        isOpen={isOpen} 
        selectedUserId={selectedUserId}
        onSuccess={handleSuccess} 
        onClose={() => {
          setSelectedUserId(undefined);
          setIsOpen(false);
        }}
      />
    </Card>
  );
}

export default Users
