import React, {useState} from 'react';
import {TextInput, View, Text, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation, route}) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [url, setUrl] = useState('');
    const [copies, setCopies] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem("bookdata", value)
        navigation.navigate("Home");
    }

    return (
        <View style={{ padding: 10, paddingTop: 40 }}>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Title:</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>ISBN:</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    onChangeText={(text) => setIsbn(text)}
                    value={isbn}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Image URL:</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    onChangeText={(text) => setUrl(text)}
                    value={url}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Copies Owned:</Text>
                <TextInput
                    style={{ borderWidth: 1, height: 40, paddingHorizontal: 5 }}
                    onChangeText={(text) => setCopies(text)}
                    value={copies}
                />
            </View>

            <View style={{ padding: 10, marginTop: 10 }}>
            <Button title="ADD"
                    onPress={() => {
                        let mydata = JSON.parse(route.params.datastring);


                        if (!title || !isbn || !copies || !url) {
                            alert("Please fill in all the fields.");
                            return;
                        }
                        let item = {
                            title: title,
                            isbn: parseInt(isbn, 10),
                            copies: parseInt(copies, 10),
                            url: url,
                        };

                        mydata[0].data.push(item);
                        let stringdata = JSON.stringify(mydata);
                        setData(stringdata);
                    }}
            />
                </View>
        </View>
    );
};

export default Add;
