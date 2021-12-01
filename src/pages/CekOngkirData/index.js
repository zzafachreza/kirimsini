import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import Router from '../../routes';
import 'intl';
import 'intl/locale-data/jsonp/en';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function CekOngkirData({navigation, route}) {
  const item = route.params;
  const token =
    '706f693ef31318d4f320345482721b74ca0fa9c16ed75dde51df24c849cec6a2';
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log('data ongkir', item);
    axios({
      method: 'POST',
      url: 'https://tdev.kiriminaja.com/api/mitra/shipping_price',
      headers: {Authorization: `Bearer ${token}`},
      data: {
        origin: item.origin,
        destination: item.destination,
        weight: item.weight,
      },
    }).then(res => {
      console.log(res);
      setData(res.data.results);
      //   setDataPro(res.data.datas);
    });
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        elevation: 1,
      }}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Text
          style={{
            flex: 1,
            fontSize: windowWidth / 20,
            color: colors.danger,
            fontFamily: fonts.secondary[600],
          }}>
          {item.service.toUpperCase()}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {item.service_name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          borderTopWidth: 1,
          borderTopColor: colors.tertiary,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // flex: 1,
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              fontFamily: fonts.secondary[600],
              color: colors.black,
            }}>
            Estimasi
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 30,
              textAlign: 'center',
              fontFamily: fonts.secondary[600],
              color: colors.primary,
            }}>
            {item.etd} Hari
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              fontFamily: fonts.secondary[600],
              textAlign: 'center',
              color: colors.success,
            }}>
            {item.service_type}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',

            // flex: 1,
          }}>
          <Text
            style={{
              fontSize: windowWidth / 30,
              fontFamily: fonts.secondary[600],
              color: colors.black,
            }}>
            Harga
          </Text>
          <Text
            style={{
              fontSize: windowWidth / 20,
              textAlign: 'center',
              color: colors.danger,
            }}>
            Rp. {new Intl.NumberFormat().format(item.cost)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{
        padding: 10,
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
}
