import { Meta, StoryFn } from '@storybook/react'
import Button from '../components/common/Button'
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    title: { control: 'text' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset', 'search', 'return']
    },
    disabled: { control: 'boolean' },
    handle: { action: 'clicked' }
  }
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = args => <Button {...args} />
export const Default = Template.bind({})
Default.args = {
  title: 'Default Button',
  type: 'button',
  disabled: false,
  handle: () => {}
}

export const SubmitButton = Template.bind({})
SubmitButton.args = {
  title: 'Submit',
  type: 'submit',
  disabled: false,
  handle: () => alert('Submitted!')
}

export const SearchButton = Template.bind({})
SearchButton.args = {
  title: 'Search',
  type: 'search',
  disabled: false,
  handle: () => alert('Searching...')
}

export const ResetButton = Template.bind({})
ResetButton.args = {
  title: 'Reset',
  type: 'reset',
  disabled: false,
  handle: () => alert('Resetting...')
}

export const ReturnButton = Template.bind({})
ReturnButton.args = {
  title: 'Return',
  type: 'return',
  disabled: false,
  handle: () => alert('Returning...')
}
