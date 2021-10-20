import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Switch,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';

export default function Register({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
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

  const [data, setData] = useState({
    nama_lengkap: '',
    email: '',
    password: '',
    telepon: '',
    alamat: '',
  });

  const simpan = () => {
    if (
      data.nama_lengkap.length === 0 &&
      data.email.length === 0 &&
      data.password.length === 0 &&
      data.alamat.length === 0 &&
      data.telepon.length === 0
    ) {
      showMessage({
        message: 'Maaf Semua Field Harus Di isi !',
      });
    } else if (data.nama_lengkap.length === 0) {
      showMessage({
        message: 'Maaf Nama Lengkap masih kosong !',
      });
    } else if (data.alamat.length === 0) {
      showMessage({
        message: 'Maaf Alamat masih kosong !',
      });
    } else if (data.telepon.length === 0) {
      showMessage({
        message: 'Maaf Telepon masih kosong !',
      });
    } else if (data.email.length === 0) {
      showMessage({
        message: 'Maaf email masih kosong !',
      });
    } else if (data.password.length === 0) {
      showMessage({
        message: 'Maaf Password masih kosong !',
      });
    } else {
      setLoading(true);
      console.log(data);
      axios
        .post('https://zavalabs.com/sigadisbekasi/api/register.php', data)
        .then(res => {
          console.log(res);
          let err = res.data.split('#');

          // console.log(err[0]);
          if (err[0] == 50) {
            setTimeout(() => {
              setLoading(false);
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
    }
  };
  return (
    <ImageBackground
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: colors.primary,
      }}>
      {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}

        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 20,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Image
            source={require('../../assets/logo2.png')}
            style={{
              width: 100,
              resizeMode: 'contain',
              aspectRatio: 3,
            }}
          />
        </View>
        <Text
          style={{
            fontFamily: fonts.secondary[800],
            fontSize: windowWidth / 10,
            color: colors.secondary,
            marginVertical: 20,
          }}>
          Register
        </Text>
        <MyInput
          colorIcon={colors.white}
          labelColor={colors.white}
          borderColor={colors.white}
          placeholder="Masukan nama lengkap"
          label="Nama Lengkap"
          iconname="person"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          colorIcon={colors.white}
          labelColor={colors.white}
          borderColor={colors.white}
          label="E - mail"
          placeholder="Masukan alamat email"
          iconname="mail"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          colorIcon={colors.white}
          labelColor={colors.white}
          borderColor={colors.white}
          label="Alamat"
          placeholder="Masukan alamat lengkap"
          iconname="map"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          colorIcon={colors.white}
          labelColor={colors.white}
          borderColor={colors.white}
          label="Telepon"
          placeholder="Masukan nomor telepon atau whatsapp"
          iconname="call"
          keyboardType="number-pad"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          colorIcon={colors.white}
          labelColor={colors.white}
          borderColor={colors.white}
          label="Password"
          placeholder="Masukan password"
          iconname="key"
          secureTextEntry
          value={data.password}
          onChangeText={value =>
            setData({
              ...data,
              password: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          colorIcon={colors.white}
          labelColor={colors.white}
          borderColor={colors.white}
          label="Kode Referal ( Jika Anda Memiliki ) "
          iconname="home"
          placeholder="Masukan kode referal"
          keyboardType="number-pad"
          value={data.kode_referal}
          onChangeText={value =>
            setData({
              ...data,
              kode_referal: value,
            })
          }
        />
        <MyGap jarak={20} />

        <MyButton
          warna={colors.secondary}
          iconColor={colors.black}
          colorText={colors.black}
          title="DAFTAR"
          Icons="book"
          onPress={simpan}
        />

        <MyGap jarak={20} />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
