import React from 'react';
import {RootStackScreenProps} from '../../navigation/RootStackNavigator';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View, useWindowDimensions} from 'react-native';

function UserImageScreen({route}: RootStackScreenProps<'UserImage'>) {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <FastImage
        style={[
          styles.image,
          width > height ? {height: '100%'} : {width: '100%'},
        ]}
        source={{uri: route.params.url}}
      />
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
    //maxWidth: 200,
    width: '100%',
    aspectRatio: 7 / 8,
  },
});
export default UserImageScreen;
