import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FullCaseData from '../components/FullCaseData/FullCaseData';
import { useRoute } from "@react-navigation/native"

const CasePage = ({ caseProp, navigation }) => {
    const route = useRoute();
    const myCase = route.params?.caseProp;
    const [surgdate, setSurgdate] = useState(new Date());
    const [surgDateText, setSDT] = useState('Select Date...');
    const [sdChanged, setSDChanged] = useState(0);
    const [sdStyle, setSdstyle] = useState(styles.collapsed);
    const [surgtime, setSurgtime] = useState('');
    const [proctype, setProctype] = useState('');
    const [sets, setSets] = useState('');
    const [pt, setPt] = useState('');
    const [dr, setDr] = useState('');
    const [hospital, setHospital] = useState('');
    const [orderdate, setOrderdate] = useState(new Date());
    const [orderDateText, setODT] = useState('Select Date...');
    const [odChanged, setODChanged] = useState(0);
    const [odStyle, setOdstyle] = useState(styles.collapsed);
    const [rcvdate, setRcvdate] = useState(new Date());
    const [rcvDateText, setRDT] = useState('Select Date...');
    const [rdChanged, setRDChanged] = useState(0);
    const [rcvdStyle, setRcvdstyle] = useState(styles.collapsed);
    const [rtrnbydate, setRtrnbydate] = useState(new Date());
    const [rtrnbydateText, setRBDT] = useState('Select Date...');
    const [rbdChanged, setRBDChanged] = useState(0);
    const [rbdStyle, setRbdstyle] = useState(styles.collapsed);
    const [shipoutdate, setShipoutdate] = useState(new Date());
    const [shipoutdateText, setSODT] = useState('Select Date...');
    const [sodChanged, setSODChanged] = useState(0);
    const [sodStyle, setSodstyle] = useState(styles.collapsed);
    const [notes, setNotes] = useState('');

    async function monthToString(monthInt) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthInt];
    }

    async function createCase () {
        if (sdChanged == 0) {
            console.error('You Must Select a Surgery Date!');
            return;
        }
        let od = 'null';
        let rbd = 'null';
        let rd = 'null';
        let sod = 'null';

        if (odChanged == 1) {
            od = orderdate;
        }
        if (rdChanged == 1) {
            rd = rcvdate;
        }
        if (rbdChanged == 1) {
            rbd = rtrnbydate;
        }
        if (sodChanged == 1) {
            sod = shipoutdate;
        }
        const caseData = {
            surgDate: new Date(surgdate).getDate(),
            surgTime: surgtime,
            surgMonth: await monthToString(new Date(surgdate).getMonth()),
            surgYear: new Date(surgdate).getFullYear(),
            surgStatus: 'Not Ordered',
            procType: proctype,
            setsNeeded: sets,
            ptInit: pt,
            dr: dr,
            hosp: hospital,
            orderDate: od,
            rcvDate: rd,
            rtrnByDate: rbd,
            rtrnDate: sod,
            notes: notes
        }
        const headers = {
            'method': 'POST',
            'headers': {
                'content-type': 'application/json'
            },
            'body': JSON.stringify(caseData)
        }
        const response = await fetch('https://e6b80fb8-7d8e-4c21-a8d1-7a5368d27fcd-00-2ty982vc8hd6g.spock.replit.dev/addCase', headers)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    console.error('Data Not Saved')
                } else if (response.ok) {
                    console.log('Data Saved')
                    navigation.goBack();
                }
            })
        return response;
    }

    return (
        <ScrollView style={styles.container}>
            {/*<FullCaseData/>*/}
            <View style={sdStyle}>
                <TouchableOpacity onPress={(() => {setSdstyle(styles.collapsed)})}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode="single"
                    date={surgdate}
                    onChange={(params) => {
                        setSDChanged(1);
                        setSurgdate(params.date);
                        setSDT(String(params.date));
                    }}
                />
            </View>
            <Text style={styles.title}>Surgery Date:</Text>
            <TouchableOpacity style={styles.textBox} onPress={() => {setSdstyle(styles.calendar)}}>
                <Text style={styles.textInput}>{String(surgDateText).slice(0,16)}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Surgery Time:</Text>
            <View style={styles.textBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(params) => setSurgtime(params)}
                    placeholder='i.e. 07:00'
                    value={surgtime}
                />
            </View>
            <Text style={styles.title}>Procedure Type:</Text>
            <View style={styles.textBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(params) => setProctype(params)}
                    placeholder='i.e. ACDF'
                    value={proctype}
                />
            </View>
            <Text style={styles.title}>Sets:</Text>
            <View style={styles.bigTextBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(params) => setSets(params)}
                    placeholder='...'
                    value={sets}
                    multiline
                    nu
                />
            </View>
            <Text style={styles.title}>Patient Initials:</Text>
            <View style={styles.textBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(params) => setPt(params)}
                    placeholder='i.e. ABC'
                    value={pt}
                />
            </View>
            <Text style={styles.title}>Physician:</Text>
            <View style={styles.textBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(params) => setDr(params)}
                    placeholder='i.e. Dr. Smith'
                    value={dr}
                />
            </View>
            <Text style={styles.title}>Hospital/Surgery Center:</Text>
            <View style={styles.textBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(params) => setHospital(params)}
                    placeholder='i.e. Portland Prov...'
                    value={hospital}
                />
            </View>
            <View style={odStyle}>
                <TouchableOpacity onPress={(() => {setOdstyle(styles.collapsed)})}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode="single"
                    date={orderdate}
                    onChange={(params) => {
                        setODChanged(1);
                        setOrderdate(params.date);
                        setODT(String(params.date));
                    }}
                />
            </View>
            <Text style={styles.title}>Order Date:</Text>
            <TouchableOpacity style={styles.textBox} onPress={() => {setOdstyle(styles.calendar)}}>
                <Text style={styles.textInput}>{String(orderDateText).slice(0,16)}</Text>
            </TouchableOpacity>
            <View style={rcvdStyle}>
            <TouchableOpacity onPress={(() => {setRcvdstyle(styles.collapsed)})}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode="single"
                    date={rcvdate}
                    onChange={(params) => {
                        setRDChanged(1);
                        setRcvdate(params.date);
                        setRDT(StrinG(params.date));
                    }}
                />
            </View>
            <Text style={styles.title}>Received Date:</Text>
            <TouchableOpacity style={styles.textBox} onPress={() => {setRcvdstyle(styles.calendar)}}>
                <Text style={styles.textInput}>{String(rcvDateText).slice(0,16)}</Text>
            </TouchableOpacity>
            <View style={rbdStyle}>
                <TouchableOpacity onPress={(() => {setRbdstyle(styles.collapsed)})}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode="single"
                    date={rtrnbydate}
                    onChange={(params) => {
                        setRBDChanged(1);
                        setRtrnbydate(params.date);
                        setRBDT(String(params.date));
                    }}
                />
            </View>
            <Text style={styles.title}>Due By Date:</Text>
            <TouchableOpacity style={styles.textBox} onPress={() => {setRbdstyle(styles.calendar)}}>
                <Text style={styles.textInput}>{String(rtrnbydateText).slice(0,16)}</Text>
            </TouchableOpacity>
            <View style={sodStyle}>
                <TouchableOpacity onPress={(() => {setSodstyle(styles.collapsed)})}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode="single"
                    date={shipoutdate}
                    onChange={(params) => {
                        setSODChanged(1);
                        setShipoutdate(params.date);
                        setSODT(String(params.text));
                    }}
                />
            </View>
            <Text style={styles.title}>Ship Out Date:</Text>
            <TouchableOpacity style={styles.textBox} onPress={() => {setSodstyle(styles.calendar)}}>
                <Text style={styles.textInput}>{String(shipoutdateText).slice(0,16)}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Notes:</Text>
            <View style={styles.bigTextBox}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(params) => setNotes(params)}
                    placeholder='...'
                    multiline
                    numberOfLines={10}
                    value={notes}
                />
            </View>
            <TouchableOpacity onPress={(() => createCase())}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.bottom}/>
        </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#39404d',
    },
    title: {
        color: "#ffffff",
        marginLeft: 7,
        marginTop: 15
    },
    textInput: {
        color: "#39404d"
    },
    textBox: {
        width: 375,
        height: 45,
        marginLeft: 7,
        marginTop: 5,
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#e4e7ed'
    },
    bigTextBox: {
        width: 375,
        height: 150,
        marginLeft: 7,
        marginTop: 5,
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#e4e7ed'
    },
    bottom: {
        marginBottom: 350
    },
    button: {
        backgroundColor: '#e4e7ed',
        width: 150,
        height: 50,
        borderRadius: 10,
        marginLeft: 115,
        marginTop: 35
    },
    buttonText: {
        fontSize: 30,
        marginLeft: 42,
        marginTop: 5
    },
    calendar: {
        backgroundColor: "#ffffff",
        marginTop: 15,
    },
    collapsed: {
        display: 'none'
    },
    close: {
        color: "#ffffff",
        backgroundColor: '#39404d',
        textAlign: 'center',
        paddingBottom: 15,
        fontSize: 30
    }
});

export default CasePage;