import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import IndiaState from './IndiaState';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'

function India() {
    const [IsState, setIsState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [stateList, setStateList] = useState([]);
    const [totalList, setTotalList] = useState({});
    const [statewiseList, setStatewiseList] = useState([]);
    const [particularState, setParticularState] = useState([]);
    useEffect(() => {
        getStateData();
        getStateWiseData();
    }, []);

    const getStateData = async () => {
        setIsLoading(true);
        const response = await axios.get('https://api.covid19india.org/data.json');
        const result = response.data;
        setStateList(result.statewise);
        setTotalList(result.statewise[0]);
        setIsLoading(false);
    }

    const getStateWiseData = async () => {
        const response = await axios.get('https://api.covid19india.org/state_district_wise.json');
        const result = response.data;
        setStatewiseList(result);
    }

    const onRefresh = () => {
        getStateData();
    }

    const onPress = (item) => {
        Object.keys(statewiseList).forEach(function (key) {
            if (key.toLowerCase() === item.state.toLowerCase()) {
                var val = statewiseList[key];
                setParticularState(val);
                setIsState(true)
            }
        });
    }

    setTimeout(() => {
        // Display an interstitial
        AdMobInterstitial.setAdUnitID('ca-app-pub-2618837311759558/8564328374');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }, 4000);


    return (
        <>
            {!IsState ? (
                <View style={{ flex: 1 }}>
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 22, fontFamily: 'Ubuntu-Bold', backgroundColor: '#ffde03' }}>INDIA COVID-19 TRACKER</Text>
                        <Text style={{ backgroundColor: '#ffde03', textAlign: 'center', fontFamily: 'Ubuntu-Regular', padding: 3 }}>Last Update - {totalList.lastupdatedtime}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '44%', borderColor: '#ff073a', borderWidth: 1, margin: 5, padding: 5, borderRadius: 100, alignItems: 'center' }} >
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#ff073a' }}>CONFIRMED</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Ubuntu-Regular', color: '#ff073a' }}>[+{totalList.deltaconfirmed}]</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#ff073a' }}>{totalList.confirmed}</Text>
                        </View>
                        <View style={{ width: '50%', borderColor: '#007bff', borderWidth: 1, margin: 5, padding: 5, borderRadius: 100, alignItems: 'center' }} >
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#007bff' }}>ACTIVE</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#007bff' }}>{totalList.active}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '44%', borderColor: '#28a745', borderWidth: 1, margin: 5, padding: 5, borderRadius: 100, alignItems: 'center' }} >
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#28a745' }}>RECOVERED</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Ubuntu-Regular', color: '#28a745' }}>[+{totalList.deltarecovered}]</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#28a745' }}>{totalList.recovered}</Text>
                        </View>
                        <View style={{ width: '50%', borderColor: '#6c757d', borderWidth: 1, margin: 5, padding: 5, borderRadius: 100, alignItems: 'center' }} >
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#6c757d' }}>DEATHS</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Ubuntu-Regular', color: '#6c757d' }}>[+{totalList.deltadeaths}]</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'Ubuntu-Bold', color: '#6c757d' }}>{totalList.deaths}</Text>
                        </View>
                    </View>
                    <FlatList
                        data={stateList}
                        style={{ fontFamily: 'Ubuntu-Regular' }}
                        renderItem={({ item, index }) => <StateListComponent item={item} index={index} onPress={onPress} />}
                        keyExtractor={(item) => item}
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                    />
                </View>
            ) : (
                    <IndiaState
                        cityList={particularState}
                        setHomeScreen={() => setIsState(false)}
                    />
                )}
        </>
    );
}

const StateListComponent = (props) => {

    return (
        <>
            {props.item.statecode !== 'TT' && (
                <TouchableWithoutFeedback onPress={() => props.onPress(props.item)}>
                    <View style={{ marginTop: 20, paddingTop: 20, borderTopWidth: 0.8, borderTopColor: 'grey', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '100%', fontFamily: 'Ubuntu-Bold', paddingLeft: 10, fontSize: 16 }}>{props.index}. {props.item.state} ({props.item.statecode})</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: '100%', paddingLeft: 28, fontFamily: 'Ubuntu-Regular', fontSize: 12 }}>Last Update - {props.item.lastupdatedtime}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, padding: 3 }}>
                            <Text style={{ width: '47%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Confirmed - {props.item.confirmed}</Text>
                            <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Active - {props.item.active}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 5, padding: 3 }}>
                            <Text style={{ width: '47%', fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Recovered - {props.item.recovered}</Text>
                            <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Regular', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: 'grey', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Death - {props.item.deaths}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    )
}


export default India;
