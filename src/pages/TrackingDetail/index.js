import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';

export default function TrackingDetail({route}) {
  const order_id = route.params.order_id;
  return (
    <SafeAreaView style={{padding: 10}}>
      <Text
        style={{
          color: colors.danger,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 20,
        }}>
        Maaf ID anda {order_id} Tidak Valid !
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
