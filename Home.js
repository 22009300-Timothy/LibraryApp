import React, {useState} from 'react';
import { Text, View, Button, Image, SectionList, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {datasource} from "./Data.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
        borderWidth: 1,
    },
    headerText: {
        fontSize: 18,
        marginLeft: 10,
    },
    opacityStyle: {
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: '#f0f8ff',
        borderWidth: 1,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    imageStyle: {
        width: 200,
        height: 300,
        marginLeft: 10,
        borderRadius: 10,
    },
});

const Home = ({navigation}) => {

    const [mydata, setMydata] = useState([]);

    const getData = async() => {
        let datastr = await AsyncStorage.getItem("bookdata");
        if(datastr!=null) {
            jsondata = JSON.parse(datastr);
            setMydata(jsondata);
        }
        else {
            setMydata(datasource);
        }
    }

    getData();

    const renderItem = ({item, index}) => {

        //let imageLink = "https://m.media-amazon.com/images/I/" + item.url + ".jpg"

        return (
            <TouchableOpacity style = {styles.opacityStyle} onPress={() =>{
                let datastr = JSON.stringify(mydata);
                navigation.navigate("Edit", {datastring: datastr, index: index, title: item.title, isbn: item.isbn, url: item.url, copies: item.copies})
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style = {{ flexDirection: 'column', alignItems: 'left', justifyContent: 'center'}}>
                    <Text style={styles.textStyle}>{item.title}</Text>
                    <Text>ISBN: {item.isbn}</Text>
                    <Text>Copies Owned: {item.copies}</Text>
                </View>
                    {/*<Image source = {{uri:item.url}} style={styles.imageStyle}/>*/}
                    <Image source={{ uri: item.url }} style={{ width: 100, height: 150, borderRadius: 8 }} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex: 1, margin: 10, paddingTop: 50}}>
            <View style={{borderWidth:1}}>
                <View style={{padding:20}}>
                    <Button title='New Book' onPress={() => {
                        let datastr = JSON.stringify(mydata);
                        navigation.navigate("Add", {datastring: datastr});
                    }}/>
                </View>
            </View>
            <View style={{paddingTop: 10, paddingBottom: 110}}>
                <StatusBar hidden={true}/>
                <SectionList
                    sections={mydata}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

export default Home;
