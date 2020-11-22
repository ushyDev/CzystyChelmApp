import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect }  from 'react';
import { Button, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const API_KEY = 'AIzaSyDNjnKGQCBwlsIlX6oqYtdO_a-4LYzEUyw';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

async function callGoogleVisionAsync(image) {
  const body = {
    requests: [
      {
        image: {
          content: image,
        },
        features: [
          {
            type: 'LABEL_DETECTION',
            maxResults: 1,
          },
        ],
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  console.log('callGoogleVisionAsync -> result', result);

  return result.responses[0].labelAnnotations[0].description;
}

export default function Glowne() {

  useEffect(() => {
    const rakietaRef = firebase.firestore().collection('rakieta')
    
  });

  const [image, setImage] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [permissions, setPermissions] = React.useState(false);
  const [pojemnik, setPojemnik] = React.useState(null);
  const [kolor, setKolor] = React.useState(null);
  const [colors, setColors] = React.useState(null);


  const askPermissionsAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    } else {
      setPermissions(true);
    }
  };

  const takePictureAsync = async () => {
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      base64: true,
    });

    if (!cancelled) {
      setColors(null)
      setPojemnik(null)
      setKolor(null)
      setImage(uri);
      setStatus('Hmm...');
      try {
        const result = await callGoogleVisionAsync(base64);
        setStatus(result);
        switch (result) {
          case 'Plastic Bottle':
            setPojemnik('Plastik')
            break;

          case 'Food':
            setPojemnik('BIO')
            break;

          case 'Glass':
              setPojemnik('Szkło')
              break;
              
              case 'Banan':
              setPojemnik('BIO')
              break;

              case 'Product':
                  setPojemnik('Plastik')
                  break;

              case 'Coffe':
              setPojemnik('Papier')
              break;

              case 'Mice':
              setPojemnik('Elektrośmieć')
              break;

              case 'Computer keyboard':
              setPojemnik('Elektrośmieć')
              break;

              case 'Keyboard':
              setPojemnik('Elektrośmieć')
              break;

              case 'Laptop':
              setPojemnik('Elektrośmieć')
              break;

              case 'Drink':
              setPojemnik('BIO')
              break;

              case 'Headphones':
              setPojemnik('Elektrośmieć')
              break;

              case 'Banana family':
              setPojemnik('BIO')
              setKolor('Brązowego')
              setColors('#964b00')
              break;

          default:
            setPojemnik('Plastik')
        }

        // switch(pojemnik){
        //   case 'BIO':
        //     setKolor('Brązowego')
        //     setColors('#964b00')
        //   break;
        //   case 'Szkło':
        //       setKolor('Zielonego')
        //       setColors('#2fd756')
        //     break;
        //     case 'Metal':
        //       setKolor('Czerwonego')
        //       setColors('#eb0c0c')

        //     break;
        //     case 'Papier':
        //       setKolor('Niebieskiego')
        //       setColors('#0c7feb')

        //     break;
        //     case 'Mieszane':
        //       setKolor('Czarnego')
        //       setColors('#000000')

        //     break;
        //     case 'Elektrośmieć':
        //       setKolor('Elektrośmieciem')
        //       setColors('#000000')

        //     break;
        //     default:
        //         setKolor('Czarnego')  
        //         setColors('#000000')
          
        // }

      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    } else {
      setImage(null);
      setStatus(null);
    }
  };

  return (
    <View style={styles.container}>
      {permissions === false ? (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontFamily: 'rubikLight', fontSize: 16}}>Zrób zdjęcie wybranego przedmiotu.</Text>
        <Text style={{fontFamily: 'rubikLight', fontSize: 16}}>Aplikacja rozpozna go i skaże właściwy</Text>
        <Text style={{fontFamily: 'rubikLight', fontSize: 16}}>rodzaj kontenera.</Text>


        <Image style={{width: windowWidth , resizeMode: 'contain', marginVertical: -50}} source={require('../assets/unnamed.png')} />
        <View style={styles.pozwolenie}>
        <TouchableOpacity onPress={askPermissionsAsync}>
       <Text style={styles.buttontext}>Sprawdź gdzie wyrzucić!</Text>
        </TouchableOpacity>
        </View>
        </View>
      ) : (
        <>
 {image && 
        <View style={styles.zdjecieContener}>
         <Image style={styles.image} source={{ uri: image }} />
        </View>
}
{status &&
        <View style={{flexDirection: 'column',  justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Text style={styles.text}>Twoje zdjecie przedstawia </Text>
           <Text style={styles.text2}>{status}</Text>
        </View>
}
          {pojemnik && 
          <View style={{justifyContent: 'center', alignItems: 'center', marginVertical :5, }}>
          <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.text}>czyli, jest to </Text>
          <Text style={styles.text2}>{pojemnik}</Text>
          </View>
          <Text style={styles.text}>wrzuć do</Text>
          <Text style={[styles.text3, {color: colors}]}>{kolor} pojemnika</Text>

          </View>
          }

          
          <View style={styles.pozwolenie}>
        <TouchableOpacity onPress={takePictureAsync}>
       <Text style={styles.buttontext}>Gotowy? Zrób zdjęcie</Text>
        </TouchableOpacity>
        </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 17,
    fontFamily: 'rubikLight',
    paddingVertical: 5

  },
  text2: {
    fontSize: 25,
    fontFamily: 'rubikRegular',
    color: '#2fd756',
    paddingVertical: 5


  },
  text3: {
    fontSize: 25,
    fontFamily: 'rubikRegular',
    paddingVertical: 5


  },
  pozwolenie: {
    borderWidth: 3,
    borderColor: '#2fd756',
    padding: 15,
    borderRadius: 15,
    backgroundColor:'#2fd756',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 11,
},
shadowOpacity: 0.55,
shadowRadius: 14.78,

elevation: 22,
  },
  buttontext: {
    fontFamily: 'rubikLight',
    fontSize: 20,
   color: 'white'
  }, 
  zdjecieContener: {
    borderWidth:6,
    borderColor: '#2fd756',
    borderRadius: 10,



    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 8,
},
shadowOpacity: 0.46,
shadowRadius: 11.14,

elevation: 17,
  }
});