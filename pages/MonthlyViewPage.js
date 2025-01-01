import * as React from 'react';
import { useCallback } from 'react';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullCalendar from '../components/FullCalendar/FullCalendar';
import MonthlyViewObject from '../components/MonthlyViewObject/MonthlyViewObject';
import EntypoIcon from "react-native-vector-icons/Entypo";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle } from "react-native-reanimated";
import { useFocusEffect } from '@react-navigation/native';

const MonthlyViewPage = ({ navigation }) => {
    const [calendar, setCalendar] = useState([]);
    const [monthlyCaseData, setMonthlyCaseData] = useState([]);
    const [dailyCaseData, setDailyCaseData] = useState([]);
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [noCases, setNoCases] = useState(styles.noCases);
    const [calSlice1, setCalSlice1] = useState([]);
    const [calSlice2, setCalSlice2] = useState([]);
    const [calSlice3, setCalSlice3] = useState([]);
    const [calSlice4, setCalSlice4] = useState([]);
    const [calSlice5, setCalSlice5] = useState([]);
    const [calSlice6, setCalSlice6] = useState([]);
    const [calStyle, setCalStyle] = useState(styles.show);

    useFocusEffect(
        useCallback(() => {
          console.log('MonthlyViewPage is focused');
          // Function to run when ScreenA comes into focus
          const runOnFocus = () => {
            refresh();
          };
    
          runOnFocus();
    
          return () => {
            console.log('MonthlyViewPage is unfocused');
          };
        }, [])
      );

    async function getCases (year, month) {
        const headers = {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json'
            },
            'body': JSON.stringify({'surgYear': year, 'months': month})
        }
        const response = await fetch('https://e6b80fb8-7d8e-4c21-a8d1-7a5368d27fcd-00-2ty982vc8hd6g.spock.replit.dev/getCases', headers)
            .then(response => response.json())
            .then(data => {return data})
        return response;
    }

    async function getDailyCaseData (date, month) {
        const cases = monthlyCaseData.filter(item => item.surgdate == date);
        if (cases.length != 0) {
            setDailyCaseData(cases);
            setNoCases(styles.hiddenText);
        } else {
            setDailyCaseData([]);
            setNoCases(styles.noCases);
        }
    }

    async function generateCalendar(year, month) {
        const caseData = await getCases(year, [month]);
        setMonthlyCaseData(caseData);
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        const daysInMonth = endDate.getDate();
        const calendar = [];
        let currentDate = new Date(startDate);
        // Fill in previous month's days if needed
        const startDayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        if (startDayOfWeek > 0) {
            const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
            const previousMonth = month === 0 ? 11 : month - 1;
            const previousMonthYear = month === 0 ? year - 1 : year;
            for (let i = startDayOfWeek - 1; i >= 0; i--) {
                calendar.push({ 
                    'date': lastDayOfPreviousMonth - i,
                    'month': previousMonth,
                    'dotStyle': styles.hiddenGreyDot,
                    'blockStyle': styles.greyBlock
                });
            }
        }
        // Fill in current month's days
        const today = String(new Date()).slice(0,10);
        for (let i = 1; i <= daysInMonth; i++) {
            const positiveCase = caseData.find(item => item.surgdate == i);
            const checkDate = String(new Date(year, month, i)).slice(0,10);
            if (positiveCase != undefined && checkDate == today) {
                // case, today
                calendar.push({ 
                    'date': i,
                    'month': month,
                    'dotStyle': styles.dot,
                    'blockStyle': styles.calendarTodayBlock
                });
            }
            if (positiveCase != undefined && checkDate != today) {
                // case, not today
                calendar.push({ 
                    'date': i,
                    'month': month,
                    'dotStyle': styles.dot,
                    'blockStyle': styles.calendarBlock
                });
            } 
            if (positiveCase == undefined && checkDate == today) {
                // no case, today
                calendar.push({ 
                    'date': i,
                    'month': month,
                    'dotStyle': styles.hiddenBlueDot,
                    'blockStyle': styles.calendarTodayBlock
                });
            } else if (positiveCase == undefined && checkDate != today) {
                // no case, not today
                calendar.push({ 
                    'date': i,
                    'month': month,
                    'dotStyle': styles.hiddenWhiteDot,
                    'blockStyle': styles.calendarBlock
                });
            }
        }
        // Fill in next month's days if needed
        const endDayOfWeek = endDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        if (endDayOfWeek < 6) {
            const remainingDays = 6 - endDayOfWeek;
            const nextMonth = month === 11 ? 0 : month + 1;
            const nextMonthYear = month === 11 ? year + 1 : year;
            for (let i = 1; i <= remainingDays; i++) {
                calendar.push({ 
                    'date': i,
                    'month': nextMonth,
                    'dotStyle': styles.hiddenGreyDot,
                    'blockStyle': styles.greyBlock
                });
            }
        }
        return calendar;
    }
    
    function convertMonthToString () {
        const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return monthArr[currMonth];
    }

    async function incMonth () {
        if (currMonth < 11) {
            const cal = await generateCalendar(currYear, currMonth + 1);
            setCurrMonth(currMonth + 1);
            setCalendar(cal);
            setDailyCaseData([]);
            setCalSlice1(cal.slice(0,7));
            setCalSlice2(cal.slice(7,14));
            setCalSlice3(cal.slice(14,21));
            setCalSlice4(cal.slice(21,28));
            setCalSlice5(cal.slice(28,35));
            setCalSlice6(cal.slice(35,42));
        } else {
            const cal = await generateCalendar(currYear + 1, 0);
            setCurrMonth(0);
            setCurrYear(currYear + 1);
            setCalendar(cal);
            setDailyCaseData([]);
            setCalSlice1(cal.slice(0,7));
            setCalSlice2(cal.slice(7,14));
            setCalSlice3(cal.slice(14,21));
            setCalSlice4(cal.slice(21,28));
            setCalSlice5(cal.slice(28,35));
            setCalSlice6(cal.slice(35,42));
        }
    }
    async function decMonth () {
        if (currMonth > 0) {
            const cal = await generateCalendar(currYear, currMonth - 1);
            setCurrMonth(currMonth - 1);
            setCalendar(cal);
            setDailyCaseData([]);
            setCalSlice1(cal.slice(0,7));
            setCalSlice2(cal.slice(7,14));
            setCalSlice3(cal.slice(14,21));
            setCalSlice4(cal.slice(21,28));
            setCalSlice5(cal.slice(28,35));
            setCalSlice6(cal.slice(35,42));
        } else {
            const cal = await generateCalendar(currYear - 1, 11);
            setCurrMonth(11);
            setCurrYear(currYear - 1);
            setCalendar(cal);
            setDailyCaseData([]);
            setCalSlice1(cal.slice(0,7));
            setCalSlice2(cal.slice(7,14));
            setCalSlice3(cal.slice(14,21));
            setCalSlice4(cal.slice(21,28));
            setCalSlice5(cal.slice(28,35));
            setCalSlice6(cal.slice(35,42));
        }
    }

    const fetchCalendarData = async (year, month) => {
        try {
            const data = await generateCalendar(year, month);
            setCalendar(data);
            return data
        } catch (error) {
            console.error('Error fetching calendar data:', error);
        }
    };

    useEffect(() => {
        (async () => {
            const cal = await fetchCalendarData(new Date().getFullYear(), new Date().getMonth())
            setCalSlice1(cal.slice(0,7));
            setCalSlice2(cal.slice(7,14));
            setCalSlice3(cal.slice(14,21));
            setCalSlice4(cal.slice(21,28));
            setCalSlice5(cal.slice(28,35));
            setCalSlice6(cal.slice(35,42));
        })();    
        
        return () => {};
    }, [])

    /*
    useEffect(() => {
        const interval = setInterval( async () => {
          // Run your custom function based on the current value of val
          console.log(currYear, currMonth);
          const cal = await fetchCalendarData(currYear, currMonth)
          setCalSlice1(cal.slice(0,7));
          setCalSlice2(cal.slice(7,14));
          setCalSlice3(cal.slice(14,21));
          setCalSlice4(cal.slice(21,28));
          setCalSlice5(cal.slice(28,35));
          setCalSlice6(cal.slice(35,42));
        }, 5000); // 5000 milliseconds = 5 seconds
    
        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
      }, [currYear, currMonth]);
      */

    const intervalRef = useRef(null);

    async function refresh() {
        const cal = await generateCalendar(currYear, currMonth);
        setCalendar(cal);
        setDailyCaseData([]);
        setCalSlice1(cal.slice(0,7));
        setCalSlice2(cal.slice(7,14));
        setCalSlice3(cal.slice(14,21));
        setCalSlice4(cal.slice(21,28));
        setCalSlice5(cal.slice(28,35));
        setCalSlice6(cal.slice(35,42));
    }

    async function today() {
        const cal = await generateCalendar(new Date().getFullYear(), new Date().getMonth());
        setCurrMonth(new Date().getMonth());
        setCurrYear(new Date().getFullYear());
        setCalendar(cal);
        setDailyCaseData([]);
        setCalSlice1(cal.slice(0,7));
        setCalSlice2(cal.slice(7,14));
        setCalSlice3(cal.slice(14,21));
        setCalSlice4(cal.slice(21,28));
        setCalSlice5(cal.slice(28,35));
        setCalSlice6(cal.slice(35,42));
    }
    
    return (
        <SafeAreaView>
            <ScrollView>
                <TouchableOpacity style={styles.rect5} onPress={() => navigation.navigate('Weekly View', { calendar: calendar, month: currMonth, year: currYear})}>
                    <Text style={styles.centered}>Weekly View</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <View style={styles.monthScroll}>
                        <Text style={styles.year}>{currYear}</Text>
                        <Text style={styles.month}>{convertMonthToString()}</Text>
                        <View style={styles.scroll}>
                            <TouchableOpacity onPress={() => decMonth()}>
                                <EntypoIcon 
                                    name="arrow-left" 
                                    style={styles.arrow}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={incMonth}>
                                <EntypoIcon 
                                    name="arrow-right"
                                    style={styles.arrow}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.new} onPress={() => navigation.navigate('Create New Case')}>
                            <Text style={styles.newText}>+</Text>
                        </TouchableOpacity>
                        <View style={styles.btnRow}>
                            <TouchableOpacity style={styles.refresh} onPress={() => refresh()}>
                                <Text style={styles.refreshText}>Refresh</Text>
                            </TouchableOpacity>                        
                            <TouchableOpacity style={styles.today} onPress={() => today()}>
                                <Text style={styles.todayText}>Today</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.day}>S</Text>
                    <Text style={styles.day}>M</Text>
                    <Text style={styles.day}>T</Text>
                    <Text style={styles.day}>W</Text>
                    <Text style={styles.day}>T</Text>
                    <Text style={styles.day}>F</Text>
                    <Text style={styles.day}>S</Text>
                </View>
                <View>
                    <Animated.View >
                        <FlatList 
                            data={calSlice1}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={item.blockStyle}
                                    onPress={() => getDailyCaseData(item.date, currMonth)} // year can be assumed here
                                >
                                    <Text>{item.date}</Text>
                                    <EntypoIcon
                                        name="dot-single"
                                        style={item.dotStyle}
                                    />
                                </TouchableOpacity>
                            )}
                            horizontal={true}
                            scrollEnabled={false}
                        />
                        <FlatList 
                            data={calSlice2}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={item.blockStyle}
                                    onPress={() => getDailyCaseData(item.date, currMonth)}
                                >
                                    <Text>{item.date}</Text>
                                    <EntypoIcon
                                        name="dot-single"
                                        style={item.dotStyle}
                                    />
                                </TouchableOpacity>
                            )}
                            horizontal={true}
                            scrollEnabled={false}
                        />
                        <FlatList 
                            data={calSlice3}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={item.blockStyle}
                                    onPress={() => getDailyCaseData(item.date, currMonth)}
                                >
                                    <Text>{item.date}</Text>
                                    <EntypoIcon
                                        name="dot-single"
                                        style={item.dotStyle}
                                    />
                                </TouchableOpacity>
                            )}
                            horizontal={true}
                            scrollEnabled={false}
                        />
                        <FlatList 
                            data={calSlice4}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={item.blockStyle}
                                    onPress={() => getDailyCaseData(item.date, currMonth)}
                                >
                                    <Text>{item.date}</Text>
                                    <EntypoIcon
                                        name="dot-single"
                                        style={item.dotStyle}
                                    />
                                </TouchableOpacity>
                            )}
                            horizontal={true}
                            scrollEnabled={false}
                        />
                        <FlatList 
                            data={calSlice5}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={item.blockStyle}
                                    onPress={() => getDailyCaseData(item.date, currMonth)}
                                >
                                    <Text>{item.date}</Text>
                                    <EntypoIcon
                                        name="dot-single"
                                        style={item.dotStyle}
                                    />
                                </TouchableOpacity>
                            )}
                            horizontal={true}
                            scrollEnabled={false}
                        />
                        <FlatList 
                            data={calSlice6}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={item.blockStyle}
                                    onPress={() => getDailyCaseData(item.date, currMonth)}
                                >
                                    <Text>{item.date}</Text>
                                    <EntypoIcon
                                        name="dot-single"
                                        style={item.dotStyle}
                                    />
                                </TouchableOpacity>
                            )}
                            horizontal={true}
                            scrollEnabled={false}
                        />
                    </Animated.View>
                </View>
                <View>
                    <Text style={noCases}>No Cases or No Date Selected</Text>
                </View>
                <FlatList
                    data={dailyCaseData}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={(() => navigation.navigate('Case Info', {caseProp: item}))}>
                            <MonthlyViewObject caseProp={item}/>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    rect5: {
        width: 300,
        height: 39,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 15,
        marginTop: 16,
        marginLeft: 45,
        marginBottom: 16
    },
    row: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: "#cfcfcf",
        borderBottomWidth: 1,
        borderBottomColor: "#cfcfcf"
    },
    btnRow: {
        flexDirection: 'row',
    },
    centered: {
        marginLeft: 115,
        marginTop: 12
    },
    day: {
        fontWeight: 'medium-bold',
        fontSize: 40,
        marginLeft: 15,
        marginRight: 13,
        color: "#8a8a8a"
    },
    calendarRow: {
        flexDirection: 'row',
        height: 50,
        width: 347,
        borderColor: '#cfcfcf',
        borderWidth: 2,
        marginLeft: 20,
        marginTop: -2,
    },
    calendarBlock: {
        marginLeft: 0,
        paddingLeft: 4,
        paddingRight: 3,
        borderLeftColor: "#cfcfcf",
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#cfcfcf",
        backgroundColor: '#fff'
    },
    calendarTodayBlock: {
        marginLeft: 0,
        paddingLeft: 4,
        paddingRight: 3,
        borderLeftColor: "#cfcfcf",
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#cfcfcf",
        backgroundColor: '#aae6f2'
    },
    greyBlock: {
        marginLeft: 0,
        paddingLeft: 4,
        paddingRight: 3,
        borderLeftColor: "#cfcfcf",
        borderLeftWidth: 1,
        backgroundColor: "#8a8a8a",
    },
    dot: {
        fontSize: 47,
        marginTop: -14,
        marginLeft: 1,
        color: "#0dd406"
    },
    arrow: {
        fontSize: 50,
        marginLeft: 0,
        marginRight: 0,
        color: "#fefefe",
    },
    month: {
        fontSize: 30,
        fontWeight: 'Bold',
        color: "#fefefe",
        marginLeft: 0,
    },
    year: {
        fontWeight: "medium",
        fontSize: 25,
        color: "#fefefe",
        marginLeft: 0,
    },
    noCases: {
        fontSize: 20,
        marginLeft: 65,
        marginTop: 40
    },  
    new: {
        backgroundColor: '#8a8a8a',
        marginLeft: 15,
        width: 195,
        height: 65,
        marginTop: 15,
        borderRadius: 15
    },
    newText: {
        color: "#fefefe",
        fontSize: 90,
        marginTop: -27,
        marginLeft: 70
    },
    hiddenText: {
        display: 'none'
    },
    hiddenGreyDot: {        
        fontSize: 47,
        marginTop: -12,
        marginLeft: 1,
        color: "#8a8a8a"
    },
    hiddenBlueDot: {
        fontSize: 47,
        marginTop: -12,
        marginLeft: 1,
        color: "#aae6f2"
    },
    hiddenWhiteDot: {
        fontSize: 47,
        marginTop: -12,
        marginLeft: 1,
        color: "#fff"
    },
    monthScroll: {
        backgroundColor: '#0c71b0',
        width: 150,
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    scroll: {
        flexDirection: 'row',     
    },
    show: {
        display:'flex'
    },
    refresh: {
        backgroundColor: "#cbf5cf",
        borderRadius: 15,
        height: 40,
        width: 95,
        marginLeft: 15,
        marginTop: 10
    },
    refreshText: {
        fontSize: 20,
        color: "#2e5932",
        marginLeft: 13,
        marginTop: 7
    },
    today: {
        backgroundColor: "#cfd4cf",
        borderRadius: 15,
        height: 40,
        width: 95,
        marginLeft: 5,
        marginTop: 10
    },
    todayText: {
        fontSize: 20,
        color: "#6f736f",
        marginLeft: 23,
        marginTop: 7
    }
  });

export default MonthlyViewPage;
