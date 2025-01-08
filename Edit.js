import React, { useState } from 'react';
import { TextInput, View, Text, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
    let mydata = JSON.parse(route.params.datastring);
    let myindex = route.params.index;

    const [title, setTitle] = useState(route.params.title);
    const [isbn, setIsbn] = useState(route.params.isbn.toString());
    const [url, setUrl] = useState(route.params.url);
    const [copies, setCopies] = useState(route.params.copies.toString());

    const setData = async(value) => {
        AsyncStorage.setItem("bookdata", value)
        navigation.navigate("Home");
    }

    return (
        <View style={{ padding: 10, paddingTop: 40}}>
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

            <View style={{ flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="SAVE"
                        onPress={() => {
                            if (!title || !isbn || !copies || !url) {
                                alert("Please fill in all fields.");
                                return;
                            }
                            mydata[0].data[myindex] = {
                                title: title,
                                isbn: parseInt(isbn, 10),
                                copies: parseInt(copies, 10),
                                url: url,
                            };
                            let stringdata = JSON.stringify(mydata);
                            setData(stringdata);
                        }
                        }
                    />
                </View>

                <View style={{ flex: 1, margin: 10 }}>
                    <Button
                        title="DELETE"
                        onPress={() => {
                            const bookIndex = route.params.index;
                            Alert.alert(
                                "Are you sure?",
                                '',
                                [
                                    {
                                        text: 'Yes', onPress: () => {
                                            mydata[0].data.splice(bookIndex,1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);
                                        }
                                    },
                                    { text: 'No' }
                                ]
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default Edit;
