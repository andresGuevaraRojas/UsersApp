import React from 'react';
import {RootStackScreenProps} from '../../navigation/RootStackNavigator';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';

function UserImageScreen({route}: RootStackScreenProps<'UserImage'>) {
  return (
    <View style={styles.container}>
      <FastImage style={styles.image} source={{uri: route.params.url}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
export default UserImageScreen;
