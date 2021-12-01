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

export default function CekOngkir({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [pro, setPro] = useState(false);
  const [kot, setkot] = useState(false);
  const [kec, setKec] = useState(false);
  const [dataPro, setDataPro] = useState([]);
  const [dataKot, setDataKot] = useState([]);
  const [dataKec, setDataKec] = useState([]);

  const [pro2, setPro2] = useState(false);
  const [kot2, setkot2] = useState(false);
  const [kec2, setKec2] = useState(false);
  const [dataPro2, setDataPro2] = useState([]);
  const [dataKot2, setDataKot2] = useState([]);
  const [dataKec2, setDataKec2] = useState([]);

  const token =
    '706f693ef31318d4f320345482721b74ca0fa9c16ed75dde51df24c849cec6a2';
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    origin: null,
    destination: null,
    weight: null,
    insurance: null,
    item_value: null,
    courier: true,
  });

  const simpan = () => {
    // setLoading(true);
    navigation.navigate('CekOngkirData', data);
    console.log(data);
    // axios
    //   .post('https://zavalabs.com/kirimsini/api/alamat_add.php', data)
    //   .then(res => {
    //     // console.log(res);
    //     navigation.goBack();
    //   });
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.white,
            padding: 10,
            backgroundColor: colors.primary,
          }}>
          Dari / Origin
        </Text>
        <MyGap jarak={10} />
        <MyInput
          label="Provinsi"
          iconname="cloud-upload-outline"
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
          iconname="cloud-upload-outline"
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
          iconname="cloud-upload-outline"
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
              console.log(res.data.datas);
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
                        origin: i.id,
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

        <MyGap jarak={20} />

        {/* destination */}

        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 20,
            color: colors.black,
            padding: 10,
            backgroundColor: colors.secondary,
          }}>
          Tujuan / Destination
        </Text>
        <MyGap jarak={10} />
        <MyInput
          label="Provinsi"
          iconname="cloud-download"
          // onBlur={() => setPro(false)}
          onFocus={() => {
            setPro2(true);
            axios({
              method: 'POST',
              url: 'https://tdev.kiriminaja.com/api/mitra/province',
              headers: {Authorization: `Bearer ${token}`},
            }).then(res => {
              // console.log();
              setDataPro2(res.data.datas);
            });
          }}
          // onBlur={() => setPro(false)}
          value={data.provinsi2}
          onChangeText={value =>
            setData({
              ...data,
              provinsi2: value,
            })
          }
        />
        {pro2 && (
          <View style={{padding: 10}}>
            <ScrollView>
              {dataPro2.map(itemPro => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setData({
                        ...data,
                        id_provinsi2: itemPro.id,
                        provinsi2: itemPro.provinsi_name,
                      });
                      setTimeout(() => {
                        setPro2(false);
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
          iconname="cloud-download"
          onFocus={() => {
            setkot2(true);
            axios({
              method: 'POST',
              url: 'https://tdev.kiriminaja.com/api/mitra/city',
              headers: {Authorization: `Bearer ${token}`},
              data: {
                provinsi_id: data.id_provinsi2,
              },
            }).then(res => {
              // console.log(res);
              setDataKot2(res.data.datas);
            });
          }}
          // onBlur={() => setPro(false)}
          value={data.provinsi2}
          onChangeText={value =>
            setData({
              ...data,
              provinsi2: value,
            })
          }
          value={data.kota2}
          onChangeText={value =>
            setData({
              ...data,
              kota2: value,
            })
          }
        />
        {kot2 && (
          <View style={{padding: 10}}>
            <ScrollView>
              {dataKot2.map(i => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setData({
                        ...data,
                        id_kota2: i.id,
                        kota2: i.kabupaten_name,
                      });

                      setTimeout(() => {
                        setkot2(false);
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
          iconname="cloud-download"
          value={data.kecamatan2}
          onChangeText={value =>
            setData({
              ...data,
              kecamatan2: value,
            })
          }
          onFocus={() => {
            setKec2(true);
            axios({
              method: 'POST',
              url: 'https://tdev.kiriminaja.com/api/mitra/kecamatan',
              headers: {Authorization: `Bearer ${token}`},
              data: {
                kabupaten_id: data.id_kota2,
              },
            }).then(res => {
              console.log(res.data.datas);
              setDataKec2(res.data.datas);
            });
          }}
          onChangeText={value =>
            setData({
              ...data,
              kecamatan2: value,
            })
          }
        />
        {kec2 && (
          <View style={{padding: 10}}>
            <ScrollView>
              {dataKec2.map(i => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setData({
                        ...data,
                        destination: i.id,
                        kecamatan2: i.kecamatan_name,
                      });

                      setTimeout(() => {
                        setKec2(false);
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

        <MyGap jarak={20} />
        <View
          style={{borderBottomWidth: 1, borderBottomColor: colors.border}}
        />

        <MyGap jarak={10} />
        <MyInput
          label="Berat (gram)"
          iconname="barbell"
          value={data.weight}
          onChangeText={value =>
            setData({
              ...data,
              weight: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyButton
          warna={colors.primary}
          title="CEK ONGKIR"
          Icons="cube-outline"
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
