import * as React from 'react';
import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useRoute } from "@react-navigation/native"
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DailyViewCase from '../components/DailyViewCase/DailyViewCase';
import { useFocusEffect } from '@react-navigation/native';


const WeeklyViewPage = ({ navigation }) => {
    const route = useRoute();
    //const [month, setMonth] = useState(route.params?.month);
    const [year, setYear] = useState(route.params?.year);
    const [week, setWeek] = useState(getWeek(route.params?.year, route.params?.month, getFirstSunday(route.params?.year, route.params?.month + 1), 'next'));
    const [cases, setCases] = useState([]); // replicate getCases() and make a new request pattern for this page

    
    useFocusEffect(
        useCallback(() => {
          console.log('WeeklyViewPage is focused');
          // Function to run when ScreenA comes into focus
          const runOnFocus = () => {
            refresh();
          };
    
          runOnFocus();
    
          return () => {
            console.log('WeeklyViewPage is unfocused');
          };
        }, [])
      );

    async function getCases (year, months) {
        const headers = {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json'
            },
            'body': JSON.stringify({'surgYear': year, 'months': months})
        }
        const response = await fetch('https://e6b80fb8-7d8e-4c21-a8d1-7a5368d27fcd-00-2ty982vc8hd6g.spock.replit.dev/getCases', headers)
            .then(response => response.json())
            .then(data => {return data})
        return response;
    }

    function getFirstSunday(year, month) {
        const firstDayOfMonth = new Date(year, month - 1, 0);
        const firstSunday = new Date(year, month - 1, 0);
    
        // Find the first Saturday of the month
        while (firstSunday.getDay() !== 0) {
            firstSunday.setDate(firstSunday.getDate() + 1);
        }
    
        // Return the date number of the first Saturday
        return firstSunday.getDate() - 1;
    }

    useEffect(() => {
        (async () => {
            const caseArray = await getCases(route.params?.year, [route.params?.month - 1, route.params?.month]);
            setCases(caseArray);
        })();
    
        return () => {
        // this now gets called when the component unmounts
        };
    }, []);

    function convertMonthToString (month) {
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthArr[month];
    }

    function getWeek(year, month, date, direction = 'next') {
        const daysInWeek = [];
        const currentDate = new Date(year, month, date);
    
        // Define the start date based on the direction
        const startDate = direction === 'next' ? currentDate : new Date(currentDate.setDate(currentDate.getDate() - 8));
    
        // Iterate over the next or previous 7 days
        for (let i = 1; i < 8; i++) {
            const tempDate = new Date(startDate);
            tempDate.setDate(startDate.getDate() + i);
    
            const dayObj = {
                year: tempDate.getFullYear(),
                month: tempDate.getMonth(),
                monthString: new Date(tempDate.getFullYear(), tempDate.getMonth(), 1).toLocaleString('default', { month: 'long' }),
                day: tempDate.getDate()
            };
            daysInWeek.push(dayObj);
        }
        return daysInWeek;
    }

    function incWeek() {
        setWeek(getWeek(week[6].year, week[6].month, week[6].day, 'next'));
        setYear(week[6].year);
    }

    function decWeek() {
        setWeek(getWeek(week[0].year, week[0].month, week[0].day, 'prev'));
        setYear(week[0].year)
    }

    function refresh () {
        setWeek(getWeek(week[0].year, week[0].month, week[0].day - 1, 'next'));
        setYear(week[0].year);
    }

    function generateDayProp(weekInfo, dayString) {
        const propArr = [{
            day: dayString,
            date: weekInfo.day,
            month: convertMonthToString(weekInfo.month)
        }];
        const dailyCases = cases.filter(item => item.surgyear == weekInfo.year && item.surgmonth == weekInfo.monthString && item.surgdate == weekInfo.day)
        for (let i=0; i < dailyCases.length; i++) {
            propArr.push({
                style: styles.show,
                surgtime: dailyCases[i].surgtime,
                proctype: dailyCases[i].proctype,
                lvls:  'n/a',
                dr: dailyCases[i].dr,
                ptinit: dailyCases[i].ptinit
            })
        }
        for (let i=0; i < 4; i++) {
            propArr.push({
                style: styles.hide,
                surgtime: '',
                proctype: '',
                lvls:  '',
                dr: '',
                ptinit: ''
            })
        }
        return propArr;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.refresh} onPress={() => refresh()}>
                    <Text style={styles.refreshText}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.new} onPress={() => navigation.navigate('Create New Case')}>
                    <Text style={styles.newText}>+</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.year}>{year}</Text>
            </View>
            <View style={styles.weekSelect}>
                <TouchableOpacity style={styles.prev} onPress={() => decWeek()}>
                    <Text style={styles.title}>{'<'} </Text>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', textAlign: 'center'}}>
                    <Text style={styles.title}>{week[0].monthString.slice(0,3)} {week[0].day} - {week[6].monthString.slice(0,3)} {week[6].day}</Text>
                </View>
                <TouchableOpacity style={styles.next} onPress={() => incWeek()}>
                    <Text style={styles.title}> {'>'}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => (navigation.navigate('Daily View', {dayProp: week[0], dayString: 'Sunday', cases: cases}))}>
                <DailyViewCase dayProp={generateDayProp(week[0], 'Sunday')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (navigation.navigate('Daily View', {dayProp: week[1], dayString: 'Monday', cases: cases}))}>
                <DailyViewCase dayProp={generateDayProp(week[1], 'Monday')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (navigation.navigate('Daily View', {dayProp: week[2], dayString: 'Tuesday', cases: cases}))}>
                <DailyViewCase dayProp={generateDayProp(week[2], 'Tuesday')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (navigation.navigate('Daily View', {dayProp: week[3], dayString: 'Wednesday', cases: cases}))}>
                <DailyViewCase dayProp={generateDayProp(week[3], 'Wednesday')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (navigation.navigate('Daily View', {dayProp: week[4], dayString: 'Thursday', cases: cases}))}>
                <DailyViewCase dayProp={generateDayProp(week[4], 'Thursday')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (navigation.navigate('Daily View', {dayProp: week[5], dayString: 'Friday', cases: cases}))}>
                <DailyViewCase dayProp={generateDayProp(week[5], 'Friday')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (navigation.navigate('Daily View', {dayProp: week[6], dayString: 'Saturday', cases: cases}))}>
                <DailyViewCase dayProp={generateDayProp(week[6], 'Saturday')} />
            </TouchableOpacity>
        </ScrollView>
    );
  };

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 40,
    },
    rect5: {
        width: 300,
        height: 39,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 15,
        marginTop: 4,
        marginLeft: 35,
        marginBottom: 16
    },
    row: {
        flexDirection: 'row'
    },
    hidden: {
        display: 'none'
    },
    show:{
        display: 'flex'
    },
    hide: {
        display: 'none'
    },
    year: {
        fontSize: 30,
        marginLeft: 155,
        color: "#909190",
    },
    weekSelect: {
        flexDirection: 'row',
        marginLeft: 0,
        marginBottom: 15,
        width: 375,
        textAlign: 'center' 
    },
    title: {
        fontSize: 23,
        marginTop: 8,
        textAlign: 'center',
    },
    refresh: {
        backgroundColor :"#cbf5cf",
        width: 180,
        height: 45,
        marginLeft: 20,
        borderRadius: 15
    },
    refreshText: {
        color: "#104724",
        fontSize: 35,
        marginLeft: 30
    },
    new: {
        backgroundColor: "#8a8a8a",
        width: 160,
        height: 45,
        marginLeft: 15,
        borderRadius: 15,
        marginBottom: 10
    },
    newText: {
        color: "#fefefe",
        fontSize: 70,
        marginTop: -24,
        marginLeft: 58
    },
    next: {
        backgroundColor: "#cfcfcf",
        width: 90,
        height: 45,
        borderRadius: 15
    },
    prev: {
        backgroundColor: "#cfcfcf",
        marginLeft: 15,
        width: 90,
        height: 45,
        borderRadius: 15
    }
});

export default WeeklyViewPage;
