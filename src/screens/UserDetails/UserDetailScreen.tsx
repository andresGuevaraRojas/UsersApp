import React, {useEffect, useState} from 'react';

import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/RootStackNavigator';
import {SingleUserResponse, getUser} from '../../services/UserService';
import ContactData from './ContactData';
import FastImage from 'react-native-fast-image';

function UserDetailScreen({
  route,
  navigation,
}: RootStackScreenProps<'UserDetail'>) {
  const [user, setUser] = useState<SingleUserResponse>({
    data: {
      id: '',
      first_name: '',
      last_name: '',
      avatar: '',
      email: '',
    },
  });

  useEffect(() => {
    async function fetchData() {
      const response = await getUser(route.params.id);
      setUser(response);
    }

    fetchData();
  }, [route.params.id]);

  const handleOnPressImage = () => {
    navigation.navigate('UserImage', {
      url: user.data.avatar,
      name: `${user.data.first_name} ${user.data.last_name}`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageWraper}>
        <Pressable onPress={handleOnPressImage}>
          <FastImage style={styles.image} source={{uri: user.data.avatar}} />
        </Pressable>

        <Text style={styles.name}>
          {user.data.first_name} {user.data.last_name}
        </Text>
      </View>

      <View style={[styles.section, styles.contactInformationSection]}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <ContactData label="First name: " value={user.data.first_name} />
        <ContactData label="Last name: " value={user.data.last_name} />
        <ContactData label="Email: " value={user.data.email} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.about}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate
          sequi quia alias rerum nisi illo! Sit, in maiores veritatis porro
          pariatur quaerat sint unde est, delectus suscipit, consequatur
          accusantium ipsa.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  imageWraper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 60,
    marginBottom: 8,
    backgroundColor: 'gray',
  },
  section: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
  },
  contactInformationSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  labelContactInformation: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  contactInformation: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  about: {
    fontSize: 16,
    color: 'black',
  },
});
export default UserDetailScreen;
