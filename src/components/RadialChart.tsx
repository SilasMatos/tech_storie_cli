import React, { useEffect, useRef } from 'react'
import ApexCharts from 'apexcharts'
import { Skeleton } from 'antd'

interface RadialChartProps {
  series: number[]
  labels: string[]
  colors: string[]
  loading: boolean
}

const getChartOptions = (
  series: number[],
  labels: string[],
  colors: string[]
) => ({
  series,
  colors,
  chart: {
    type: 'radialBar',
    sparkline: {
      enabled: true
    }
  },
  plotOptions: {
    radialBar: {
      track: {
        background: '#363636'
      },
      dataLabels: {
        show: false
      },
      hollow: {
        margin: 0,
        size: '32%'
      }
    }
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -23,
      bottom: -20
    }
  },
  labels,
  legend: {
    show: true,
    position: 'bottom',
    fontFamily: 'Inter, sans-serif'
  },
  tooltip: {
    enabled: true
  }
})

const RadialChart: React.FC<RadialChartProps> = ({
  series,
  labels,
  colors,
  loading
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loading) {
      const chartOptions = getChartOptions(series, labels, colors)

      let chart: ApexCharts | null = null
      if (chartRef.current) {
        chart = new ApexCharts(chartRef.current, chartOptions)
        chart.render()
      }

      return () => {
        if (chart) chart.destroy()
      }
    }
  }, [loading, series, labels, colors])

  return loading ? (
    <Skeleton active />
  ) : (
    <div ref={chartRef} className="py-2" id="radial-chart" />
  )
}

interface RadialCardChartsProps {
  title: string
  data: { label: string; value: number }[]
  loading: boolean
}

const RadialCardCharts: React.FC<RadialCardChartsProps> = ({
  title,
  data,
  loading
}) => {
  const series = data.map(item => item.value)
  const labels = data.map(item => item.label)
  const colors = ['#b799ee', '#b799ee', '#b799ee']

  return (
    <div className="max-w-sm w-full h-full bg-dark-box rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          {loading ? (
            <Skeleton.Input style={{ width: 200 }} active />
          ) : (
            <h5 className="text-base font-medium leading-none text-gray-300 dark:text-dark-text2 pe-1">
              {title}
            </h5>
          )}
        </div>
      </div>

      <div className="bg-dark-bg-soft p-2 rounded-lg">
        <div className="grid grid-cols-3 gap-2 mb-2">
          {loading ? (
            <Skeleton active />
          ) : (
            data.map((item, index) => {
              const color = colors[index % colors.length]
              return (
                <dl
                  key={index}
                  className="rounded-lg flex flex-col items-center justify-center h-[90px] min-w-[50px]"
                  style={{ backgroundColor: `${color}33` }}
                >
                  <dt
                    className="w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center mb-1"
                    style={{ backgroundColor: `${color}66`, color: color }}
                  >
                    {item.value}
                  </dt>
                  <dd
                    className="text-sm font-medium text-center"
                    style={{ color: color }}
                  >
                    {item.label}
                  </dd>
                </dl>
              )
            })
          )}
        </div>
      </div>

      <RadialChart
        series={series}
        labels={labels}
        colors={colors}
        loading={loading}
      />
    </div>
  )
}

export default RadialCardCharts
