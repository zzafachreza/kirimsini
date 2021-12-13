import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import axios from 'axios';

export default function TrackingDetail({route}) {
  const order_id = route.params.order_id;
  const [status, setStatus] = useState('');
  const token =
    '706f693ef31318d4f320345482721b74ca0fa9c16ed75dde51df24c849cec6a2';

  const [data, setData] = useState({
    status: true,
    text: 'Delivered to BAGUS | 14-07-2021 16:00 | YOGYAKARTA ',
    method: 'shTracking',
    status_code: 200,
    details: {
      awb: 'DEVEL-000000004',
      order_id: 'OID-8793949106',
      status_code: null,
      estimation: '-',
      service: 'jne',
      service_name: 'REG',
      drop: false,
      shipped_at: '2021-07-13 17:44:04',
      delivered: true,
      delivered_at: '2021-10-17 16:53:00',
      refunded: false,
      refunded_at: '',
      images: {
        camera_img:
          'https://s3-ap-southeast-1.amazonaws.com/pod.paket.id/1626253243482P||1411922100004643.jpeg',
        signature_img:
          'https://s3-ap-southeast-1.amazonaws.com/pod.paket.id/1626253255242S||1411922100004643.jpeg',
        pop_img: null,
      },
      costs: {
        add_cost: 0,
        currency: 'IDR',
        cod: 0,
        insurance_amount: 0,
        insurance_percent: 0,
        discount_amount: 0,
        subsidi_amount: 0,
        shipping_cost: 10000,
        correction: 0,
      },
      origin: {
        name: 'KiriminAja',
        address: 'Jl. Utara Stadion No.8, Jetis, Wedomartani',
        phone: '628000000',
        city: 'Kabupaten Sleman',
        zip_code: '55283',
      },
      destination: {
        name: 'Zainal Arifin',
        address: 'Ngaglik RT. 32 Pendowoharjo Sewon Bantul Yogyakarta 55185',
        phone: '6287839087416',
        city: 'Kabupaten Bantul',
        zip_code: '55715',
      },
    },
    histories: [
      {
        created_at: '2021-07-14 16:00:00',
        status: 'Delivered to BAGUS | 14-07-2021 16:00 | YOGYAKARTA ',
        status_code: 200,
        driver: '',
        receiver: 'BAGUS',
      },
      {
        created_at: '2021-07-14 09:53:00',
        status: 'With delivery courier YOGYAKARTA',
        status_code: 100,
        driver: '',
        receiver: '',
      },
      {
        created_at: '2021-07-14 00:02:00',
        status: 'Received at inbound station YOGYAKARTA - KP. GAMBIRAN',
        status_code: 100,
        driver: '',
        receiver: '',
      },
      {
        created_at: '2021-07-13 20:44:00',
        status: 'Shipment forwarded to destination YOGYAKARTA - KP. GAMBIRAN',
        status_code: 100,
        driver: '',
        receiver: '',
      },
      {
        created_at: '2021-07-13 18:34:00',
        status: 'Received at sorting center YOGYAKARTA',
        status_code: 100,
        driver: '',
        receiver: '',
      },
      {
        created_at: '2021-07-13 17:44:00',
        status: 'Shipment received by jne counter officer at YOGYAKARTA',
        status_code: 100,
        driver: '',
        receiver: '',
      },
      {
        status: 'Paket dibuat oleh KiriminAja',
        status_code: 100,
        created_at: '2021-07-07 14:40:42',
        driver: '',
        receiver: '',
      },
    ],
  });
  useEffect(() => {
    axios({
      method: 'POST',
      url: 'https://tdev.kiriminaja.com/api/mitra/tracking',
      data: {
        order_id: order_id,
      },
      headers: {Authorization: `Bearer ${token}`},
    }).then(res => {
      console.log('get tracking', res.data);
      setData(res.data);
      if (res.data.status) {
        setStatus(res.data.text);
      } else {
        setStatus(res.data.text);
      }
    });
  }, []);

  const MyListData = ({judul, isi}) => {
    return (
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
        <Text
          style={{
            fontSize: windowWidth / 25,
            color: colors.primary,
            fontFamily: fonts.secondary[600],
          }}>
          {judul}
        </Text>
        <Text
          style={{
            fontSize: windowWidth / 25,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {isi}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{padding: 10}}>
      <Text
        style={{
          color: colors.black,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 28,
          textAlign: 'center',
        }}>
        {status}
      </Text>
      <ScrollView>
        <MyListData judul="Nomor Resi" isi={data.details.order_id} />
        <MyListData
          judul="Nama Kurir"
          isi={
            data.details.service.toUpperCase() +
            ' - ' +
            data.details.service_name
          }
        />
        <MyListData judul="Tanggal Kirim" isi={data.details.shipped_at} />
        <MyListData judul="Tanggal Terima" isi={data.details.delivered_at} />

        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.white,
                padding: 5,
                backgroundColor: colors.primary,
                fontFamily: fonts.secondary[600],
              }}>
              Origin
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.origin.name}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.origin.address}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.origin.phone}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.origin.city} {data.details.origin.zip_code}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: windowWidth / 25,
                color: colors.primary,
                padding: 5,
                backgroundColor: colors.secondary,
                fontFamily: fonts.secondary[600],
              }}>
              Destination
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.destination.name}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.destination.address}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.destination.phone}
            </Text>
            <Text
              style={{
                fontSize: windowWidth / 30,
                color: colors.black,
                fontFamily: fonts.secondary[400],
              }}>
              {data.details.destination.city}{' '}
              {data.details.destination.zip_code}
            </Text>
          </View>
        </View>
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: windowWidth / 25,
            color: colors.white,
            marginHorizontal: 10,
            backgroundColor: colors.primary,
            textAlign: 'right',
            marginTop: 10,
            fontFamily: fonts.secondary[600],
          }}>
          Detail Pengiriman
        </Text>
        <View style={{padding: 10}}>
          {data.histories.sort().map(item => {
            return (
              <View style={{marginVertical: 5}}>
                <Text
                  style={{
                    fontSize: windowWidth / 30,
                    color: colors.black,
                    fontFamily: fonts.secondary[600],
                  }}>
                  {item.created_at}
                </Text>
                <Text
                  style={{
                    fontSize: windowWidth / 30,
                    color: colors.black,
                    fontFamily: fonts.secondary[400],
                  }}>
                  {item.status}{' '}
                  {item.receiver.length > 0 ? 'DIterima Oleh' : ''}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
