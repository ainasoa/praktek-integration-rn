import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Person from './Person';



const SwipePage = () => {
    const users = useState([
        {
            id: 1,
            image: require('../assets/photo-1.png'),
            name: 'Jessica Parker',
            job: 'Professional model',
            age: 24,
        },
        {
            id: 2,
            image: require('../assets/photo-2.png'),
            name: 'Camila Snow',
            job: 'Marketer',
            age: 27,
        },
        {
            id: 3,
            image: require('../assets/photo-3.png'),
            name: 'Christien',
            job: 'Professional model',
            age: 20,
        },
        {
            id: 4,
            image: require('../assets/photo-4.png'),
            name: 'Fabrice',
            job: 'Professional model',
            age: 21,
        },
        {
            id: 5,
            image: require('../assets/photo-5.png'),
            name: 'Bred Jackson',
            job: 'Photograph',
            age: 25,
        },
    ])[0]

    const renderUserItem = (item, index) => <Person key={index} {...item} />

    return (
        <View style={styles.container}>
            {users.reverse().map(renderUserItem)}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

})

export default SwipePage;
