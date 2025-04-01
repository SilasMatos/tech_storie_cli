import React, { useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { TiArrowBackOutline } from 'react-icons/ti'

type buttonProps = {
  title: string
  handle: VoidFunction
  disabled?: boolean
  style?: 'purple' | 'dark'
  type?: 'button' | 'submit' | 'reset' | 'search' | 'return'
}

const Button: React.FC<buttonProps> = ({
  title,
  handle,
  type,
  disabled,
  style
}) => {
  const [isRotating, setIsRotating] = useState(false)

  const handleClick = () => {
    if (type === 'reset') {
      setIsRotating(true)
      setTimeout(() => {
        setIsRotating(false)
      }, 2000)
    }
    handle()
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type="button"
      className={
        style === 'purple'
          ? 'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm flex items-center justify-center px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800'
          : 'text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm flex items-center justify-center px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800'
      }
    >
      {type === 'submit' ? (
        <PaperAirplaneIcon className="h-5 w-5 inline-block me-1" />
      ) : type === 'search' ? (
        <MagnifyingGlassIcon className="h-5 w-5 inline-block me-1" />
      ) : type === 'reset' ? (
        <ArrowPathIcon
          className={`h-5 w-5 inline-block me-1 transition-transform ${
            isRotating ? 'animate-spin' : ''
          }`}
        />
      ) : type === 'return' ? (
        <TiArrowBackOutline className="h-5 w-5 inline-block me-1" />
      ) : (
        <PaperAirplaneIcon className="h-5 w-5 inline-block me-1" />
      )}
      {title}
    </button>
  )
}

export default Button
