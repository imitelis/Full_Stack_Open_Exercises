import { useNavigate } from 'react-router-native'
import { View, Pressable } from 'react-native'

import useSignOut from '../../hooks/useSignOut'

import Text from '../Text'

const SignOutTab = () => {
  const [signOut] = useSignOut()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/signin')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View>
      <Pressable onPress={handleSignOut}>
        <Text color="secondary" fontWeight="bold" fontSize="medium">
          Sign Out
        </Text>
      </Pressable>
    </View>
  )
}

export default SignOutTab
