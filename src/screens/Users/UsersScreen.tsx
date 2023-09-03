import React, {useEffect, useState} from 'react';

import {
  View,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import {RootStackScreenProps} from '../../navigation/RootStackNavigator';
import {User, getUsers} from '../../services/UserService';
import UserListItem from '../../components/UserListItem';
import UserListSeparator from '../../components/UserListSeparator';

function UsersScreen({navigation}: RootStackScreenProps<'Users'>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const usersResponse = await getUsers(5, currentPage);
      setUsers(state => [...state, ...usersResponse.data]);
      setLoading(false);
    }
    try {
      fetchData();
    } catch (error) {
      setLoading(false);
    }
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
    setCurrentPage(currentPage + 1);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        ItemSeparatorComponent={UserListSeparator}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <Pressable onPress={getMoreUsers} style={styles.loadMoreButton}>
            <Text
              style={[
                styles.loadMoreText,
                loading ? styles.loadMoreButtonLoading : null,
              ]}>
              {loading ? 'Loading' : 'Load more'}
            </Text>
            {loading ? <ActivityIndicator animating color={'white'} /> : null}
          </Pressable>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  loadMoreButton: {
    backgroundColor: 'black',
    padding: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loadMoreButtonLoading: {},
  loadMoreText: {
    color: 'white',
    fontSize: 14,
  },
});
export default UsersScreen;
