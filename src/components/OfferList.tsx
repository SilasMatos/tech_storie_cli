import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import OfferCard from './OfferCard'
import { Offer } from '../types/types'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

type OfferListProps = {
  offers: Offer[]
  group: string[]
  selectedType: string[]
  handleCheckbox: (
    cadastro_produto: string,
    cardId: number,
    isSelected: boolean
  ) => void
  selectedOffers: { cardId: number; cadastro_produto: string }[]
}

const OfferList: React.FC<OfferListProps> = ({
  offers,
  group,
  handleCheckbox,
  selectedOffers,
  selectedType
}) => {
  const [baseTypes, setBaseTypes] = useState<string[]>([])
  console.log(baseTypes)

  const navigate = useNavigate()
  useEffect(() => {
    const newBaseTypes = group.map(groupName => {
      const foundOffer = offers.find(offer => offer.comboType === groupName)
      return foundOffer?.tipo_base ?? groupName
    })
    setBaseTypes(newBaseTypes)
  }, [group, offers])

  const handleSaveClick = () => {
    if (selectedOffers.length === 0) {
      message.warning(
        'Selecione pelo menos uma oferta antes de iniciar a tabulação'
      )
      return
    }
    Cookies.set('selectedOffers', JSON.stringify(selectedOffers), {
      expires: 7
    })
    navigate('/tabulador')
  }

  return (
    <div className="container mx-auto px-4 mt-6" id="offers">
      {group.map((groupName, index) => (
        <div key={index} className="rounded-lg mb-3">
          <div className="flex items-center p-2 bg-blue-500 text-center rounded-md mb-4">
            <h2 className="font-semibold text-white text-center w-full">
              {selectedType}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {offers
              .filter(offer => offer.comboType === groupName)
              .map((offer, idx) => (
                <OfferCard
                  key={idx}
                  offer={offer}
                  cardId={idx}
                  handleCheckbox={handleCheckbox}
                  selectedOffers={selectedOffers}
                />
              ))}
          </div>
        </div>
      ))}
      {offers.length > 0 && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleSaveClick}
            type="button"
            className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ${
              selectedOffers.length === 0
                ? ' cursor-not-allowed'
                : 'corsor-pointer'
            }`}
          >
            Iniciar Tabulação
          </button>
        </div>
      )}
    </div>
  )
}

export default OfferList
