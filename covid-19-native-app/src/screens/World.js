import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, FlatList, StatusBar, ScrollView } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob';

const CountryListComponent = (props) => {

    return (
        <>
            {props.item.id !== 0 && (

                <View style={{ marginTop: 20, paddingTop: 20, borderTopWidth: 0.8, borderTopColor: 'grey', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '100%', fontFamily: 'Ubuntu-Bold', paddingLeft: 10, fontSize: 16 }}>{props.item.id}. {props.item.Country}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, padding: 3 }}>
                        <Text style={{ width: '47%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Total Case - {props.item.TotalCase}</Text>
                        <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>New Case - {props.item.NewCases}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 5, padding: 3 }}>
                        <Text style={{ width: '47%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Total Death - {props.item.TotalDeath}</Text>
                        <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>New Death - {props.item.NewDeath}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 5, padding: 3 }}>
                        <Text style={{ width: '47%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Total Recover - {props.item.Total_Recover}</Text>
                        <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Active Cases - {props.item.Active_Cases}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 5, padding: 3 }}>
                        <Text style={{ width: '47%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Serious Critical - {props.item.Serious_Critical}</Text>
                        <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Total Test - {props.item.Total_Test}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 5, padding: 3 }}>
                        <Text style={{ width: '47%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Tot Cases/1M pop - {props.item.Tot_Cases}</Text>
                        <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Deaths/1M pop - {props.item.Death_1M_pop}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 5, padding: 3 }}>
                        <Text style={{ width: '55%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Test Cases/1M pop - {props.item.Test_1M_pop}</Text>
                    </View>
                </View>
            )}
        </>
    )
}

function World() {
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);
    const [world, setWorld] = useState({});

    useEffect(() => {
        StatusBar.setBackgroundColor('#ffde03');
        getWorldCoronaList();
    }, []);

    const onRefresh = () => {
        getWorldCoronaList();
    }

    const getWorldCoronaList = async () => {
        setIsLoading(true);
        const data = await axios.get('https://qvm7em9344.execute-api.ap-south-1.amazonaws.com/dev');
        const response = data.data.data;
        setList(response);
        setWorld(response[0]);
        setIsLoading(false);
    }


    return (
        <View style={{ flex: 1 }}>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 22, fontFamily: 'Ubuntu-Bold', backgroundColor: '#ffde03', padding: 5 }}>World Covid-19 Cases</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ width: '60%', borderColor: 'black', borderWidth: 1, marginTop: 15, marginBottom: 5, padding: 5, borderRadius: 100, alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold' }}>Coronavirus Cases</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Regular' }}>{world.TotalCase}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '44%', borderColor: 'black', borderWidth: 1, backgroundColor: '#ff8080', margin: 5, padding: 5, borderRadius: 100, alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold' }}>Deaths</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Regular' }}>{world.TotalDeath}</Text>
                </View>
                <View style={{ width: '50%', borderColor: 'black', borderWidth: 1, backgroundColor: '#66ff66', margin: 5, padding: 5, borderRadius: 100, alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold' }}>Recovered</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Regular' }}>{world.Total_Recover}</Text>
                </View>
            </View>
            <AdMobBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-2618837311759558/5481841796"
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}
            />
            <FlatList
                data={list}
                style={{ fontFamily: 'Ubuntu-Regular' }}
                renderItem={({ item }) => <CountryListComponent item={item} />}
                keyExtractor={(item) => item.id}
                refreshing={isLoading}
                onRefresh={onRefresh}
            />
        </View>
    );
}

export default World;
