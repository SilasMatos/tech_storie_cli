import { Meta, StoryFn } from '@storybook/react'
import ButtonForm, { ButtonProps } from '../components/common/ButtonForm'

export default {
  title: 'Components/ButtonForm',
  component: ButtonForm,
  argTypes: {
    title: { control: 'text' },
    onClick: { action: 'clicked' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} as Meta<typeof ButtonForm>

const Template: StoryFn<ButtonProps> = args => <ButtonForm {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Submit',
  loading: false,
  disabled: false
}

export const Loading = Template.bind({})
Loading.args = {
  title: 'Loading',
  loading: true,
  disabled: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  title: 'Disabled',
  loading: false,
  disabled: true
}
