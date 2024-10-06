import { useEffect } from "react"
import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { GlobalDynamics, Globals } from './style/globals';
import { FlashList } from "@shopify/flash-list";
import Socket, { ConnectWebSocket } from "./services/socket";

export default function App() {

  const [text, setText] = useState("");

  const [chatList, setChatList] = useState([]);

  const ws = new Socket(process.env.EXPO_PUBLIC_SOCKET_ENDPOINT);


  useEffect(() => {

    ws.connect();

    const handleOnMessage = (message)=>{
      setChatList((prev)=>[...prev, message.data]);
  }

    ws.socket.onmessage = handleOnMessage;

    return(
      ws.close()
    )

  }, [ws]);


  return (
    <View
      style={[
        GlobalDynamics.flex(1),
        Globals.alignCenter,
        Globals.justifyCenter,
        GlobalDynamics.alignSelf("#fff"),
        GlobalDynamics.rowGap(20),
        GlobalDynamics.paddingTop(60),

      ]}
    >

      <StatusBar style="auto" />

      <View
        style={[
          Globals.flexRow,
          GlobalDynamics.columnGap(12),
          GlobalDynamics.paddingHorizontal(16)
        ]}
      >
        <TextInput
          onChangeText={setText}
          placeholder="Type something..."
          value={text}
          style={[
            GlobalDynamics.flex(1),
            GlobalDynamics.height(36),
            GlobalDynamics.borderRadius(12),
            GlobalDynamics.paddingHorizontal(16),
            GlobalDynamics.border({
              width: 1,
              style: "solid",
              color: "#000"
            })
          ]}
        />

        <Button
          title="SEND"
          onPress={async () => {

            if (text != "") {
              if (text.trim) {
                ws.sendMessage(text);
                setText("")
              } else {
                Alert.alert("Warning", "Please enter a message!")
              }
            }

          }}
        />
      </View>

      <View style={[
        GlobalDynamics.flex(1),
        GlobalDynamics.width("100%")
      ]}>
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: 16
          }}
          data={chatList}
          renderItem={({ item }) =>
            <Text>{item}</Text>
          }
          estimatedItemSize={50}
        />
      </View>

    </View>
  );
}

