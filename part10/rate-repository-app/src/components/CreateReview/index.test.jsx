import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import { CreateReviewContainer } from './index'

describe('CreateReview', () => {
  describe('CreateReviewContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the CreateReviewContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn()
      render(<CreateReviewContainer onSubmit={onSubmit} />)

      fireEvent.changeText(
        screen.getByPlaceholderText('Repository owner name'),
        'kahlstrm',
      )
      fireEvent.changeText(
        screen.getByPlaceholderText('Repository owner name'),
        'rate-repository-app',
      )
      fireEvent.changeText(
        screen.getByPlaceholderText('Rating between 0 and 100'),
        '80',
      )
      fireEvent.changeText(screen.getByPlaceholderText('Review'), 'awesome')
      fireEvent.press(screen.getByText('Create a Review'))

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          owenerName: 'kahlstrm',
          repositoryName: 'rate-repository-app',
          rating: '80',
          text: 'awesome',
        })
      })
    })
  })
})
