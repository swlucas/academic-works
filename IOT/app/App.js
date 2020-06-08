import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ProgressViewIOS,
  ProgressBarAndroid,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";

import axios from "axios";
const ENDPOINT = "https://idh17.sse.codesandbox.io";

export default function App() {
  const [response, setResponse] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios.get(`${ENDPOINT}/tanque`).then(({ data }) => {
      setResponse(data);
      setRefreshing(false);
    });
  }, [refreshing]);

  useEffect(() => {
    axios.get(`${ENDPOINT}/tanque`).then(({ data }) => setResponse(data));
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "blue", fontWeight: "bold", fontSize: 20 }}>
              WATER VIEW
            </Text>
          </View>
          {!response.length ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "gray" }}>Não há Registro</Text>
            </View>
          ) : (
            response.map((res, index) => (
              <View
                key={index}
                style={{
                  height: 40,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>{res.tanque}</Text>
                {Platform.OS === "android" ? (
                  <ProgressBarAndroid
                    style={{ width: 300 }}
                    progressTintColor="blue"
                    progress={res.nivel}
                  />
                ) : (
                  <ProgressViewIOS
                    style={{ width: 300 }}
                    progressTintColor="blue"
                    progress={res.nivel}
                  />
                )}
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
