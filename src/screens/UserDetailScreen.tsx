import React from 'react';

import {Text, View} from 'react-native';
import {RootStackScreenProps} from '../navigation/RootStackNavigator';

function UserDetailScreen({route}: RootStackScreenProps<'UserDetail'>) {
  return (
    <View>
      <Text>Users id: {route.params.id}</Text>
    </View>
  );
}

export default UserDetailScreen;
