import React from 'react'
import { Skeleton } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

interface MonthlyChartsProps {
  title: string
  loading: boolean
  data: { name: string; Produtos: number }[]
}

const MonthlyCharts: React.FC<MonthlyChartsProps> = ({
  title,
  loading,
  data
}) => {
  return (
    <>
      {loading ? (
        <Skeleton.Input style={{ width: '50%', height: 20 }} active />
      ) : (
        <h3 className="text-lg font-medium mb-1 text-gray-300">{title}</h3>
      )}
      <div>
        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : (
          <ResponsiveContainer
            width="100%"
            height={550}
            className="-ml-5 text-purple-500"
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#340094" />
              <XAxis dataKey="name" stroke="#6f42c1" />
              <YAxis stroke="#6f42c1" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Produtos" stroke="#6f42c1" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  )
}

export default MonthlyCharts
