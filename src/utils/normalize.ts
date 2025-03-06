// src/utils/normalize.ts
import { Offer } from '../types/types'
export function normalizeOffers(data: any[]): Offer[] {
  if (!data.length) return []
  const comboType = data[0].combos?.toUpperCase().trim() ?? ''
  if (comboType === 'SINGLES') {
    return data.map(item => {
      return {
        id_combo: item.id_combo,

        tipo_base: item.tipo,

        oferta_base: item.oferta,

        valor_base: item.valor,

        cadastro_base: item.oferta,
        produto_extra: undefined,
        valor_extra: undefined,
        cadastro_extra: undefined,
        extras: undefined,
        comboType: 'SINGLES',
      }
    })
  }
  if (comboType === 'DOUBLE') {
    return data.map(item => {

      return {
        id_combo: item.id_base,
        tipo_base: item.tipo_base,
        oferta_base: item.oferta_base,
        valor_base: item.valor_base,
        cadastro_base: item.cadastro_base,

        produto_extra: item.produto_extra,
        valor_extra: item.valor_extra,
        cadastro_extra: item.cadastro_extra,
        extras: undefined,


        valor_total: undefined,

        comboType: 'DOUBLE',
      }
    })
  }


  if (comboType === 'COMBOS') {
    return data.map(item => {

      return {
        id_combo: item.id_base,
        tipo_base: item.tipo_base,
        oferta_base: item.oferta_base,
        valor_base: item.valor_base,
        cadastro_base: item.cadastro_base,


        produto_extra: undefined,
        valor_extra: undefined,
        cadastro_extra: undefined,
        extras: [
          {
            id_extra: item.id_extra1,
            tipo_extra: item.tipo_extra1,
            oferta_extra: item.oferta_extra1,
            valor_extra: item.valor_extra1,
            cadastro_extra: item.cadastro_extra1,
          },
          {
            id_extra: item.id_extra2,
            tipo_extra: item.tipo_extra2,
            oferta_extra: item.oferta_extra2,
            valor_extra: item.valor_extra2,
            cadastro_extra: item.cadastro_extra2,
          },
        ],

        valor_total: item.valor_total,
        comboType: 'COMBOS',
      }
    })
  }


  return []
}
