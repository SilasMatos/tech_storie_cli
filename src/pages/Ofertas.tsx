// Exemplo em Home.tsx
import React, { useState } from 'react'
import { Offer } from '../types/types'
import Navbar from '../components/Navbar'
import FormInsert from '../components/FormInsert'
import OfferList from '../components/OfferList'

const Ofertas: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([])
  const [group, setGroup] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedOffers, setSelectedOffers] = useState<
    { cardId: number; cadastro_produto: string }[]
  >([])

  const handleCheckbox = (
    cadastro_produto: string,
    cardId: number,
    isSelected: boolean
  ) => {
    setSelectedOffers(prev => {
      let updated
      if (isSelected) {
        const filtered = prev.filter(item => item.cardId === cardId)
        updated = [...filtered, { cardId, cadastro_produto }]
      } else {
        updated = prev.filter(
          item =>
            !(
              item.cardId === cardId &&
              item.cadastro_produto === cadastro_produto
            )
        )
      }

      return updated
    })
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-auto">
      <Navbar />
      <FormInsert
        setOffers={setOffers}
        setGroup={setGroup}
        setSelectedType={setSelectedType}
      />
      <OfferList
        offers={offers}
        group={group}
        handleCheckbox={handleCheckbox}
        selectedOffers={selectedOffers}
        selectedType={selectedType}
      />
    </div>
  )
}

export default Ofertas
