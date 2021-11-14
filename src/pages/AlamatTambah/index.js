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
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import Router from '../../routes';

export default function AlamatTambah({navigation, route}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [pro, setPro] = useState(false);
  const [kot, setkot] = useState(false);
  const [kec, setKec] = useState(false);
  const [dataPro, setDataPro] = useState([]);
  const [dataKot, setDataKot] = useState([]);
  const [dataKec, setDataKec] = useState([]);
  const token =
    '706f693ef31318d4f320345482721b74ca0fa9c16ed75dde51df24c849cec6a2';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id_member: route.params.id,
    nama_lengkap: route.params.nama_lengkap,
    alamat: null,
    kota: null,
    provinsi: null,
    pos: null,
  });

  const simpan = () => {
    // setLoading(true);
    console.log(data);
    axios
      .post('https://zavalabs.com/kirimsini/api/alamat_add.php', data)
      .then(res => {
        // console.log(res);
        navigation.goBack();
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <MyGap jarak={20} />
        <MyInput
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
          label="Provinsi"
          iconname="map"
          // onBlur={() => setPro(false)}
          onFocus={() => {
            setPro(true);
            axios({
              method: 'POST',
              url: 'https://tdev.kiriminaja.com/api/mitra/province',
              headers: {Authorization: `Bearer ${token}`},
            }).then(res => {
              // console.log();
              setDataPro(res.data.datas);
            });
          }}
          // onBlur={() => setPro(false)}
          value={data.provinsi}
          onChangeText={value =>
            setData({
              ...data,
              provinsi: value,
            })
          }
        />
        {pro && (
          <View style={{padding: 10}}>
            <ScrollView>
              {dataPro.map(itemPro => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setData({
                        ...data,
                        id_provinsi: itemPro.id,
                        provinsi: itemPro.provinsi_name,
                      });
                      setTimeout(() => {
                        setPro(false);
                      }, 500);
                    }}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#CDCDCD',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: windowWidth / 25,
                      }}>
                      {itemPro.provinsi_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
        <MyGap jarak={10} />
        <MyInput
          label="Kota"
          iconname="map"
          onFocus={() => {
            setkot(true);
            axios({
              method: 'POST',
              url: 'https://tdev.kiriminaja.com/api/mitra/city',
              headers: {Authorization: `Bearer ${token}`},
              data: {
                provinsi_id: data.id_provinsi,
              },
            }).then(res => {
              // console.log(res);
              setDataKot(res.data.datas);
            });
          }}
          // onBlur={() => setPro(false)}
          value={data.provinsi}
          onChangeText={value =>
            setData({
              ...data,
              provinsi: value,
            })
          }
          value={data.kota}
          onChangeText={value =>
            setData({
              ...data,
              kota: value,
            })
          }
        />
        {kot && (
          <View style={{padding: 10}}>
            <ScrollView>
              {dataKot.map(i => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setData({
                        ...data,
                        id_kota: i.id,
                        kota: i.kabupaten_name,
                      });

                      setTimeout(() => {
                        setkot(false);
                      }, 1000);
                    }}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#CDCDCD',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: windowWidth / 25,
                      }}>
                      {i.type} {i.kabupaten_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
        <MyGap jarak={10} />
        <MyInput
          label="Kecamatan"
          iconname="map"
          value={data.kecamatan}
          onChangeText={value =>
            setData({
              ...data,
              kecamatan: value,
            })
          }
          onFocus={() => {
            setKec(true);
            axios({
              method: 'POST',
              url: 'https://tdev.kiriminaja.com/api/mitra/kecamatan',
              headers: {Authorization: `Bearer ${token}`},
              data: {
                kabupaten_id: data.id_kota,
              },
            }).then(res => {
              // console.log(res);
              setDataKec(res.data.datas);
            });
          }}
          onChangeText={value =>
            setData({
              ...data,
              kecamatan: value,
            })
          }
        />
        {kec && (
          <View style={{padding: 10}}>
            <ScrollView>
              {dataKec.map(i => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setData({
                        ...data,
                        id_kecamatan: i.id,
                        kecamatan: i.kecamatan_name,
                      });

                      setTimeout(() => {
                        setKec(false);
                      }, 500);
                    }}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#CDCDCD',
                    }}>
                    <Text
                      style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: windowWidth / 25,
                      }}>
                      {i.kecamatan_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
        <MyGap jarak={10} />
        <MyInput
          label="Alamat Lengkap (No Rumah / RT/ RW)"
          iconname="home"
          multiline={true}
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />

        <MyGap jarak={20} />
        <MyButton
          warna={colors.primary}
          title="SIMPAN"
          Icons="log-in"
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
    </SafeAreaView>
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
