import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  label: string;
  value: string;
};

function ContactData({label, value}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} selectable>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
});

export default ContactData;
