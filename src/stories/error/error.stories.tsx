import { StoryFn, Meta } from '@storybook/react'
import { ApolloProvider } from '@apollo/client'
import { client } from '../../common/api/apollo/config/client'
import { ErrorScene } from '../../modules/scenes'

export default {
  title: 'Components/Error/Error Scene',
  component: ErrorScene,
} as Meta

const Story: StoryFn = args => {
  return (
    <ApolloProvider client={client}>
      <ErrorScene {...args} />
    </ApolloProvider>
  )
}

export const ErrorSceneStory = Story.bind({})
ErrorSceneStory.args = {
 
}
