import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function SquatCount(){
    const[permission, requestPermission] = useCameraPermissions();
    const[isActive,setIsActive] = useState(true);
    const[count, setCount] = useState(0);

    //権限がまだ来てなかったら非表示
    if(!permission){
        return <View />;
    }

    if(!permission.granted){
        return(
            <View style={front.center}>
                <Text style={front.infoText}>カメラの権限が必要です</Text>
                <TouchableOpacity style={front.button} onPress={requestPermission}>
                    <Text style={front.buttonText}>許可</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={front.container}>
            {/*カメラプレビュー*/}
            {/*カメラを表示するためのコンポーネント*/}
            <CameraView style={front.camera} facing="front" active={isActive}/>

            <View style={front.overlay}>
                <Text style={front.title}>スクワットカウント</Text>
                <Text style={front.count}>{count}回</Text>

                <TouchableOpacity
                    style={front.button}
                    onPress={() => setCount((c) => c+1)}
                >
                    <Text style={front.buttonText}>+1 (テスト)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[front.button,front.secondaryButton]}
                    onPress={() => setIsActive((prev)=> !prev)}
                >
                    <Text style={front.buttonText}>
                        {isActive? "カメラ停止":"カメラ再開"}
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    );
}

const front = StyleSheet.create({
     container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  count: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  secondaryButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  infoText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 12,
  },
});