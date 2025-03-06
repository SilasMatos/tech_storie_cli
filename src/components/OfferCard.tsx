// src/components/OfferCard.tsx
import React from 'react'
import { Offer } from '../types/types'

type OfferCardProps = {
  offer: Offer
  cardId: number
  handleCheckbox: (
    cadastro_produto: string,
    cardId: number,
    isSelected: boolean
  ) => void
  selectedOffers: { cardId: number; cadastro_produto: string }[]
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  cardId,
  handleCheckbox,
  selectedOffers
}) => {
  const computedValorTotal = offer.valor_total
    ? offer.valor_total
    : (offer.valor_base || 0) +
      (offer.extras
        ? offer.extras.reduce((acc, e) => acc + (e.valor_extra ?? 0), 0)
        : offer.valor_extra || 0)

  const isCheckedBase = selectedOffers.some(
    item =>
      item.cardId === cardId && item.cadastro_produto === offer.cadastro_base
  )

  return (
    <div className="p-5 bg-white rounded-lg border shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-blue-900">
          {offer.oferta_base}
        </h2>
      </div>

      {/* Produto base */}
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <div className="flex flex-col">
          <p className="text-gray-800 font-medium text-sm">
            {offer.oferta_base}
          </p>
          <p className="text-gray-600 text-xs">
            R$ {(offer.valor_base || 0).toFixed(2)}
          </p>
        </div>
        <input
          type="checkbox"
          checked={isCheckedBase}
          onChange={e =>
            handleCheckbox(
              // Identifica o que estamos selecionando
              offer.cadastro_base,
              // Identifica o card
              cardId,
              // valor do checkbox
              e.target.checked
            )
          }
          className="form-checkbox text-blue-600 border-gray-300 rounded-full"
        />
      </div>

      {/* Se for DOUBLE (possui 'produto_extra') */}
      {offer.produto_extra && (
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <div className="flex flex-col">
            <p className="text-gray-800 font-medium text-sm">
              {offer.produto_extra}
            </p>
            <p className="text-gray-600 text-xs">
              R$ {(offer.valor_extra || 0).toFixed(2)}
            </p>
          </div>
          <input
            type="checkbox"
            checked={selectedOffers.some(
              item =>
                item.cardId === cardId &&
                item.cadastro_produto === offer.cadastro_extra
            )}
            onChange={e =>
              handleCheckbox(
                offer.cadastro_extra ?? '',
                cardId,
                e.target.checked
              )
            }
            className="form-checkbox text-blue-600 border-gray-300 rounded-full"
          />
        </div>
      )}

      {/* Se for COMBOS (possui array 'extras') */}
      {offer.extras?.map((extra, idx) => {
        const isCheckedExtra = selectedOffers.some(
          item =>
            item.cardId === cardId &&
            item.cadastro_produto === extra.cadastro_extra
        )

        return (
          <div
            key={idx}
            className="flex justify-between items-center border-b pb-3 mb-3"
          >
            <div className="flex flex-col">
              <p className="text-gray-800 font-medium text-sm">
                {extra.oferta_extra}
              </p>
              <p className="text-gray-600 text-xs">
                R$ {(extra.valor_extra || 0).toFixed(2)}
              </p>
            </div>
            <input
              type="checkbox"
              checked={isCheckedExtra}
              onChange={e =>
                handleCheckbox(extra.cadastro_extra, cardId, e.target.checked)
              }
              className="form-checkbox text-blue-600 border-gray-300 rounded-full"
            />
          </div>
        )
      })}

      <div className="flex justify-between items-center pt-3">
        <p className="text-sm font-bold text-gray-900">Valor Total:</p>
        <p className="text-sm font-bold text-blue-800">
          R$ {computedValorTotal.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default OfferCard
