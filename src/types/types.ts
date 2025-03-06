export type Product = {
  produto: string;
  valor: number;
  cadastro: string;
};

export interface Offer {
  id_combo: number
  tipo_base: string
  oferta_base: string
  valor_base: number
  cadastro_base: string

  produto_extra?: string
  valor_extra?: number
  cadastro_extra?: string

  extras?: {
    id_extra: number
    tipo_extra: string
    oferta_extra: string
    valor_extra: number
    cadastro_extra: string
  }[]


  valor_total?: number

  comboType?: 'SINGLES' | 'DOUBLE' | 'COMBOS'
}

//types/types.ts
export interface createTabulation {
  login: string
  matricula: string
  supervisor: string
  coordenador: string
  servico: string
  codigo_cidade: string
  numero_contrato: string
  segmento: string
  motivo_cancelamento: string
  submotivo_cancelamento: string
  oferta_escolhida: string
  status: string
  observacoes: string
}


export interface searchOfferstype {
  valor: string;
  cod_cidade: string;
  combos: string;
  tipo: string;
}


export interface Products {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  supplier?: number;
  createdBy?: number;
}
