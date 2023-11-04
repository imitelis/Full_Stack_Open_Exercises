import { View } from 'react-native'
import { Link } from 'react-router-native'

import Text from '../Text'

const AppBarTab = ({ tabTitle, tabLink }) => {
  return (
    <View>
      <Link to={tabLink}>
        <Text color="secondary" fontWeight="bold" fontSize="large">
          {tabTitle}
        </Text>
      </Link>
    </View>
  )
}

export default AppBarTab
