import { useNavigate } from 'react-router-native'
import { View, Pressable } from 'react-native'

import useSignOut from '../../hooks/useSignOut'

import Text from '../Text'

const SignOutTab = () => {
  const navigate = useNavigate()
  const [signOut] = useSignOut()

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

  return (
    <View>
      <Pressable onPress={handleSignOut}>
        <Text color="secondary" fontWeight="bold" fontSize="large">
          Sign Out
        </Text>
      </Pressable>
    </View>
  )
}

export default SignOutTab
