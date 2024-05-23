import useAuthenticate from '../../hooks/useAuthenticate'

import ReviewList from './ReviewList'

const MyReviews = () => {
  const user = useAuthenticate()
  if (user) {
    return <ReviewList reviews={user.reviews} />
  }
}

export default MyReviews
