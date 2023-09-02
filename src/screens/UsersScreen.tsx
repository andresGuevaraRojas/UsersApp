import React from 'react';

import {Button, Text, View} from 'react-native';
import {RootStackScreenProps} from '../navigation/RootStackNavigator';

function UsersScreen({navigation}: RootStackScreenProps<'Users'>) {
  return (
    <View>
      <Text>Users list screen</Text>
      <Button
        title="Detail"
        onPress={() => {
          navigation.navigate('UserDetail', {id: 10});
        }}
      />
    </View>
  );
}

export default UsersScreen;
