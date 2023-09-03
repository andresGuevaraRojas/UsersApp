import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UsersScreen from '../screens/UsersScreen';
import UserDetailScreen from '../screens/UserDetails/UserDetailScreen';

export type RootStackParamList = {
  Users: undefined;
  UserDetail: {id: string; name: string};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const Stack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UsersScreen} />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={({route}) => ({
          title: `${route.params.name}`,
        })}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
