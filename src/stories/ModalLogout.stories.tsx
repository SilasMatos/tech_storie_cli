import { Meta, StoryFn } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import ModalLogout, { LogoutModalProps } from '../components/modals/ModalLogout'

export default {
  title: 'Components/ModalLogout',
  component: ModalLogout,
  decorators: [
    Story => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ],
  argTypes: {
    isOpen: { control: 'boolean' },
    setIsOpen: { action: 'setIsOpen' }
  }
} as Meta<typeof ModalLogout>

const Template: StoryFn<LogoutModalProps> = args => <ModalLogout {...args} />

export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  setIsOpen: (isOpen: boolean) => console.log('setIsOpen', isOpen)
}

export const Closed = Template.bind({})
Closed.args = {
  isOpen: false,
  setIsOpen: (isOpen: boolean) => console.log('setIsOpen', isOpen)
}
