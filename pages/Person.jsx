import { View, Text, StyleSheet, Image, TouchableOpacity, PanResponder, Animated, } from 'react-native';
import React, { useRef, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useEmotion } from '../App';


const Person = (props) => {
    const [seen, setSeen] = useState(false)
    const setEmotions = useEmotion()[1]

    const rotate = new Animated.Value(0);
    const rotateInterpolation = rotate.interpolate({
        inputRange: [-20, 0, 20,],
        outputRange: ['-20deg', '0deg', '20deg',],
    });

    const handleSeen = (rotateTo) => {
        Animated.timing(rotate, {
            toValue: rotateTo,
            duration: 400,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            setSeen(true)
        }, 450);

        setEmotions(emotion => {
            if (rotateTo < 0) {
                emotion.dislike.push(props)
            } else if (rotateTo > 0) {
                emotion.like.push(props)
            }

            console.log(emotion)

            return emotion
        })

    }

    const handleSwipe = (_, gestureState) => {
        const swipeThreshold = 100;
        const { dx } = gestureState;

        if (dx > swipeThreshold) {
            handleSeen(20)
        } else if (dx < -swipeThreshold) {
            handleSeen(-20)
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderEnd: handleSwipe,
        })
    ).current;

    const handleDislike = () => handleSeen(-20)
    const handleLike = () => handleSeen(20)

    if (!!seen) return null;

    return (
        <View style={[styles.container,]}
            {...panResponder.panHandlers}>
            <Animated.View
                style={[
                    styles.personDetailContainer,
                    {
                        transform: [{ rotate: rotateInterpolation }],
                        transformOrigin: 'bottom',
                    },
                ]}
            >
                <Image source={{ uri: props.image }} style={[styles.img]}
                />
                <View style={[styles.personDetail,]}>
                    <Text style={[styles.textWhite]}>{props.name}, {props.age}</Text>
                    <Text style={[styles.textWhite]}>{props.job}</Text>
                </View>
            </Animated.View>
            <View style={[styles.buttonContainer]}>
                <TouchableOpacity style={[styles.button]} onPress={handleDislike}>
                    <AntDesign name="close" size={24} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.heartBtn]} onPress={handleLike}>
                    <AntDesign name="heart" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]}>
                    <AntDesign name="star" size={24} color="purple" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        position: 'absolute'
    },
    personDetailContainer: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: 20
    },
    personDetail: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#ffffff0f',
        zIndex: 1000,
        width: '100%',
        padding: 10,
    },
    textWhite: {
        color: '#fff',
    },
    img: {
        width: 300,
        height: 420,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    button: {
        elevation: 1,
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
    heartBtn: {
        transform: [{ scale: 1.5 }],
        backgroundColor: 'tomato'
    }
})

export default Person