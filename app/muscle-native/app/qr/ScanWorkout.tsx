import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// カメラを画面に表示
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
// 画面遷移をするのに必要なパーツ
import { useRouter } from "expo-router";

export default function ScanWorkOut() {
  // カメラをつかえるかの確認
  const [allow, requestAllow] = useCameraPermissions();
  // ＱＲで読み込めたかの確認
  const [scanned, setScanned] = useState(false);
  // 画面遷移の準備
  const router = useRouter();

  // 許可の情報がまだ来ていなければ何も描画しない
  if (!allow) {
    return <View />;
  }

  // 許可が出ていなかったら案内を表示
  if (!allow.granted) {
    return (
      <View style={parts.center}>
        <Text style={parts.infoText}>カメラの権限が必要です</Text>
        <Text onPress={requestAllow} style={parts.LinkText}>
          タップして許可
        </Text>
      </View>
    );
  }

  const BarcodeScan = (result: BarcodeScanningResult) => {
    // 連続で反応しないように
    if (scanned) return;
    setScanned(true);

    // QRの中身
    const data = result.data;
    console.log("QR data:", data);

    // 中身によって画面遷移
    if (data === "SQUAT") {
      router.push("/workouts/SquatCounter");
    } else if (data === "UDETATE") {
      router.push("/workouts/UDETATECounter");
    } else {
      
      alert(`知らないQRですな：${data}`);
      setScanned(false);
    }
  };

  return (
    <View style={parts.front}>
      <CameraView
        style={parts.camera}
        facing="back"
        onBarcodeScanned={BarcodeScan}
      />

      <View style={parts.overlay}>
        <Text style={parts.text}>筋トレ用QRコードをかざしてください</Text>
      </View>
    </View>
  );
}

const parts = StyleSheet.create({
  // 権限待ち・権限無しのときの表示用コンテナ
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#000", // ちょっと暗めの背景
  },
  infoText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
  },
  // 「タップして許可」のリンク風テキスト
  LinkText: {
    color: "#4da3ff",
    fontSize: 16,
    textDecorationLine: "underline",
  },

  // 画面全体コンテナ
  front: {
    flex: 1,
    backgroundColor: "#000", // カメラの周りが黒くなるように
  },

  // カメラプレビュー
  camera: {
    flex: 1,
  },

  // 画面下にかぶせる説明テキスト用のエリア
  overlay: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  // 「筋トレ用QRコードをかざしてください」のスタイル
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
});
