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

export default function Tracking({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [token, setToken] = useState('');
  const [data, setData] = useState({
    order_id: '',
  });

  // login ok
  const masuk = () => {
    if (data.order_id.length === 0) {
      showMessage({
        message: 'nomor resi / order ID masih kosong !',
      });
    } else {
      console.log(data);
    }
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        // padding: 10,
        backgroundColor: colors.primary,
      }}>
      {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          borderRadius: 20,
          paddingBottom: 30,
        }}>
        <MyInput
          label="Masukan Order ID / Resi"
          iconname="qr-code-outline"
          placeholder="Masukan Order ID / Resi"
          colorIcon={colors.white}
          labelColor={colors.white}
          borderColor={colors.white}
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              order_id: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyButton
          warna={colors.secondary}
          colorText={colors.black}
          iconColor={colors.black}
          title="LACAK SEKARANG"
          Icons="open-outline"
          onPress={() =>
            navigation.navigate('TrackingDetail', {
              order_id: data.order_id,
            })
          }
        />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: colors.white,
        }}>
        <Image
          source={require('../../assets/logo2.png')}
          style={{
            width: 200,
            alignSelf: 'center',
          }}
        />
      </View>
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
