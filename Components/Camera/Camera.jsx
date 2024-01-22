// import React, { useEffect, useState } from 'react'
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import { Camera } from 'expo-camera'

// const CameraImg = () => {

//     const [ type, setType ] = useState (Camera.Constants.Type.back)
//     const [ hasPermission, setHasPermission] = useState (null)

//     useEffect (() => {
//         (async () => {
//             const { status } = await Camera.requestPermissionsAsync()
//             setHasPermission(status === 'granted')
//         })
//     }, [])

//     if(hasPermission === null){
//         return <View />
//     }
//     else if(hasPermission === false){
//         return <Text>Sem accesso a camera</Text>
//     }

//   return (
//     <SafeAreaView style={styles.container}>
//         <Camera
//             styles={styles.camera}
//             type={type}
//         >

//         </Camera>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create ( {
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         backgroundColor:'red',
//         width:'100%',
//         height: '80%'

//     },
//     camera: {
//         width:'100%',
//         height: '80%'
//     }

// })
// export default CameraImg


import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';

const CameraImg = ({ onPictureTaken }) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  } else if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  const takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      onPictureTaken(photo);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => (this.camera = ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CameraImg;