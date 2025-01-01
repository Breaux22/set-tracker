import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Index({ caseProp }) {
  return (
      <View style={styles.container}>
        <View style={styles.rect11}>
          <View style={styles.loremIpsum4Stack}>
            <Text style={styles.loremIpsum4}>{caseProp.surgtime}</Text>
            <View style={styles.rect12}></View>
          </View>
          <View style={styles.ptCadRow}>
            <Text style={styles.ptCad}>Pt. {caseProp.ptinit}</Text>
            <Text style={styles.acdf17}>{caseProp.proctype}</Text>
          </View>
          <View style={styles.drStevensonRow}>
            <Text style={styles.drStevenson}>{caseProp.dr}</Text>
            <Text style={styles.c4C51Lvl}>{caseProp.notes.slice(0,13)}...</Text>
          </View>
          <View style={styles.notOrderedRow}>
            <Text style={styles.notOrdered}>{caseProp.surgstatus}</Text>
            <Icon name="exclamation-triangle" style={styles.icon3}></Icon>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 359,
    height: 149,
    marginLeft: 16,
    marginTop: 10
  },
  rect11: {
    width: 359,
    height: 149,
    backgroundColor: "rgba(225,68,97,0.6)",
    borderRadius: 25,
    shadowColor: "rgba(111,4,4,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 0
  },
  loremIpsum4: {
    top: 0,
    left: 2,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 28,
    width: 89,
    fontSize: 20
  },
  rect12: {
    top: 27,
    left: 0,
    width: 334,
    height: 2,
    position: "absolute",
    backgroundColor: "rgba(111,4,4,0.5)"
  },
  loremIpsum4Stack: {
    width: 334,
    height: 29,
    marginTop: 5,
    marginLeft: 12
  },
  ptCad: {
    fontFamily: "roboto-700",
    color: "rgba(111,4,4,1)",
    height: 28,
    width: 89,
    fontSize: 20
  },
  acdf17: {
    fontFamily: "roboto-700",
    color: "rgba(111,4,4,1)",
    height: 28,
    width: 172,
    fontSize: 20,
    textAlign: "right",
    marginLeft: 65
  },
  ptCadRow: {
    height: 28,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 14,
    marginRight: 19
  },
  drStevenson: {
    fontFamily: "roboto-italic",
    color: "rgba(111,4,4,1)",
    height: 28,
    width: 135,
    fontSize: 20
  },
  c4C51Lvl: {
    fontFamily: "roboto-700",
    color: "rgba(111,4,4,1)",
    height: 28,
    width: 130,
    fontSize: 20,
    textAlign: "right",
    marginLeft: 61
  },
  drStevensonRow: {
    height: 28,
    flexDirection: "row",
    marginLeft: 14,
    marginRight: 19
  },
  notOrdered: {
    fontFamily: "courier-regular",
    color: "#121212",
    height: 22,
    width: 128,
    fontSize: 18,
    transform: [
      {
        rotate: "1.00deg"
      }
    ],
    marginTop: 4
  },
  icon3: {
    color: "rgba(244,250,23,1)",
    fontSize: 25,
    height: 25,
    width: 25,
    marginLeft: 1,
    marginTop: 3
  },
  button: {
    width: 141,
    height: 31,
    backgroundColor: "rgba(253,250,250,1)",
    borderRadius: 10,
    marginLeft: 40
  },
  updateSetStatus: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 19,
    width: 137,
    fontSize: 16,
    textAlign: "center",
    marginTop: 6,
    marginLeft: 2
  },
  notOrderedRow: {
    height: 31,
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 14,
    marginRight: 10
  }
});

export default Index;
