import React, { useState, useEffect, Fragment } from 'react'

// Importação de alguns dos componentes padrão do react native.
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'

// Importando Biblioteca para uso do mapa
import MapView, { Marker, Callout } from 'react-native-maps'

// Importando biblioteca para uso da localização
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

// Disponibilizado também pelo expo, uma série de icones (os mais utilizados para desenvolvimento web e mobile)
import { MaterialIcons } from '@expo/vector-icons'
import api from '../services/api'

function Home({ navigation }) {

    const [currentRegion, setCurrentRegion] = useState(null)
    const [devs, setDevs] = useState([])
    const [techs, setTechs] = useState("")

    useEffect(() => {
        async function laodInitialPosition() {
            const { granted } = await requestPermissionsAsync()


            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            }
        }


        laodInitialPosition()
    }, [])

    if (!currentRegion) {
        return null
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion
        console.log(techs)

        const response = await api.get("/searchDevs", {
            params: {
                latitude,
                longitude,
                techs
            }
        })
        console.log(response.data)
        setDevs(response.data)
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region)
    }

    return (
        <Fragment>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.mapContainer}>

                {devs.map(dev => (
                    <Marker
                        key={dev._id}
                        coordinate={{
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1]
                        }}>
                        <Image style={styles.mapAvatar} source={{ uri: dev.avatar_url }} />

                        <Callout onPress={() => {
                            navigation.navigate("Profile", { github_username: dev.github_username })
                        }}>
                            <View style={styles.mapAvatarDescription}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(", ")}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.searchDev}>
                <TextInput
                    style={styles.searchDevInput}
                    placeholder="Buscar Devs por techs"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    onChangeText={setTechs} />

                <TouchableOpacity onPress={loadDevs} style={styles.searchDevButton}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>

            </View>
        </Fragment>
    )
}

// Por padrão, a estilização dos componentes em react native são pelo uso do "StyleSheet"
const styles = StyleSheet.create({
    mapContainer: {
        flex: 1
    },
    mapAvatar: {
        width: 54,
        height: 54,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "#FFF"
    },
    mapAvatarDescription: {
        width: 200
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16
    },
    devBio: {
        color: "#667",
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchDev: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchDevInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2
    },
    searchDevButton: {
        width: 50,
        height: 50,
        backgroundColor: "#7D40E7",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15
    }
})

export default Home