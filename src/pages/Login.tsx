import React, { useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import img from '../assets/image_login.png'
import { useLogin } from '../hook/useLogin'
import { useForm } from 'react-hook-form'
import { CircleAlert } from 'lucide-react'
import logo from '../assets/store.png'
import { motion } from 'framer-motion'

interface FormInputs {
  email: string
  password: string
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    mode: 'onSubmit'
  })
  const { mutate, isPending } = useLogin()

  const onSubmit = (data: FormInputs) => {
    mutate(data)
  }

  const [isCapsLockOn, setIsCapsLockOn] = useState(false)

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setIsCapsLockOn(event.getModifierState('CapsLock'))
  }
  return (
    <div className="flex min-h-screen bg-dark-bg">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-purple-main p-8 relative">
        <div className="flex items-center space-x-4 p-4">
          <div className="p-1 bg- rounded-lg shadow-md"></div>
        </div>

        <div className="text-white text-center space-y-6 max-w-sm">
          <div className="flex justify-center mb-6">
            <img src={img} alt="" className="max-w-full h-auto" />
            <div className="text-center text-xs font-medium text-zinc-100 mt-4 absolute bottom-0 mb-4 justify-end">
              © 2024 Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-dark-bg p-8">
        <div className="w-full max-w-sm">
          <div className="">
            <img src={logo} alt="logo" className="w-14 h-14 mx-auto mb-3 " />
          </div>
          <div className="flex justify-center mb-3 text-white text-2xl font-semibold italic">
            Tech Store
          </div>

          <form
            className="space-y-6 px-6 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="login"
                className="block text-dark-text font-medium mb-1 text-sm"
              >
                Email
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" />
                <input
                  type="text"
                  id="login"
                  placeholder="Email"
                  className="w-full border border-border-dark rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-main transition-colors text-sm bg-dark-bg-soft text-dark-text2"
                  {...register('email', { required: 'Email é obrigatório.' })}
                  onKeyUp={handleKeyUp}
                />
              </div>
              {errors.email && (
                <div className="flex items-center mt-1">
                  <CircleAlert size={12} className="text-red-500" />
                  <p className="text-red-500 text-xs ml-1 font-medium">
                    {errors.email.message}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-dark-text font-medium mb-1 text-sm"
              >
                Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-muted" />
                <input
                  type="password"
                  id="password"
                  placeholder="Senha"
                  onKeyUp={handleKeyUp}
                  className="w-full border border-border-dark rounded-lg px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-main transition-colors text-sm bg-dark-bg-soft text-dark-text2"
                  {...register('password', {
                    required: 'Senha é obrigatória.'
                  })}
                />
              </div>
              {errors.password && (
                <div className="flex items-center mt-1">
                  <CircleAlert size={12} className="text-red-500" />
                  <p className="text-red-500 text-xs ml-1 font-medium">
                    {errors.password.message}
                  </p>
                </div>
              )}
              <p
                className={`text-red-500 text-xs font-semibold mt-1 flex items-center gap-1 transition-opacity duration-300 ${
                  isCapsLockOn ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <CircleAlert size={18} />O Caps Lock está ativado!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="text-white w-full bg-purple-main focus:ring-2 focus:outline-none focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-3 text-center transition duration-300 shadow-lg relative overflow-hidden group"
            >
              <span
                className={`${
                  isPending ? 'opacity-0' : 'opacity-100'
                } transition-opacity`}
              >
                Entrar
              </span>
              {isPending && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
