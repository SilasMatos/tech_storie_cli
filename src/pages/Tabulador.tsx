import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Textarea from '../components/common/Textarea'
import Button from '../components/common/Button'
import ButtonForm from '../components/common/ButtonForm'
import { Popconfirm, message } from 'antd'
import { useCreateTabulation } from '../hook/useMutation'
import {
  segmentOptions,
  cancelReasonOptions,
  subOptionsIfAtendimento,
  subOptionsIfConcorrencia,
  subOptionsIfErroDeVenda,
  subOptionsIfFinanceiro,
  subOptionsIfIrreversivel,
  subOptionsIfNaoInformado,
  subOptionsIfOutros,
  subOptionsIfPoucoUso,
  subOptionsIfPreco,
  subOptionsIfProduto,
  subOptionsIfReajusteDePrecoFaturamento,
  subOptionsIfTecnico,
  statusOptions
} from '../constants/selectOptions'
import { useNavigate } from 'react-router-dom'

const subOptionsMap: { [key: string]: { value: string; label: string }[] } = {
  ATENDIMENTO: subOptionsIfAtendimento,
  CONCORRÊNCIA: subOptionsIfConcorrencia,
  'ERRO DE VENDA': subOptionsIfErroDeVenda,
  FINANCEIRO: subOptionsIfFinanceiro,
  INFORMAÇÕES: [],
  IRREVERSIVEL: subOptionsIfIrreversivel,
  'NÃO INFORMADO': subOptionsIfNaoInformado,
  OUTROS: subOptionsIfOutros,
  'POUCO USO': subOptionsIfPoucoUso,
  PRECO: subOptionsIfPreco,
  PRODUTO: subOptionsIfProduto,
  'REAJUSTE DE PRECO/FATURAMENTO': subOptionsIfReajusteDePrecoFaturamento,
  TÉCNICO: subOptionsIfTecnico
}

const Tabulador: React.FC = () => {
  let cookiesData = Cookies.get('userData')
  let userData = cookiesData ? JSON.parse(cookiesData) : null

  const initialFormData = {
    login: userData ? userData.LOGIN : '',
    matricula: userData ? userData.MATRICULA : '',
    supervisor: userData ? userData.SUPERVISOR : '',
    coordenador: userData ? userData.COORDENADOR : '',
    servico: userData ? userData.SERVICO : '',
    codigo_cidade: '',
    numero_contrato: '',
    segmento: '',
    motivo_cancelamento: '',
    submotivo_cancelamento: '',
    oferta_escolhida: 'Oferta não escolhida',
    status: '',
    observacoes: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<any>({})
  const [subCancelReasonOptions, setSubCancelReasonOptions] = useState<
    { value: string; label: string }[]
  >([])

  const navigate = useNavigate()
  const { mutate, isPending, isError, error } = useCreateTabulation()
  const ofertaEscolhidaRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const codigo_cidade = JSON.parse(Cookies.get('cod_cidade') || '[]')[0] || ''
    const selectedOffers = JSON.parse(Cookies.get('selectedOffers') || '[]')
    const numero_contrato = Cookies.get('numero_contrato') || ''
    const segmento = Cookies.get('segmento') || ''
    const motivo_cancelamento = Cookies.get('motivo_cancelamento') || ''
    const submotivo_cancelamento = Cookies.get('submotivo_cancelamento') || ''

    const oferta_escolhida = selectedOffers.length
      ? selectedOffers
          .map((offer: { cadastro_produto: string }) => offer.cadastro_produto)
          .join(' ')
      : 'Oferta não escolhida'

    setFormData(prev => ({
      ...prev,
      codigo_cidade,
      oferta_escolhida,
      numero_contrato,
      segmento,
      motivo_cancelamento,
      submotivo_cancelamento
    }))

    if (motivo_cancelamento) {
      setSubCancelReasonOptions(subOptionsMap[motivo_cancelamento] || [])
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target

    if (name === 'numero_contrato' && value.length > 9) {
      setErrors({
        ...errors,
        [name]: 'O número do contrato não pode exceder 9 dígitos'
      })
      return
    }

    setFormData({
      ...formData,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: ''
    })

    if (name === 'motivo_cancelamento') {
      setSubCancelReasonOptions(subOptionsMap[value] || [])
      setFormData(prev => ({
        ...prev,
        submotivo_cancelamento: ''
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'numero_contrato' && value.length === 9) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: any = {}

    Object.keys(formData).forEach(key => {
      if (
        !formData[key as keyof typeof formData] &&
        key !== 'oferta_escolhida'
      ) {
        newErrors[key] = 'Este campo é obrigatório'
      }
    })

    if (formData.numero_contrato.length > 9) {
      newErrors.numero_contrato =
        'O número do contrato não pode exceder 9 dígitos'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (!formData.oferta_escolhida) {
      setFormData(prev => ({
        ...prev,
        oferta_escolhida: 'Oferta não escolhida'
      }))
    }

    mutate(formData, {
      onSuccess: data => {
        Cookies.remove('selectedOffers')
        Cookies.remove('cod_cidade')
        Cookies.remove('numero_contrato')
        Cookies.remove('segmento')
        Cookies.remove('motivo_cancelamento')
        Cookies.remove('submotivo_cancelamento')

        message.success('Tabulação realizada com sucesso!')
        resetForm()
      },
      onError: error => {
        console.error('Error:', error)
        message.error('Erro ao realizar a tabulação!')
      }
    })
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setErrors({})
    Cookies.remove('selectedOffers', { path: '/' })
    Cookies.remove('cod_cidade', { path: '/' })
    Cookies.remove('numero_contrato', { path: '/' })
    Cookies.remove('segmento', { path: '/' })
    Cookies.remove('motivo_cancelamento', { path: '/' })
    Cookies.remove('submotivo_cancelamento', { path: '/' })
  }

  const handleBackOffers = () => {
    Cookies.set('cod_cidade', JSON.stringify([formData.codigo_cidade]), {
      expires: 7
    })
    Cookies.set('numero_contrato', formData.numero_contrato, { expires: 7 })
    Cookies.set('segmento', formData.segmento, { expires: 7 })
    Cookies.set('motivo_cancelamento', formData.motivo_cancelamento, {
      expires: 7
    })
    Cookies.set('submotivo_cancelamento', formData.submotivo_cancelamento, {
      expires: 7
    })
    navigate('/ofertas')
  }

  return (
    <div className="flex items-center justify-center p-2">
      <div className="bg-white p-4 rounded  border w-full ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold ">Tabulador</h2>
          <Button title="Resetar" handle={resetForm} type="reset" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-full md:w-1/2">
              <Input
                label="Código da Cidade"
                name="codigo_cidade"
                error={errors.codigo_cidade}
                errorMessage={errors.codigo_cidade}
                value={formData.codigo_cidade}
                onChange={handleChange}
              />
            </div>
            <div className="px-2 w-full md:w-1/2">
              <Input
                label="Número do Contrato"
                name="numero_contrato"
                type="number"
                error={errors.numero_contrato}
                errorMessage={errors.numero_contrato}
                value={formData.numero_contrato}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-full md:w-1/3">
              <Select
                label="Segmento"
                name="segmento"
                error={errors.segmento}
                errorMessage={errors.segmento}
                value={formData.segmento}
                onChange={handleChange}
                options={segmentOptions}
              />
            </div>
            <div className="px-2 w-full md:w-1/3">
              <Select
                label="Motivo do Cancelamento"
                name="motivo_cancelamento"
                error={errors.motivo_cancelamento}
                errorMessage={errors.motivo_cancelamento}
                value={formData.motivo_cancelamento}
                onChange={handleChange}
                options={cancelReasonOptions}
              />
            </div>
            <div className="px-2 w-full md:w-1/3">
              <Select
                label="Submotivo do Cancelamento"
                name="submotivo_cancelamento"
                error={errors.submotivo_cancelamento}
                errorMessage={errors.submotivo_cancelamento}
                value={formData.submotivo_cancelamento}
                onChange={handleChange}
                options={subCancelReasonOptions}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-full ">
              <Popconfirm
                title="Deseja consultar ofertas?"
                onConfirm={handleBackOffers}
                okText="Sim"
                cancelText="Não"
                placement="bottom"
              >
                <div>
                  <Input
                    label="Oferta Escolhida"
                    name="oferta_escolhida"
                    error={errors.oferta_escolhida}
                    errorMessage={errors.oferta_escolhida}
                    value={formData.oferta_escolhida}
                    onChange={handleChange}
                    ref={ofertaEscolhidaRef}
                  />
                </div>
              </Popconfirm>
            </div>
            <div className="px-2 w-full ">
              <Select
                label="Status"
                name="status"
                error={errors.status}
                errorMessage={errors.status}
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
              />
            </div>
          </div>

          <Textarea
            label="Observações"
            name="observacoes"
            error={errors.observacoes}
            errorMessage={errors.observacoes}
            value={formData.observacoes}
            onChange={handleChange}
          />

          <div className="mt-4">
            <ButtonForm
              title="Enviar"
              loading={isPending}
              disabled={isPending}
            />
          </div>
        </form>
        {isError && <p className="text-red-500">{error?.message}</p>}
      </div>
    </div>
  )
}

export default Tabulador
