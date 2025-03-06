import { Meta, StoryFn } from '@storybook/react'
import Textarea from '../components/common/Textarea'

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    rows: { control: { type: 'number', min: 1 } },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' }
  }
} as Meta<typeof Textarea>

const Template: StoryFn<typeof Textarea> = args => <Textarea {...args} />

export const Label = Template.bind({})
Label.args = {
  label: 'Label',
  name: 'default',
  value: '',
  onChange: () => {},
  rows: 4,
  errorMessage: ''
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'Error Label',
  name: 'error',
  value: '',
  onChange: () => {},
  rows: 4,
  errorMessage: 'This field is required.'
}
