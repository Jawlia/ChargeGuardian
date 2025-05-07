import {Dimensions} from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

export const headerTitleStyle: any = {
  fontSize: 16,
  fontWeight: '900',
  fontFamily: 'Poppins-SemiBold',
};


export const languages = [
  {label: 'English', value: 'en'},
  {label: 'Hindi', value: 'hi'},
  {label: 'Marathi', value: 'mr'},
  {label: 'Tamil', value: 'ta'},
  {label: 'Telugu', value: 'te'},
  {label: 'Gujarati', value: 'gu'},
  {label: 'Urdu', value: 'ur'},
  {label: 'Kannada', value: 'kn'},
  {label: 'Malayalam', value: 'ml'},
];