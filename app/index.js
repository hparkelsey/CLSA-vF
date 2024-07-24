import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text, Image, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import {Stack, useRouter } from 'expo-router';
import { images } from '../assets'


const Home = () => {
    const [text, setText] = useState('');
    const [keyword, setKeyword] = useState('');

    const handleAnalysis = () => {
 
    }
    
    return (
        <SafeAreaView style ={{ flex: 1, 
        }}>
            <Stack.Screen
                options={{ 
                    headerStyle: { backgroundColor: '#FFFFFF', },
                    headerShadowVisible: false, 
                    headerLeft: () => (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: -750,
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <Image source={images.logo} style={{ aspectRatio: 1, flex:1}} resizeMode='contain'/>
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
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Pos: </Text>
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Neu: </Text>
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Neg: </Text>
                            <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Compounded: </Text>
                        </View>
                    </View>
                    {/* <View
                        style={{
                            padding: 10, 
                            //width: '100%', 
                            margin: 20, 
                            marginTop: 40, 
                            //backgroundColor: '#385494'
                        }} 
                    >
                        <Text style={{ color: "#ffffff", fontSize: 36, fontWeight: 'bold',}}>Results: </Text>
                        <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Pos: </Text>
                        <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Neu: </Text>
                        <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Neg: </Text>
                        <Text style={{ color: "#ffffff", fontSize: 26, margin: 20}}>Compounded: </Text>
                    </View> */}
                </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#385494",
        alignItems:'center', //center horizontally,
        justifyContent: 'center'
    },
    container2: {
        flexDirection:'row',
        flex:1,
        padding:100,

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