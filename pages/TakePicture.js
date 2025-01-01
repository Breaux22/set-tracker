import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, Image } from 'react-native';

export default function CameraPage() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState('off');
  const [image, setImage] = useState();

  const cameraRef = useRef();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'front' ? 'back' : 'front'));
  }

  function toggleFlash () {
    if (flash === 'on') {
      setFlash('off');
    } else {
      setFlash('on');
    }
  }

  async function takeImage() {
    if (cameraRef.current) {
      cameraRef.current.takePictureAsync({
        base64: false,
        onPictureSaved: async (picture) => {
          console.log('Picture saved:', picture.uri)
          setImage(String(picture.uri));
          const asset = await MediaLibrary.createAssetAsync(picture.uri);
        }
      });
    }
  }

  return (

    <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
      <View style={styles.row}>
          <TouchableOpacity style={styles.icon1} onPress={toggleCameraFacing}>
            <Image source={require('../assets/icons/repeat.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon2} onPress={toggleFlash}>
            <Image source={require('../assets/icons/thunder.png')} style={styles.icon} />
          </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.snap} onPress={takeImage}>
          <Image source={require('../assets/icons/circle.png')} style={styles.bigIcon} />
      </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={{
          width: 80, height: 150, resizeMode: 'contain', marginTop: - 125, marginLeft: 270, borderWidth: 1, borderColor: "#fff"
        }} />}
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row'
  },
  icon: {
    width: 50,
    height: 50,
  },
  bigIcon: {
    width: 100,
    height: 100
  },
  icon1: {
    marginLeft: 20,
    marginTop: 20,
  },
  icon2: {
    marginTop: 20,
    marginLeft: 250
  },
  snap: {
    width: 75,
    marginLeft: 145,
    marginTop: 525,
  }
});
