import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const PriceInput = (props) => {
    return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
    input: {
        borderColor: '#e3e3e3',
        borderWidth: 1,        
        padding: 10,
        borderTopEndRadius: 3,
        borderBottomEndRadius: 3,
    } 
});

export default PriceInput;