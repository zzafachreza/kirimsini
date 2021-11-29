import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import axios from 'axios';
import {colors} from '../../utils/colors';

export default function Otp({navigation, route}) {
  const [newotp, setNewOtp] = useState('');

  const simpan = () => {
    if (newotp === validasi) {
      axios
        .post('https://zavalabs.com/kirimsini/api/register.php', route.params)
        .then(res => {
          console.log(res);
          let err = res.data.split('#');

          // console.log(err[0]);
          if (err[0] == 50) {
            setTimeout(() => {
              //   setLoading(false);
              showMessage({
                message: err[1],
                type: 'danger',
              });
            }, 1200);
          } else {
            setTimeout(() => {
              navigation.replace('Success', {
                messege: res.data,
              });
            }, 1200);
          }
        });

      //   navigation.replace('Login');
    } else {
      showMessage({
        message: 'Kode OTP salah !',
        type: 'danger',
      });
    }
  };

  const otp = route.params.telepon.replace('+', '', route.params.telepon);

  const validasi =
    otp.substring(9, 11) + otp.substring(4, 6) + otp.substring(1, 3);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
        }}>
        {/* {validasi} */}
        Silahkan Masukan Kode OTP
      </Text>

      <TextInput
        autoFocus={true}
        keyboardType="numeric"
        maxLength={6}
        style={{
          borderBottomWidth: 1,
          width: 170,
          textAlign: 'center',
          fontSize: 50,
          color: 'black',
          fontFamily: 'Montserrat-Bold',
        }}
        value={newotp}
        onChangeText={value => setNewOtp(value)}
      />
      <TouchableOpacity
        onPress={simpan}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.primary,
          height: 45,
          paddingHorizontal: 50,
          marginVertical: 50,
          borderRadius: 5,
        }}>
        <Text
          style={{
            // fontSize: 50,
            color: 'white',
            fontFamily: 'Montserrat-Medium',
          }}>
          VALIDASI OTP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
