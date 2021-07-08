import React from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob';

function IndiaState(props) {

    // Display an interstitial
    AdMobInterstitial.setAdUnitID('ca-app-pub-2618837311759558/8564328374');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

    return (

        <View style={{ flex: 1 }}>
            <View>
                <Text style={{ textAlign: 'center', fontSize: 22, fontFamily: 'Ubuntu-Bold', backgroundColor: '#ffde03' }}>INDIA COVID-19 TRACKER</Text>
            </View>
            <View>
                <TouchableHighlight onPress={() => props.setHomeScreen()}>
                    <>

                        <Text style={{ backgroundColor: '#ffde03', fontFamily: 'Ubuntu-Bold', paddingLeft: 10, paddingBottom: 8 }}>
                            <Image source={require('../assets/img/left-arrow.png')} style={{ height: 20, width: 20 }} /> &nbsp;
                    Back State Wise Count
                        </Text>
                    </>
                </TouchableHighlight>
            </View>
            
            <ScrollView>
                <View>
                    {console.log(Object.keys(props.cityList.districtData).length)}
                    {
                        Object.keys(props.cityList.districtData).map((key, index) => {
                            return (
                                <CityListComponent item={{ city: key, ...props.cityList.districtData[key] }} index={index + 1} />
                            )
                        }
                        )
                    }
                </View>
            </ScrollView>

        </View>
    );
}

const CityListComponent = (props) => {
    return (
        <View style={{ marginTop: 20, paddingTop: 20, borderTopWidth: 0.8, borderTopColor: 'grey', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '100%', fontFamily: 'Ubuntu-Bold', paddingLeft: 10, fontSize: 16 }}>{props.index}. {props.item.city}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10, padding: 3 }}>
                <Text style={{ width: '47%', fontFamily: 'Ubuntu-Bold', textAlign: 'center', borderRadius: 40, borderWidth: 1, borderColor: '#ff073a', color: '#ff073a', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Cases - {props.item.confirmed}</Text>
                <Text style={{ width: '49%', marginLeft: 5, fontFamily: 'Ubuntu-Bold', textAlign: 'center', borderWidth: 1, borderRadius: 40, borderColor: '#6c757d', color: '#6c757d', padding: 5, paddingTop: 8, paddingBottom: 8 }}>Death - {props.item.delta.confirmed}</Text>
            </View>
        </View>
    )
}

export default IndiaState;
