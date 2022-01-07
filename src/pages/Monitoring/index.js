import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth, windowHeight} from '../../utils/fonts';

export default function Monitoring() {
  return (
    <SafeAreaView>
      {/*  */}
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <View
          style={{
            flex: 1,
            height: windowHeight / 5,
            padding: 10,
            backgroundColor: '#BFC9EC',
            justifyContent: 'flex-end',
            marginRight: 10,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 5,
              color: '#3F6CDC',
            }}>
            0
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: '#3F6CDC',
            }}>
            Belum dipickup
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: windowHeight / 5,
            padding: 10,
            backgroundColor: '#CFB8D5',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            marginLeft: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 5,
              color: '#7E2E83',
            }}>
            0
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: '#7E2E83',
            }}>
            Belum diantar
          </Text>
        </View>
      </View>
      {/*  */}

      {/*  */}
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <View
          style={{
            flex: 1,
            height: windowHeight / 5,
            padding: 10,
            backgroundColor: '#B8C8D5',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            marginRight: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 5,
              color: '#326882',
            }}>
            0
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: '#326882',
            }}>
            Pegiriman
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: windowHeight / 5,
            padding: 10,
            marginLeft: 10,
            backgroundColor: '#B2DEAD',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 5,
              color: '#16AB01',
            }}>
            0
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: '#16AB01',
            }}>
            Selesai
          </Text>
        </View>
      </View>
      {/*  */}

      {/*  */}
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <View
          style={{
            flex: 1,
            height: windowHeight / 5,
            padding: 10,
            marginRight: 10,
            backgroundColor: '#F2D1C0',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 5,
              color: '#FB8442',
            }}>
            0
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: '#FB8442',
            }}>
            Return
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: windowHeight / 5,
            padding: 10,
            backgroundColor: '#E0B2B5',
            justifyContent: 'flex-end',
            marginLeft: 10,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 5,
              color: '#991F1E',
            }}>
            0
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: '#991F1E',
            }}>
            Dibatalkan
          </Text>
        </View>
      </View>
      {/*  */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
