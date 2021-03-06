import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  CheckBox,
  Alert,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {Icon} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

import {storeData} from '../../utils/localStorage';
export default function Alamat({navigation, route}) {
  const [isSelected, setSelection] = useState(false);
  const isFocused = useIsFocused();
  const user = route.params;

  const [data, setData] = useState([]);
  const [cek, setCek] = useState([]);

  const [allchecked, setAllchecked] = useState(false);
  const [checked, setChecked] = useState([false, false, false]);
  const names = ['John', 'Doe', 'Jim'];

  const getDataAlamat = () => {
    axios
      .post('https://zavalabs.com/kirimsini/api/alamat.php', {
        id: route.params.id,
      })
      .then(res => {
        console.log('data alamat', res);
        setData(res.data);
      });
  };

  const hapus = x => {
    Alert.alert('Kirimsini', 'Apakah Anda akan hapus alamat ini ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          axios
            .post('https://zavalabs.com/kirimsini/api/alamat_hapus.php', {
              id_alamat: x,
            })
            .then(res => {
              getDataAlamat();
              console.log('data alamat', res);
            });
        },
      },
    ]);
  };

  useEffect(() => {
    if (isFocused) {
      getDataAlamat();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{padding: 10}}>
        {data.map((item, i) => {
          let alamat =
            item.alamat +
            ' ' +
            item.kecamatan +
            ' ' +
            item.kota +
            ' ' +
            item.provinsi +
            ' ' +
            item.pos;
          return (
            <View
              style={{
                backgroundColor: colors.white,
                padding: 10,
                marginVertical: 5,
                borderRadius: 10,
                flex: 1,
                elevation: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <View style={{flex: 2}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      color: colors.black,
                    }}>
                    {item.nama_lengkap}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[400],
                      color: colors.black,
                    }}>
                    {item.alamat} {item.kecamatan} {item.kota} {item.provinsi}{' '}
                    {item.pos}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => hapus(item.id)}
                    style={{padding: 10}}>
                    <Icon
                      type="ionicon"
                      name="trash-outline"
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  console.log(item);
                  const kirim = {
                    id: item.id,
                    id_member: item.id_member,
                    alamat: alamat,
                  };
                  console.log('kiirm', kirim);
                  axios
                    .post(
                      'https://zavalabs.com/kirimsini/api/alamat_pilih.php',
                      kirim,
                    )
                    .then(res => {
                      console.log(res.data);
                      storeData('user', res.data);
                      getDataAlamat();
                    });
                }}
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  //   justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item.cek == 1 && (
                  <Icon
                    type="ionicon"
                    name="checkbox"
                    size={25}
                    style={{marginRight: 10}}
                  />
                )}
                {item.cek == 0 && (
                  <Icon
                    type="ionicon"
                    name="square-outline"
                    size={25}
                    style={{marginRight: 10}}
                  />
                )}
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.black,
                  }}>
                  Gunakan sebagai alamat pengiriman
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          padding: 30,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AlamatTambah', user)}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="add" type="ionicon" color={colors.black} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
