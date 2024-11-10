'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DataTable from '@/components/ui/Table'
import { findAllLoans } from '@/service/loanService'
import { getLoanTableColumns } from '../utils/getLoanTableColumns'
import LoanModal from './LoanModal'
import { ILoan } from '@/interface/loan'

const Loans = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loanSelectedId, setLoanSelectedId] = useState<number | undefined>(undefined)
  const [loans, setLoans] = useState([])

  const renderCreateButton = () => {
    return (
      <Button 
        className="bg-primary text-white font-bold"
        onClick={() => setIsOpen(true)}
      >
        Realizar Empréstimo
      </Button>
    )
  }

  const loadLoans = async () => {
    try {
      const loans = await findAllLoans();
      setLoans(loans.sort((a: ILoan, b: ILoan) => a.id - b.id))
    } catch(error) {
      console.error(error)
    }
  }

  const handleSuccess = async () => {
    await loadLoans()
    setIsOpen(false)
    setLoanSelectedId(undefined)
  }

  const handleSelectLoan = (row: ILoan) => {
    setLoanSelectedId(row.id)
    setIsOpen(true)
  }

  useEffect(() => {
    loadLoans()
  }, [])
  
  return (
    <Card title='Empréstimos' headerButton={renderCreateButton()}>
      <DataTable 
        data={loans}
        columns={getLoanTableColumns()}
        onClickRow={handleSelectLoan}
      />
      <LoanModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setLoanSelectedId(undefined)
        }}
        onSuccess={handleSuccess}
        selectedLoanId={loanSelectedId}
      />
    </Card>
  )
}

export default Loans
