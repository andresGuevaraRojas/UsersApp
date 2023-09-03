import React, {useEffect, useState} from 'react';

import {View, FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {RootStackScreenProps} from '../navigation/RootStackNavigator';
import {User, UsersPaginatedResponse, getUsers} from '../services/UserService';
import UserListItem from '../components/UserListItem';
import UserListSeparator from '../components/UserListSeparator';

function UsersScreen({navigation}: RootStackScreenProps<'Users'>) {
  const [usersPaginated, setUsersPaginated] = useState<UsersPaginatedResponse>({
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
    data: [],
  });

  useEffect(() => {
    async function fetchData() {
      const usersResponse = await getUsers();
      setUsersPaginated(usersResponse);
    }
    fetchData();
  }, []);

  function onPressItem(item: User) {
    navigation.navigate('UserDetail', {id: item.id});
  }

  function renderUserItem({item}: ListRenderItemInfo<User>) {
    return (
      <UserListItem
        firstName={item.first_name}
        lastName={item.last_name}
        avatar={item.avatar}
        onPress={() => onPressItem(item)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={usersPaginated.data}
        renderItem={renderUserItem}
        ItemSeparatorComponent={UserListSeparator}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default UsersScreen;
