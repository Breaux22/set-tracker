import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

function Index({ navigation, dayProp }) {
  return (
    <View style={styles.container}>
        <View style={styles.group15}>
          <View style={styles.group13}>
            <View style={styles.group14}>
              <View style={styles.group16}>
                <View style={styles.group18}>
                  <View style={styles.group19}>
                    <View style={styles.group21}>
                      <View style={styles.rect4}>
                        <View style={styles.group12StackStackRow}>
                          <View style={styles.group12StackStack}>
                            <View style={styles.group12Stack}>
                              <View style={styles.group12}>
                                <Text style={styles.monday}>{dayProp[0].day}</Text>
                              </View>
                              <Text style={styles.loremIpsum2}>{dayProp[0].date}</Text>
                              <View style={dayProp[1].style}>
                                <View style={styles.rect7}>
                                  <Text style={styles.loremIpsum3}>{dayProp[1].surgtime}</Text>
                                  <View style={styles.acdfStack}>
                                    <Text style={styles.acdf}>{dayProp[1].proctype}</Text>
                                    <Text style={styles.acdf5}>{dayProp[1].lvls}</Text>
                                  </View>
                                  <Text style={styles.drSteven2}>{dayProp[1].dr}</Text>
                                  <Text style={styles.cad}>{dayProp[1].ptinit}</Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.group11}>
                              <View style={styles.group17}>
                                <View style={styles.group20}>
                                  <Text style={styles.dec20}>{dayProp[0].month}</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View style={dayProp[2].style}>
                            <View style={styles.rect8}>
                              <Text style={styles.text}>{dayProp[2].surgtime}</Text>
                              <View style={styles.plifStack}>
                                <Text style={styles.plif}>{dayProp[2].procType}</Text>
                                <Text style={styles.plif2}>{dayProp[2].lvls}</Text>
                              </View>
                              <Text style={styles.drSteven3}>{dayProp[2].dr}</Text>
                              <Text style={styles.hgt}>{dayProp[2].ptini}</Text>
                            </View>
                          </View>
                          <View style={dayProp[3].style}>
                            <View style={styles.rect9}>
                              <View style={styles.text2Stack}>
                                <Text style={styles.text2}>{dayProp[3].surgtime}</Text>
                                <Text style={styles.acdf3}>{dayProp[3].procType}</Text>
                              </View>
                              <Text style={styles.acdf6}>{dayProp[3].lvls}</Text>
                              <Text style={styles.drSteven4}>{dayProp[3].dr}</Text>
                              <Text style={styles.dit}>{dayProp[3].ptinit}</Text>
                            </View>
                          </View>
                          <View style={dayProp[4].style}>
                            <View style={styles.rect10}>
                              <View style={styles.text3Stack}>
                                <Text style={styles.text3}>{dayProp[4].surgtime}</Text>
                                <Text style={styles.alif}>{dayProp[4].procType}</Text>
                              </View>
                              <Text style={styles.text4}>{dayProp[4].lvls}</Text>
                              <Text style={styles.drErickson}>{dayProp[4].dr}</Text>
                              <Text style={styles.ber}>{dayProp[4].ptinit}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 359,
    height: 149,
    marginLeft: 15,
    marginBottom: 10
  },
  show:{
    display: 'flex'
  },
  hide: {
    display: 'none'
  },
  group15: {
    width: 359,
    height: 149
  },
  group13: {
    width: 359,
    height: 149
  },
  group14: {
    width: 359,
    height: 149
  },
  group16: {
    width: 359,
    height: 149
  },
  group18: {
    width: 359,
    height: 149
  },
  group19: {
    width: 359,
    height: 149
  },
  group21: {
    width: 359,
    height: 149
  },
  rect4: {
    width: 359,
    height: 149,
    backgroundColor: "rgba(210,241,196,1)",
    borderRadius: 20,
    shadowColor: "rgba(6,76,3,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.14,
    shadowRadius: 0,
    flexDirection: "row"
  },
  group12: {
    top: 2,
    left: 0,
    width: 97,
    height: 21,
    position: "absolute"
  },
  monday: {
    fontFamily: "roboto-500",
    color: "rgba(6,76,3,1)",
    height: 21,
    width: 97
  },
  loremIpsum2: {
    top: 21,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(6,76,3,1)",
    height: 52,
    width: 90,
    fontSize: 50
  },
  rect7: {
    top: 0,
    left: 90,
    width: 61,
    height: 127,
    position: "absolute",
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "rgba(6,76,3,1)",
    borderRadius: 10,
    borderStyle: "solid",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.01,
    shadowRadius: 0
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12,
    marginTop: 8,
    marginLeft: 7
  },
  acdf: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  acdf5: {
    top: 15,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  acdfStack: {
    width: 48,
    height: 31,
    marginLeft: 7
  },
  drSteven2: {
    fontFamily: "roboto-300",
    color: "#121212",
    height: 28,
    width: 48,
    fontSize: 12,
    marginTop: 1,
    marginLeft: 7
  },
  cad: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 48,
    fontSize: 14,
    marginTop: 17,
    marginLeft: 7
  },
  group12Stack: {
    top: 0,
    left: 0,
    width: 151,
    height: 127,
    position: "absolute"
  },
  group11: {
    top: 75,
    left: 1,
    width: 90,
    height: 52,
    position: "absolute"
  },
  group17: {
    width: 90,
    height: 52
  },
  group20: {
    width: 90,
    height: 52
  },
  dec20: {
    fontFamily: "roboto-regular",
    color: "rgba(6,76,3,1)",
    height: 52,
    width: 90,
    fontSize: 30
  },
  group12StackStack: {
    width: 151,
    height: 127
  },
  rect8: {
    width: 61,
    height: 127,
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "rgba(6,76,3,1)",
    borderRadius: 10,
    marginLeft: 3
  },
  text: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12,
    marginTop: 8,
    marginLeft: 6
  },
  plif: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  plif2: {
    top: 15,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  plifStack: {
    width: 48,
    height: 31,
    marginLeft: 6
  },
  drSteven3: {
    fontFamily: "roboto-300",
    color: "#121212",
    height: 28,
    width: 48,
    fontSize: 12,
    marginTop: 1,
    marginLeft: 6
  },
  hgt: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 48,
    fontSize: 14,
    marginTop: 17,
    marginLeft: 6
  },
  rect9: {
    width: 61,
    height: 127,
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "rgba(6,76,3,1)",
    borderRadius: 10,
    marginLeft: 1
  },
  text2: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  acdf3: {
    top: 15,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  text2Stack: {
    width: 48,
    height: 31,
    marginTop: 8,
    marginLeft: 5
  },
  acdf6: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12,
    marginLeft: 5
  },
  drSteven4: {
    fontFamily: "roboto-300",
    color: "#121212",
    height: 28,
    width: 48,
    fontSize: 12,
    marginTop: 1,
    marginLeft: 7
  },
  dit: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 48,
    fontSize: 14,
    marginTop: 17,
    marginLeft: 7
  },
  rect10: {
    width: 61,
    height: 127,
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "rgba(6,76,3,1)",
    borderRadius: 10,
    marginLeft: 2
  },
  text3: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  alif: {
    top: 15,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12
  },
  text3Stack: {
    width: 48,
    height: 31,
    marginTop: 8,
    marginLeft: 4
  },
  text4: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 16,
    width: 48,
    fontSize: 12,
    marginLeft: 4
  },
  drErickson: {
    fontFamily: "roboto-300",
    color: "#121212",
    height: 28,
    width: 48,
    fontSize: 12,
    marginTop: 1,
    marginLeft: 7
  },
  ber: {
    fontFamily: "roboto-700",
    color: "#121212",
    height: 14,
    width: 48,
    fontSize: 14,
    marginTop: 17,
    marginLeft: 7
  },
  group12StackStackRow: {
    height: 127,
    flexDirection: "row",
    flex: 1,
    marginRight: 5,
    marginLeft: 14,
    marginTop: 11
  }
});

export default Index;
