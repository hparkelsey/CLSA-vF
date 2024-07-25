import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text, Image, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import {Stack, useRouter } from 'expo-router';
import { images } from '../assets'


const Home = () => {
    const [text, setText] = useState('');
    const [keyword, setKeyword] = useState('');
    const [pos, setPos] = useState(0.0);
    const [neg, setNeg] = useState(0.0);
    const [neu, setNeu] = useState(0.0);
    const [comp, setComp] = useState(0.0);
    //state vars^

    const handleAnalysis = () => {
        //hook to python script
    }
    
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{ 
                    headerStyle: { backgroundColor: '#FFFFFF', },
                    headerShadowVisible: false, 
                    headerLeft: () => (
                        <View style={{marginLeft:10}}>
                            <Image source={images.logo} style={{ width: 200, height: 80}} resizeMode='contain'/>
                        </View>
                    ),
                    headerTitle:"",
                }}
            />
                <ScrollView
                    contentContainerStyle={styles.container}
                >
                    <View
                        style={styles.container2}
                    >
                        <TextInput
                          style={styles.textInput}
                          placeholder="Enter text here..."
                          placeholderTextColor="#83829A"
                          value={text}
                          onChangeText={setText}
                          multiline
                        />
                        <View>
                            <TextInput
                            style={styles.keywordInput}
                            placeholder="Enter keyword here..."
                            placeholderTextColor="#83829A"
                            value={keyword}
                            onChangeText={setKeyword}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleAnalysis}
                            >
                                <Text style={{ color: "#385494", fontWeight: "500", }}> Run analysis </Text>
                            </TouchableOpacity>
                            <Text style={{ color: "#ffffff", fontSize: 36, fontWeight: 'bold', margin: 20}}  >Results: </Text>
                            {/*For Zach: display values:*/}
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Pos: {pos}</Text>
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Neu: {neu}</Text>
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Neg: {neg}</Text>
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Comp: {comp}</Text>
                        </View>
                    </View>
                    {/*below text input*/}
                    <View style={{flexDirection:'row'}}>
                        <View style={{textAlign:'left', width: 1000, marginHorizontal: 10}}>
                            <Text style={{ color: "#ffffff", fontSize: 36, fontWeight: 'bold', marginTop: 20, marginBottom:30}}  >Summary: </Text>
                            <View style={{
                                height: 600,
                                borderRadius: 5,
                                marginBottom: 50,
                                padding: 10,
                                width: 1000,
                                textAlignVertical:'top',
                                textAlign: 'left',
                                backgroundColor: "#ccc",
                            }}>
                                <Text style={{ color: "#83829A", fontSize: 16}}  >Summary... </Text>
                            </View>
                        </View>
                        <View style={{width:200, marginHorizontal:10}}>
                            {/*keep empty*/}
                        </View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#385494",
        alignItems:'center', 
        justifyContent: 'center'
    },
    container2: {
        flexDirection:'row',
        paddingTop: 50,
    },
    textInput: {
        height: 600,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: 1000,
        textAlignVertical:'top',
        textAlign: 'left',
        marginHorizontal:10,
        backgroundColor: "#ccc",
    },
    keywordInput: {
        height: 40,
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
        width: 200,
        marginHorizontal:10,    
        backgroundColor: "#ccc",
    },
    button: {
        flexDirection: "row",
        height: 40,
        width: 200,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginHorizontal:10,
        marginVertical: 10
    }
  });


export default Home;