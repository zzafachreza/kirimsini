import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Linking,
  RefreshControl,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {storeData, getData} from '../../utils/localStorage';
import {Icon} from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import MyTerbaik from '../../components/MyTerbaik';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import 'intl';
import 'intl/locale-data/jsonp/en';

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default function Home({navigation}) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [point, setPoint] = useState(0);

  const [company, setCompany] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const getDataPoint = () => {
    getData('user').then(res => {
      setUser(res);
      axios
        .post('https://zavalabs.com/mytahfidz//api/point.php', {
          id_member: res.id,
        })
        .then(respoint => {
          setPoint(respoint.data);
          console.log('get apoint', respoint.data);
        });

      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post('https://zavalabs.com/mytahfidz//api/update_token.php', {
            id_member: user.id,
            token: res.token,
          })
          .then(res => {
            console.log('update token', res);
          });
      });
    });
  };

  const DataKategori = ({icon, nama, nama2, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.primary,
          padding: 5,
          borderRadius: 10,
          width: windowWidth / 4.5,
          height: windowHeight / 7,
          // elevation: 5,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={icon}
            style={{width: 60, height: 60, resizeMode: 'contain'}}
          />
        </View>
        <View style={{paddingTop: 5}}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 28,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              color: colors.white,
              fontSize: windowWidth / 34,
              textAlign: 'center',
              // marginHorizontal: 10,
            }}>
            {nama2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const GetCompany = () => {
    axios.get('https://zavalabs.com/mytahfidz//api/company.php').then(res => {
      console.log('data company', res.data);
      setCompany(res.data);
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDataPoint();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    const json = JSON.stringify(remoteMessage);
    const obj = JSON.parse(json);
    getDataPoint();
  });

  useEffect(() => {
    getDataPoint();
    GetCompany();
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;
  const _renderItem = ({item, index}) => {
    return (
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{
          width: windowWidth,
          height: Math.round((windowWidth * 9) / 16),
        }}
      />
    );
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        // backgroundColor: colors.primary,
        backgroundColor: colors.white,
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }>
        <View
          style={{
            height: windowHeight / 7,
            padding: 10,
            backgroundColor: colors.primary,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, paddingTop: 15}}>
            <Text
              style={{
                fontSize: windowWidth / 23,
                color: colors.white,
                fontFamily: fonts.secondary[400],
              }}>
              Selamat datang,
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 23,
                color: colors.secondary,
                fontFamily: fonts.secondary[600],
              }}>
              {user.nama_lengkap}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 18,
                color: colors.white,
                fontFamily: fonts.secondary[600],
              }}>
              Mau kirim apa hari ini ?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 10,
            }}>
            <Icon type="ionicon" name="notifications" color={colors.white} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 10,
            paddingBottom: '20%',
          }}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: windowWidth / 25,
                  }}>
                  Saldo Anda
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.primary,
                    fontSize: windowWidth / 18,
                  }}>
                  Rp. 1,000,000
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  type="ionicon"
                  name="chevron-forward"
                  color={colors.primary}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* bagian untuk search */}

        <View
          style={{
            padding: 10,
            marginTop: -30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 20,
          }}>
          <Image
            source={require('../../assets/logo3.png')}
            style={{
              marginTop: '-10%',
              borderRadius: 10,
              height: Math.round((windowWidth * 8) / 20),
              width: windowWidth - 20,
            }}
          />
        </View>

        <View
          style={{
            padding: 10,

            backgroundColor: colors.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <DataKategori
              onPress={() => navigation.navigate('Daftar')}
              icon={require('../../assets/icon1.png')}
              nama="Kirim"
              nama2="Paket"
            />
            <DataKategori
              onPress={() => navigation.navigate('Info')}
              icon={require('../../assets/icon2.png')}
              nama="Monitorin"
              nama2="Paket"
            />
            <DataKategori
              onPress={() => navigation.navigate('Tahsin')}
              icon={require('../../assets/icon3.png')}
              nama="Cek"
              nama2="Ongkir"
            />
            <DataKategori
              onPress={() => navigation.navigate('Tahsin')}
              icon={require('../../assets/icon4.png')}
              nama="Lacak"
              nama2="Paket"
            />
          </View>
          <View
            style={{
              padding: 10,
              marginTop: 10,
              alignItems: 'center',
              backgroundColor: colors.white,
            }}>
            <Image
              source={require('../../assets/logo4.png')}
              style={{
                borderRadius: 20,
                height: Math.round((windowWidth * 8) / 17),
                width: windowWidth - 20,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
