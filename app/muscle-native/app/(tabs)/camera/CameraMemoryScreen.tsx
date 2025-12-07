// app/camera/CameraMemoryScreen.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraMemoryScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isActive, setIsActive] = useState(true);
  const [count, setCount] = useState(0); // 将来はカメラからの検知で増やすイメージ

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>カメラの許可が必要です</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>許可する</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* カメラプレビュー */}
      <CameraView style={styles.camera} facing="front" active={isActive} />

      {/* 一旦は「自分で増やす」ボタンにしておいて、あとでAI検知に差し替える */}
      <View style={styles.overlay}>
        <Text style={styles.countText}>{count} 回</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount((c) => c + 1)}
        >
          <Text style={styles.buttonText}>1回カウント（仮）</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => setIsActive((prev) => !prev)}
        >
          <Text style={styles.buttonText}>
            {isActive ? 'カメラ停止' : 'カメラ再開'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  secondaryButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
