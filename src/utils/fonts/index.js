import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const fonts = {
  primary: {
    200: 'Nunito-ExtraLight',
    300: 'Nunito-Light',
    400: 'Nunito-Regular',
    600: 'Nunito-SemiBold',
    700: 'Nunito-Bold',
    800: 'Nunito-ExtraBold',
    900: 'Nunito-Black',
    normal: 'Nunito-Regular',
  },
  secondary: {
    200: 'Montserrat-ExtraLight',
    300: 'Montserrat-Light',
    400: 'Montserrat-Regular',
    600: 'Montserrat-SemiBold',
    700: 'Montserrat-Bold',
    800: 'Montserrat-ExtraBold',
    900: 'Montserrat-Black',
    normal: 'Montserrat-Regular',
  },
};
