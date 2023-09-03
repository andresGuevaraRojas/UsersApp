import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UsersScreen from '../screens/Users/UsersScreen';
import UserDetailScreen from '../screens/UserDetails/UserDetailScreen';
import UserImageScreen from '../screens/UserImage/UserImageScreen';

export type RootStackParamList = {
  Users: undefined;
  UserDetail: {id: string; name: string};
  UserImage: {url: string; name: string};
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
      <Stack.Screen
        name="UserImage"
        component={UserImageScreen}
        options={({route}) => ({
          title: `${route.params.name}`,
          headerStyle: {backgroundColor: 'black'},
          headerTintColor: 'white',
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

export default RootStackNavigator;
