import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Vars from '../constants/Variables';

const Header = (props) => {
    return (

        <View style={styles.header}>
            <LinearGradient
                colors={['#ab4b58', '#ff6b7f', '#ab4b58']}
                start={[0.1, 0.2]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
            />
            <Image 
                source={require('../assets/cws_logo_white.png')}
                style={styles.logo} 
            />
            <Text style={styles.heading}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 45,        
        width: '100%',
        height: 250,
        backgroundColor: Vars.primaryRed,
        borderBottomWidth: Vars.borderWidth,
        borderBottomColor: Vars.layoutBorder,        
    },
    heading: {
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'jo-sans-bold',
        marginTop: 5,
    },
    logo: {
        width: 58,
        height: 50,
    }
});

export default Header;