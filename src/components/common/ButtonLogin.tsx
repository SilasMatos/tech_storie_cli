import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Loader2, BadgeCheck, XCircle } from 'lucide-react'

interface ButtonLoginProps {
  initialLabel?: string
  loadingLabel?: string
  successLabel?: string
  errorLabel?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  className?: string
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({
  initialLabel = 'Entrar',
  loadingLabel = 'Carregando...',
  successLabel = 'Sucesso!',
  errorLabel = 'Ocorreu um erro',
  onClick,
  className = ''
}) => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const createGreenParticles = (parent: HTMLButtonElement) => {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.style.position = 'absolute'
      particle.style.width = '6px'
      particle.style.height = '6px'
      particle.style.borderRadius = '50%'
      particle.style.backgroundColor = '#08b408'
      particle.style.left = '50%'
      particle.style.top = '50%'
      particle.style.zIndex = '9999'
      parent.appendChild(particle)
      const angle = Math.random() * Math.PI * 2
      const distance = 50 + Math.random() * 50
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      gsap.to(particle, {
        duration: 0.8,
        x,
        y,
        opacity: 0,
        ease: 'power1.out',
        onComplete: () => {
          particle.remove()
        }
      })
    }
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return
    setStatus('loading')

    try {
      await onClick(e)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  useEffect(() => {
    if (buttonRef.current && (status === 'success' || status === 'error')) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }
      )

      if (status === 'success') {
        createGreenParticles(buttonRef.current)
      }
    }
  }, [status])

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{loadingLabel}</span>
          </div>
        )
      case 'success':
        return (
          <div className="flex items-center justify-center gap-2">
            <BadgeCheck className="w-5 h-5" />
            <span>{successLabel}</span>
          </div>
        )
      case 'error':
        return (
          <div className="flex items-center justify-center gap-2">
            <XCircle className="w-5 h-5" />
            <span>{errorLabel}</span>
          </div>
        )
      default:
        return initialLabel
    }
  }

  const baseClasses = `
    text-white w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
    transition duration-400 disabled:cursor-not-allowed
    relative
  `

  const statusClasses = {
    idle: `
      bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700
      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300
      shadow-lg shadow-purple-500/50
    `,
    loading: `
      bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700
      hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300
      shadow-lg shadow-purple-500/50
    `,
    success: `
      bg-green-600 hover:bg-green-700 focus:ring-4 
      focus:outline-none focus:ring-green-300 
    `,
    error: `
      bg-red-600 hover:bg-red-700 focus:ring-4 
      focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50
    `
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      disabled={status === 'loading'}
      className={`
        ${baseClasses} 
        ${statusClasses[status] || statusClasses.idle} 
        ${className}
      `}
    >
      {renderContent()}
    </button>
  )
}

export default ButtonLogin
