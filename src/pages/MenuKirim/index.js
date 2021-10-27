import React, {useState, useEffect, useRef} from 'react';
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
  BackHandler,
  FlatList,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {storeData, getData} from '../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';
import {Icon} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {Modalize} from 'react-native-modalize';

export default function MenuKirim({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const isFocused = useIsFocused();
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

  const [buka, setBuka] = useState(false);

  const [token, setToken] = useState('');
  const [data, setData] = useState({});

  const [kontak, setKontak] = useState([]);

  const [user, setUser] = useState({});

  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        // console.log(user);
      });
    }
  }, [isFocused]);

  // login ok

  const ambilKontak = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Izinkan Untuk Akses Kontak',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll().then(contacts => {
          // contacts returned
          setKontak(contacts);
          console.log(contacts);
          setBuka(true);
          onOpen();
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
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
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[800],
              fontSize: windowWidth / 25,
              color: colors.primary,
            }}>
            Pengirim
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
              color: colors.primary,
            }}>
            {user.nama_lengkap}
          </Text>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 25,
              color: colors.primary,
            }}>
            {user.alamat}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Alamat', {
              id: user.id,
            })
          }
          style={{
            padding: 5,
            backgroundColor: colors.primary,
            borderRadius: 10,
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            type="ionicon"
            name="home-outline"
            size={25}
            color={colors.white}
            style={{marginRight: 10}}
          />
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 25,
              color: colors.white,
              marginVertical: 10,
            }}>
            Atur Alamat Pengirim
          </Text>
        </TouchableOpacity>
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
            onChangeText={value =>
              setData({
                ...data,
                nama_lengkap: value,
              })
            }
          />

          <MyGap jarak={20} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <MyInput
                label="No. Tlp / Hp"
                iconname="call"
                placeholder="Nomor Telepon penerima"
                colorIcon={colors.white}
                labelColor={colors.white}
                borderColor={colors.white}
                value={data.tlp}
                onChangeText={value =>
                  setData({
                    ...data,
                    tlp: value,
                  })
                }
              />
            </View>
            <TouchableOpacity
              onPress={ambilKontak}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingTop: 40,
              }}>
              <Icon type="ionicon" name="person-add" color={colors.white} />
            </TouchableOpacity>
          </View>

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
            value={data.alamat}
            onChangeText={value =>
              setData({
                ...data,
                alamat: value,
              })
            }
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
            value={data.jenis_barang}
            onChangeText={value =>
              setData({
                ...data,
                jenis_barang: value,
              })
            }
          />

          <MyGap jarak={20} />
          <MyInput
            label="Nama Barang"
            iconname="cube"
            placeholder="Contoh : Laptop"
            colorIcon={colors.white}
            labelColor={colors.white}
            borderColor={colors.white}
            value={data.nama_baranf}
            onChangeText={value =>
              setData({
                ...data,
                nama_baranf: value,
              })
            }
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
            value={data.keterangan}
            onChangeText={value =>
              setData({
                ...data,
                keterangan: value,
              })
            }
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
                value={data.berat}
                onChangeText={value =>
                  setData({
                    ...data,
                    berat: value,
                  })
                }
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
                value={data.nilai_barang}
                onChangeText={value =>
                  setData({
                    ...data,
                    nilai_barang: value,
                  })
                }
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
                value={data.panjang}
                onChangeText={value =>
                  setData({
                    ...data,
                    panjang: value,
                  })
                }
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
                value={data.lebar}
                onChangeText={value =>
                  setData({
                    ...data,
                    lebar: value,
                  })
                }
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
                value={data.tinggi}
                onChangeText={value =>
                  setData({
                    ...data,
                    tinggi: value,
                  })
                }
              />
            </View>
          </View>
        </View>

        {/* tidak pilih kotak */}
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}

      <Modalize
        withHandle={true}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={windowHeight - 100}
        HeaderComponent={
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View></View>
              <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.black,
                  }}>
                  Pilih Kontak
                </Text>
              </View>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <Icon type="ionicon" name="close-outline" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }
        withHandle={false}
        ref={modalizeRef}>
        <ScrollView>
          <FlatList
            keyExtractor={item => item.recordID}
            data={kontak}
            renderItem={ktk => {
              // let nomorHp = '';

              // if (ktk.item.phoneNumbers[0].number != null) {
              //   nomorHp = ktk.item.phoneNumbers[0];
              // } else {
              //   nomorHp = ktk.item.phoneNumbers[0];
              // }
              return (
                <TouchableOpacity
                  onPress={() => {
                    // alert(ktk.item.phoneNumbers[0].number);
                    setData({
                      ...data,
                      nama_lengkap: ktk.item.givenName,
                      tlp: ktk.item.phoneNumbers[0].number,
                    });

                    modalizeRef.current.close();
                  }}
                  style={{
                    padding: 10,
                    marginVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: '#DADADA',
                  }}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 20,
                      color: colors.primary,
                      marginVertical: 2,
                    }}>
                    {ktk.item.givenName}
                  </Text>
                  {/* <Text>{nomorHp}</Text> */}
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </Modalize>
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
