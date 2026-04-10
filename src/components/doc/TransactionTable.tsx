'use client'

import React from 'react'
import { useResultStore, type TransactionRow } from '@/stores/useResultStore'
import { FiTrash2 } from 'react-icons/fi'

const TransactionTable: React.FC = () => {
  const transactions = useResultStore(state => state.transactions)
  const setTransactions = useResultStore(state => state.setTransactions)
  const updateTransaction = useResultStore(state => state.updateTransaction)

  const handleRemoveRow = (index: number) => {
    const newTransactions = [...transactions]
    newTransactions.splice(index, 1)
    setTransactions(newTransactions)
  }

  const handleInputChange = (index: number, field: keyof TransactionRow, value: string | number) => {
    updateTransaction(index, { [field]: value })
  }

  if (transactions.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm max-h-[50vh] scrollbar-thin scrollbar-thumb-gray-300">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-gray-50 z-10">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Debit</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Credit</th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((tx, index) => (
            <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={tx.date}
                  onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-1 focus:ring-green-500 rounded p-1 text-sm outline-none"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={tx.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-1 focus:ring-green-500 rounded p-1 text-sm outline-none"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={tx.debit === 0 ? '' : tx.debit}
                  placeholder="0"
                  step="0.01"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => handleInputChange(index, 'debit', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                  className="w-full bg-transparent border-none focus:ring-1 focus:ring-green-500 rounded p-1 text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={tx.credit === 0 ? '' : tx.credit}
                  placeholder="0"
                  step="0.01"
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => handleInputChange(index, 'credit', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                  className="w-full bg-transparent border-none focus:ring-1 focus:ring-green-500 rounded p-1 text-sm outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleRemoveRow(index)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove row"
                >
                  <FiTrash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
