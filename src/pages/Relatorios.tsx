import { useState } from 'react'
import { DatePicker, Button, message } from 'antd'
import Cookies from 'js-cookie'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import locale from 'antd/es/date-picker/locale/pt_BR'

const { RangePicker } = DatePicker

const Relatorios = () => {
  const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(null)

  let accessToken = Cookies.get('accessToken')

  const handleExport = async () => {
    if (!dates) {
      message.error('Por favor, selecione um intervalo de datas.')
      return
    }

    const [startDate, endDate] = dates
    const formattedStartDate = startDate.format('YYYY-MM-DD')
    const formattedEndDate = endDate.format('YYYY-MM-DD')

    const exportUrl = `${
      import.meta.env.VITE_API_URL
    }/relatorio/${accessToken}&${formattedStartDate}&${formattedEndDate}`


    try {
      const response = await fetch(exportUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Erro ao exportar o relatório')
      }

      window.open(exportUrl, '_blank')
      message.success('Relatório exportado com sucesso!')
    } catch (error) {
      message.error('Erro ao exportar o relatório')
    }
  }

  return (
    <>
      <div className="mt-2 ">
        <h1 className="text-lg font-semibold text-gray-800">
          Exportar Relatorio
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-4">
          Selecione uma data inicial e uma data final e realize a exportação
        </p>
        <div style={{ marginBottom: '20px' }}>
          <RangePicker
            locale={locale}
            onChange={dates => setDates(dates as [Dayjs, Dayjs] | null)}
          />
        </div>

        <Button type="primary" onClick={handleExport}>
          Exportar
        </Button>
      </div>
    </>
  )
}

export default Relatorios
