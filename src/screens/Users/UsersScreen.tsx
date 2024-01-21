import React, {useEffect, useRef, useState} from 'react';

import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {RootStackScreenProps} from '../../navigation/RootStackNavigator';
import {User, getUsers} from '../../services/UserService';
import UserListItem from '../../components/UserListItem';
import UserListSeparator from '../../components/UserListSeparator';

function UsersScreen({navigation}: RootStackScreenProps<'Users'>) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useRef<number>(0);
  const endReached = useRef<boolean>(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const usersResponse = await getUsers(8, currentPage);
        totalPages.current = usersResponse.total_pages;
        setUsers(state => [...state, ...usersResponse.data]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [currentPage]);

  function onPressItem(item: User) {
    navigation.navigate('UserDetail', {
      id: item.id,
      name: `${item.first_name} ${item.last_name}`,
    });
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

  function getMoreUsers() {
    if (loading) {
      return;
    }
    if (currentPage === totalPages.current) {
      return;
    }
    if (!endReached.current) {
      return;
    }
    endReached.current = false;
    setCurrentPage(currentPage + 1);
  }

  function onEndReached() {
    endReached.current = true;
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={users}
      renderItem={renderUserItem}
      ItemSeparatorComponent={UserListSeparator}
      ListFooterComponent={
        loading ? <ActivityIndicator animating size={'large'} /> : null
      }
      keyExtractor={item => item.id}
      onMomentumScrollBegin={getMoreUsers}
      onEndReachedThreshold={0.2}
      onEndReached={onEndReached}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
export default UsersScreen;
