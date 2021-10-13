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
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';

export default function Login({navigation}) {
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
  const masuk = () => {
    if (data.email.length === 0 && data.password.length === 0) {
      showMessage({
        message: 'Maaf Email dan Password masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf Email masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      setTimeout(() => {
        axios
          .post('https://zavalabs.com/gobenk/api/login.php', data)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {
              showMessage({
                type: 'danger',
                message: res.data.msg,
              });
            } else {
              storeData('user', res.data);
              axios
                .post('https://zavalabs.com/gobenk/api/update_token.php', {
                  id_member: res.data.id,
                  token: token,
                })
                .then(res => {
                  console.log('update token', res);
                });

              navigation.replace('MainApp');
            }
          });
      }, 1200);
    }
  };
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
            paddingTop: 40,
            justifyContent: 'center',
            // alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 30,
          }}>
          <Image
            source={require('../../assets/logo2.png')}
            style={{
              width: 200,
              resizeMode: 'contain',
              aspectRatio: 3,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 20,
            paddingBottom: 30,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 10,
              color: colors.secondary,
              marginVertical: 20,
            }}>
            Login
          </Text>
          <MyInput
            label="Email"
            iconname="mail"
            placeholder="Masukan alamat email"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            value={data.nama_lengkap}
            onChangeText={value => validate(value)}
          />
          {!valid && (
            <Text
              style={{
                color: colors.secondary,
                fontFamily: fonts.primary[600],
                textAlign: 'right',
                right: 10,
              }}>
              Maaf Email Anda Tidak Valid !
            </Text>
          )}
          <MyGap jarak={20} />
          <MyInput
            label="Password"
            placeholder="Masukan password"
            iconname="key"
            secureTextEntry
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            onChangeText={value =>
              setData({
                ...data,
                password: value,
              })
            }
          />

          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.primary[600],
              textAlign: 'right',
              fontSize: windowWidth / 20,
              right: 10,
              marginVertical: 20,
            }}>
            Lupa Password ?
          </Text>
          {valid && (
            <MyButton
              warna={colors.secondary}
              colorText={colors.black}
              iconColor={colors.black}
              title="LOGIN"
              Icons="log-in"
              onPress={masuk}
            />
          )}

          <Text
            style={{
              color: colors.white,
              fontFamily: fonts.primary[600],
              textAlign: 'center',
              fontSize: windowWidth / 20,

              marginVertical: 20,
            }}>
            Belum Memiliki Akun ?
          </Text>

          <MyButton
            warna={colors.white}
            colorText={colors.primary}
            iconColor={colors.primary}
            title="DAFTAR DISINI"
            Icons="book"
            onPress={() => navigation.navigate('Register')}
          />
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
