import {
  useState,//

} from 'react';
import {
  View,
  Text,
  StyleSheet,//スタイル変更するための場所
  TouchableOpacity //ボタンみたいな動きをする
}from 'react-native';

//
export default function FrontScreen(){
  //回数を数える場所
  //最初は0から
  const[count, setCount] = useState(0);
  
  return(
    <View style = {parts.main}>
      {/*タイトル*/}
      <Text style= {parts.front}>今日の筋トレ</Text>

      {/* カウント表示 */}
      <Text style= {parts.count}>{count}回</Text>

      {/*ボタンの場所*/}
      <TouchableOpacity
        style={parts.button}
        onPress={()=> setCount(count+1)}
        >
          <Text style={parts.ButtonText}>1回やった！</Text>
      </TouchableOpacity>
    </View>
  );
}

const parts = StyleSheet.create({

  //ホーム画面のスタイル設定
  main: {
    flex: 1,                 //画面全体を使う flex
    justifyContent: 'center',//縦方向の比率　justifyContent
    alignItems: 'center', //横方向の比率　alignItems
    padding: 16,
    backgroundColor: '#f5f5f5'
  },


  front:{
    fontSize: 24, //文字サイズ
    fontWeight: 'bold', //文字の太さ　bold太字
    marginBottom: 24, //次要素との間隔　どれだけ隙間を開けるか
  },
  //カウントボタンのスタイル設定
  count: {
    fontSize: 40,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
  },
  ButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});