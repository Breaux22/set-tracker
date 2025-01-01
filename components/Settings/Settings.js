import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.rectRow}>
        <View style={styles.rect}>
          <Icon name="close" style={styles.icon}></Icon>
          <View style={styles.rect3}>
            <Button title='Monthly View' onPress={() => {navigation.navigate('MonthlyViewPage')}} />
          </View>
          <View style={styles.rect4}>
            <Text style={styles.weeklyView}>Weekly View</Text>
          </View>
          <View style={styles.rect5}>
            <Text style={styles.dailyView}>Daily View</Text>
          </View>
          <View style={styles.rect6}>
            <Text style={styles.settings}>Settings</Text>
          </View>
        </View>
        <View style={styles.rect2}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 736,
    flexDirection: "row"
  },
  rect: {
    width: 262,
    height: 736,
    backgroundColor: "#E6E6E6"
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    height: 41,
    width: 31,
    marginTop: 6,
    marginLeft: 10
  },
  rect3: {
    width: 201,
    height: 39,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 30
  },
  monthlyView: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 29,
    width: 165,
    textAlign: "center",
    fontSize: 20,
    marginTop: 6,
    marginLeft: 18
  },
  rect4: {
    width: 201,
    height: 39,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    marginTop: 17,
    marginLeft: 30
  },
  weeklyView: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 29,
    width: 165,
    textAlign: "center",
    fontSize: 20,
    marginTop: 6,
    marginLeft: 18
  },
  rect5: {
    width: 201,
    height: 39,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    marginTop: 16,
    marginLeft: 30
  },
  dailyView: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 29,
    width: 165,
    textAlign: "center",
    fontSize: 20,
    marginTop: 5,
    marginLeft: 18
  },
  rect6: {
    width: 201,
    height: 39,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    marginTop: 464,
    marginLeft: 30
  },
  settings: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 29,
    width: 165,
    textAlign: "center",
    fontSize: 20,
    marginTop: 6,
    marginLeft: 18
  },
  rect2: {
    width: 113,
    height: 736,
    backgroundColor: "rgba(230,230, 230,0.3)"
  },
  rectRow: {
    height: 736,
    flexDirection: "row",
    flex: 1
  }
});

export default Settings;
