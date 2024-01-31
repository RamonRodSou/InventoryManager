import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

const CameraImg = () => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [savedPictureUri, setSavedPictureUri] = useState(null);
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus === 'granted')
    })()
  }, [])

  if (hasCameraPermission === null) {
    return <View />
  } else if (hasCameraPermission === false) {
    return <Text>Sem acesso à câmera</Text>
  }

  const takePicture = async () => {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      savePicture(photo);
    }
  };

  const retrieveSavedPictureUri = async () => {
    try {
      const uri = await SecureStore.getItemAsync('savedPictureUri');
      setSavedPictureUri(uri);
    } catch (error) {
      console.error('Error retrieving saved picture URI:', error);
    }
  };

  const savePicture = async (photo) => {
    const fileUri = FileSystem.documentDirectory + 'yourFileName.jpg';

    try {
      await FileSystem.copyAsync({
        from: photo.uri,
        to: fileUri,
      });
      console.log('Picture saved to:', fileUri);

      // Save the file URI to Local Storage
      await SecureStore.setItemAsync('savedPictureUri', fileUri);
      setSavedPictureUri(fileUri); // Update the state with the new URI
    } catch (error) {
      console.error('Error saving picture:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => (this.camera = ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {savedPictureUri && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Saved Image:</Text>
          <Image style={styles.previewImage} source={{ uri: savedPictureUri }} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 18,
    marginBottom: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  }
});

export default CameraImg;
