import React from 'react'
import { Skeleton } from 'antd'

interface CardChartProps {
  title: string
  amount: string
  loading: boolean
}

const CardChart: React.FC<CardChartProps> = ({ title, amount, loading }) => (
  <div className="bg-dark-box shadow-xl rounded-lg p-6 ">
    {loading ? (
      <div>
        <Skeleton.Input
          style={{ width: '50%', height: 32 }}
          active
          className=""
        />
        <div className="flex items-center mt-4">
          <Skeleton.Avatar size={24} active />
          <Skeleton.Input
            style={{ width: '30%', height: 16 }}
            active
            className="ml-2"
          />
        </div>
      </div>
    ) : (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-200">{title}</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-main">{amount}</div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-purple-main"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
    )}
  </div>
)

export default CardChart
