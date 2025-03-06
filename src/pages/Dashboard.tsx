import CardChart from '../components/CardChart'
import MonthlyCharts from '../components/MonthlyCharts'
import RadialCardCharts from '../components/RadialChart'

const Dashboard = () => {
  const radialChartData = [
    { label: 'Categoria 1', value: 30 },
    { label: 'Categoria 2', value: 40 },
    { label: 'Categoria 3', value: 50 }
  ]
  const genericData = [
    { name: 'Jan', Produtos: 30 },
    { name: 'Feb', Produtos: 40 },
    { name: 'Mar', Produtos: 35 },
    { name: 'Apr', Produtos: 50 },
    { name: 'May', Produtos: 55 },
    { name: 'Jun', Produtos: 60 },
    { name: 'Jul', Produtos: 70 },
    { name: 'Aug', Produtos: 65 },
    { name: 'Sep', Produtos: 75 },
    { name: 'Oct', Produtos: 80 },
    { name: 'Nov', Produtos: 85 },
    { name: 'Dec', Produtos: 90 }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2 min-h-full">
      <div className="col-span-1">
        <CardChart title="Produtos Cadastrados" amount="3" loading={false} />
      </div>
      <div className="col-span-1">
        <CardChart title="Produtos Vendidos" amount="5" loading={false} />
      </div>
      <div className="col-span-1">
        <CardChart title="Produtos " amount="5" loading={false} />
      </div>
      <div className="col-span-1 lg:row-span-2">
        <RadialCardCharts
          title="Valor Total"
          data={radialChartData}
          loading={false}
        />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-dark-box shadow-lg rounded-lg p-4">
        <MonthlyCharts
          title="Dados Mensais"
          loading={false}
          data={genericData}
        />
      </div>
    </div>
  )
}

export default Dashboard
