import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  Dimensions,
  Switch,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';

export default function MenuKirim({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log('Email is Not Correct');
      setData({...data, email: text});
      setValid(false);
      return false;
    } else {
      setData({...data, email: text});
      setValid(true);
      // console.log('Email is Correct');
    }
  };

  const [tipe, setTipe] = useState('COD');

  const [token, setToken] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    getData('token').then(res => {
      console.log('data token,', res);
      setToken(res.token);
    });
  }, []);

  // login ok
  const masuk = () => {};
  return (
    <ImageBackground
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
      }}>
      {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 20,
              color: colors.primary,
              marginVertical: 10,
            }}>
            Tipe Pengiriman
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setTipe('COD');
              }}
              style={{
                flex: 1,
                borderRadius: 10,
                marginRight: 5,
                borderColor: tipe == 'COD' ? colors.secondary : colors.primary,
                borderWidth: 2,
                backgroundColor:
                  tipe == 'COD' ? colors.secondary : colors.white,
                overflow: 'hidden',
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 18,
                  color: colors.primary,
                  textAlign: 'center',
                }}>
                COD
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTipe('NON COD');
              }}
              style={{
                flex: 1,
                borderRadius: 10,
                marginLeft: 5,
                borderColor:
                  tipe == 'NON COD' ? colors.secondary : colors.primary,
                borderWidth: 2,
                backgroundColor:
                  tipe == 'NON COD' ? colors.secondary : colors.white,
                overflow: 'hidden',
              }}>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  fontSize: windowWidth / 18,
                  color: colors.primary,
                  textAlign: 'center',
                }}>
                NON COD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 15,
              color: colors.secondary,
              marginVertical: 5,
            }}>
            Penerima
          </Text>
          <MyInput
            label="Nama"
            iconname="person"
            placeholder="Masukan nama penerima"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />

          <MyGap jarak={20} />
          <MyInput
            label="No. Tlp / Hp"
            iconname="call"
            placeholder="Nomor Telepon penerima"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />

          <MyGap jarak={20} />
          <MyInput
            label="Alamat Penerima"
            iconname="home"
            multiline={true}
            paddingBottom={30}
            placeholder="Alamat Lengkap penerima"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            multile
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />
        </View>
        <View
          style={{
            margin: 5,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 20,
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 15,
              color: colors.secondary,
              marginVertical: 5,
            }}>
            Informasi Barang
          </Text>
          <MyInput
            label="Jenis Barang"
            iconname="grid"
            placeholder="Contoh : Makanan"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />

          <MyGap jarak={20} />
          <MyInput
            label="Nama Barang"
            iconname="cube"
            placeholder="Contoh : Laptop"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />

          <MyGap jarak={20} />
          <MyInput
            label="Keterangan"
            iconname="create"
            multiline={true}
            paddingBottom={30}
            placeholder="Masukan Keterangan Barang"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            multile
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />
          <MyGap jarak={20} />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{flex: 1, marginRight: 5}}>
              <MyInput
                label="Berat (gram)"
                iconname="barbell"
                placeholder="Contoh : 250"
                colorIcon={colors.white}
                labelColor={colors.white}
                borderColor={colors.white}
                value={data.nama_lengkap}
                onChangeText={value => validate(value)}
              />
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <MyInput
                label="Nilai Barang"
                iconname="pricetag"
                placeholder="Contoh : 25.000"
                colorIcon={colors.white}
                labelColor={colors.white}
                borderColor={colors.white}
                value={data.nama_lengkap}
                onChangeText={value => validate(value)}
              />
            </View>
          </View>
          <MyGap jarak={20} />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{flex: 1, marginRight: 5}}>
              <MyInput
                label="Panjang(cm)"
                iconname="options"
                placeholder="Contoh : 10"
                colorIcon={colors.white}
                labelColor={colors.white}
                borderColor={colors.white}
                value={data.nama_lengkap}
                onChangeText={value => validate(value)}
              />
            </View>
            <View style={{flex: 1}}>
              <MyInput
                label="Lebar(cm)"
                iconname="move"
                placeholder="Contoh : 10"
                colorIcon={colors.white}
                labelColor={colors.white}
                borderColor={colors.white}
                value={data.nama_lengkap}
                onChangeText={value => validate(value)}
              />
            </View>
            <View style={{flex: 1, marginLeft: 5}}>
              <MyInput
                label="Tinggi(cm)"
                iconname="pin"
                placeholder="Contoh : 10"
                colorIcon={colors.white}
                labelColor={colors.white}
                borderColor={colors.white}
                value={data.nama_lengkap}
                onChangeText={value => validate(value)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
