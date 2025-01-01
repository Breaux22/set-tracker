import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { Button, ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { useRoute } from "@react-navigation/native"
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DailyViewDate from '../components/DailyViewDate/DailyViewDate';
import MonthlyViewObject from '../components/MonthlyViewObject/MonthlyViewObject';
import { useFocusEffect } from '@react-navigation/native';

const DailyViewPage = ({ navigation }) => {
    const route = useRoute();
    const dayString = route.params?.dayString;
    const [cases, setCases] = useState(route.params?.cases);
    const [day, setDay] = useState(route.params?.dayProp.day);
    const [monthString, setMonthstring] = useState(route.params?.dayProp.monthString);
    const [month, setMonth] = useState(route.params?.dayProp.month)
    const [year, setYear] = useState(route.params?.dayProp.year);
    const [caseList, setCaseList] = useState([]);

    async function generateCaseList (newCases=cases, calledBy='init', date=day) {
        if (calledBy == 'init') {
            const output = await newCases.filter(item => item.surgdate == day);
            setCaseList(output);
            return
        }
        if (calledBy == 'dec') {
            const output = await newCases.filter(item => item.surgdate == date);
            return output;
        } else if (calledBy == 'inc') {
            const output = await newCases.filter(item => item.surgdate - 1 == day);
            return output;
        }
    }

    useFocusEffect(
        useCallback(() => {
          console.log('DailyViewPage is focused');
          // Function to run when ScreenA comes into focus
          const runOnFocus = () => {
            refresh();
          };
    
          runOnFocus();
    
          return () => {
            console.log('DailyViewPage is unfocused');
          };
        }, [])
      );

    async function refresh() {
        const newCases = await getDayCases(year, month);
        
        await generateCaseList(newCases);
    }
 
    useEffect(() => {
        (async () => {
            await generateCaseList();
        })();
        
        return () => {};
    }, []);

    async function getDayCases(year, month, day) {
        const headers = {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json'
            },
            'body': JSON.stringify({surgYear: year, months: [month] })
        }
        const response = await fetch('https://e6b80fb8-7d8e-4c21-a8d1-7a5368d27fcd-00-2ty982vc8hd6g.spock.replit.dev/getCases', headers)
            .then(response => response.json())
            .then(data => {
                return data;
            })
        return response;
    }

    async function generateMonthString(myMonth) {
        const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthArr[myMonth];
    }

    async function getAdjacentDate(year, month, day, direction) {
        // Create a date object from the provided year, month, and day
        let date = new Date(year, month, day);
        // Adjust the date based on the direction parameter
        if (direction === 'before') {
            date.setDate(date.getDate() - 1);
        } else if (direction === 'after') {
            date.setDate(date.getDate() + 1);
        } else {
            throw new Error("Invalid direction. Use 'before' or 'after'.");
        }
        
        // Extract the new year, month, and day from the adjusted date object
        let newYear = date.getFullYear();
        let newMonth = date.getMonth(); // Months are zero-based
        let newDay = date.getDate();
        
        return { year: newYear, month: newMonth, day: newDay };
    }

    async function incDay() {
       const newDate = await getAdjacentDate(year, month, day, 'after');
       const newCases = await getDayCases(newDate.year, newDate.month, newDate.day);
       setDay(newDate.day);
       setMonth(newDate.month);
       setYear(newDate.year);
       const caseList = await generateCaseList(newCases, 'inc', newDate.day);
       setCaseList(caseList);
    }

    async function decDay() {
        const newDate = await getAdjacentDate(year, month, day, 'before');
        const newCases = await getDayCases(newDate.year, newDate.month, newDate.day);
        setDay(newDate.day);
        setMonth(newDate.month);
        setYear(newDate.year);
        const caseList = await generateCaseList(newCases, 'dec', newDate.day);
        setCaseList(caseList);
    }

    return (
        <ScrollView>
            <View style={styles.roundBox}>
                <View style={styles.dateStrings}>
                    <Text style={styles.text}>{year}</Text>
                    <Text style={styles.text}>{monthString}, {day}</Text>
                    <Text style={styles.text}>{dayString}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.addBox} onPress={() => navigation.navigate('Create New Case')}>
                        <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                    <View style={styles.row}>                    
                        <TouchableOpacity style={styles.left} onPress={() => decDay()}>
                            <Text style={styles.leftText}>{'<'} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.right} onPress={() => incDay()}>
                            <Text style={styles.rightText}> {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                <FlatList
                    data={caseList}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Case Info', {caseProp: item})}>
                            <MonthlyViewObject caseProp={item}/>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    );
  };

const styles = StyleSheet.create({
    roundBox: {
        backgroundColor: '#c2d9fc',
        padding: 10,
        flexDirection: 'row'
    },  
    text: {
        fontSize: 35,
        color: "#011b42",
        marginTop: 0
    },
    row: {
        flexDirection: 'row'
    },
    addBox: {  
        backgroundColor: '#ffffff',
        width: 144,
        marginLeft: -25,
        borderRadius: 10
    },
    addText: {
        fontSize: 50,
        marginLeft: 57
    },
    left: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        height: 60,
        width: 70,
        marginTop: 5,
        marginLeft: -25
    },
    leftText: {
        fontSize: 50,
        marginLeft: 17,
        marginTop: -4,
    },
    right: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        height: 60,
        width: 70,
        marginTop: 5,
        marginLeft: 5
    },
    rightText: {
        fontSize: 50,
        marginLeft: 12,
        marginTop: -4,
    },
    dateStrings: {
        width: 250
    }
});

export default DailyViewPage;