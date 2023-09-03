import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

type Props = {
  firstName: string;
  lastName: string;
  avatar: string;
  onPress: () => void;
};

function UserListItem({firstName, lastName, avatar, onPress}: Props) {
  const name = `${firstName} ${lastName}`;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{uri: avatar}} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  image: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
  },
});
export default UserListItem;
