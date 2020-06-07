import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TouchableWithoutFeedback, 
    Keyboard, 
    KeyboardAvoidingView, 
} from 'react-native';

import CostProfitSummary from '../components/CostProfitSummary';
import PriceInput from '../components/Input';

import Vars from '../constants/Variables';
import GlobalStyles from '../constants/GlobalStyles';

const MainScreen = () => {
    const [costOfBottle, setCostOfBottle] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [cwsMargin, setCwsMargin] = useState('');
    const [distributorMargin, setDistributorMargin] = useState('');
    const [retailMargin, setRetailMargin] = useState('');
    const [sga, setSGA] = useState('');
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

    const costOfBottleHandler = inputText => {
        setCostOfBottle(inputText);
    };

    const exchangeRateHandler = inputText => {
        setExchangeRate(inputText);
    };

    const cwsMarginHandler = inputText => {
        setCwsMargin(inputText);
    };

    const distributorMarginHandler = inputText => {
        setDistributorMargin(inputText);
    };

    const retailMarginHandler = inputText => {
        setRetailMargin(inputText);
    };

    const sgaHandler = inputText => {
        setSGA(inputText);
    };

    const calculateBottleCost = () => {
        return (safeParseFloat(costOfBottle) * safeParseFloat(exchangeRate)).toFixed(2);
    };

    const calculateLandedCost = () => {
        const sgaFloat = safeParseFloat(sga);        
        const bottleCostFloat = safeParseFloat(calculateBottleCost());
        const landedCost = (bottleCostFloat + sgaFloat).toFixed(2);        
        return landedCost; 
    };

    const calculateSellToDistributor = () => {
        const cwsMarginFloat = safeParseFloat(cwsMargin);
        return (calculateLandedCost() / (1 - cwsMarginFloat)).toFixed(2);
    };

    const calculateDistributorSellToRetailer = () => {
        const distributorMarginFloat = safeParseFloat(distributorMargin);
        return (calculateSellToDistributor() / (1 - distributorMarginFloat)).toFixed(2);
    };

    const calculateRetailSellToConsumer = () => {
        const retailMarginFloat = safeParseFloat(retailMargin);
        return (calculateDistributorSellToRetailer() / (1 - retailMarginFloat)).toFixed(2);
    };

    const fetchFxRateHandler = () => {
        fetchFxRate();
    };

    const fetchFxRate = async () => {
        const response = await fetch('https://api.exchangeratesapi.io/latest?symbols=USD');
        response.json()
        .then(response => setExchangeRate(response.rates.USD))
        .catch(err => console.log(err));      
    };
     
    useEffect(() => {
        fetchFxRate();        
    }, []);
    
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    });

    const _keyboardDidShow = () => {
        setKeyboardIsVisible(true);
    };

    const _keyboardDidHide = () => {
        setKeyboardIsVisible(false);
        Keyboard.dismiss();
    };

    const safeParseFloat = (number) => {
        const floatVlaue = parseFloat(number);
        return isNaN(floatVlaue) ? 0 : floatVlaue;    
    }

    const clearAllFieldsHandler = () => {
        setCostOfBottle('');
        setCwsMargin('');
        setDistributorMargin('');
        setRetailMargin('');
        setSGA('');
        fetchFxRateHandler();
    };

    let clearFields;
    if((costOfBottle || cwsMargin || distributorMargin || retailMargin || sga)) {
        clearFields = (
            <TouchableOpacity 
                onPress={clearAllFieldsHandler}
                style={styles.clearAllButton}
            >
                <Text style={styles.clearAllText}>Clear Fields</Text>
            </TouchableOpacity>
        )
    }

    let done;
    if(keyboardIsVisible) {
        done = (
            <TouchableOpacity 
                style={styles.doneButtonContainer}
                onPress={_keyboardDidHide}
            >                
                <Text style={styles.doneButtonText}>
                    Done
                </Text>
            </TouchableOpacity> 
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => _keyboardDidHide}>
        <View style={styles.screen}>
            <CostProfitSummary 
                costOfBottle={calculateBottleCost()}
                landedCost={calculateLandedCost()}
                sellToDistributor={calculateSellToDistributor()}
                distributorPrice={calculateDistributorSellToRetailer()}
                retailPrice={calculateRetailSellToConsumer()}
            />
            <KeyboardAvoidingView
                behavior='position'                
                style={[keyboardIsVisible ? styles.inputActive : null, {flex: 1}]}
            >
                <View style={styles.variablesContainer}>
                    <View style={styles.flexRow}>
                        <Text style={GlobalStyles.sectionHeading}>Price Variables</Text>                    
                        {clearFields}                    
                    </View>
                    <View style={styles.flexRow}>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputHelper}>
                                <Text style={styles.inputHelperFont}>&euro;</Text>
                            </View>
                            <PriceInput 
                                style={styles.input}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                clearButtonMode='while-editing'
                                clearButtonMode='while-editing'
                                placeholder='Cost of Bottle'
                                onChangeText={costOfBottleHandler}
                                value={costOfBottle}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <TouchableWithoutFeedback onPress={fetchFxRateHandler}>
                                <View style={styles.inputHelper}>
                                    <Text style={styles.inputHelperFont}>FX</Text>
                                </View>
                            </TouchableWithoutFeedback>                    
                            <PriceInput 
                                style={styles.input}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                clearButtonMode='while-editing'
                                clearButtonMode='while-editing'
                                placeholder='Exchange Rate'
                                onChangeText={exchangeRateHandler}
                                value={exchangeRate.toString()}
                            />                                                    
                        </View>
                    </View>
                    <View style={styles.flexRow}>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputHelper}>
                                <Text style={styles.inputHelperFont}>%</Text>
                            </View>
                            <PriceInput 
                                style={styles.input}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                clearButtonMode='while-editing'
                                placeholder='CWS Margin'
                                onChangeText={cwsMarginHandler}
                                value={cwsMargin}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputHelper}>
                                <Text style={styles.inputHelperFont}>%</Text>
                            </View>
                            <PriceInput 
                                style={styles.input}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                clearButtonMode='while-editing'
                                placeholder='Dist Margin'
                                onChangeText={distributorMarginHandler}
                                value={distributorMargin}
                            />
                        </View>                
                    </View> 
                    <View style={styles.flexRow}>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputHelper}>
                                <Text style={styles.inputHelperFont}>%</Text>
                            </View>
                            <PriceInput 
                                style={styles.input}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                clearButtonMode='while-editing'
                                placeholder='Retailer Margin'
                                onChangeText={retailMarginHandler}
                                value={retailMargin}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <View style={styles.inputHelper}>
                                <Text style={styles.inputHelperFont}>$</Text>
                            </View>
                            <PriceInput 
                                style={styles.input}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                clearButtonMode='while-editing'
                                placeholder='SG & A'
                                onChangeText={sgaHandler}
                                value={sga}
                            />
                        </View>                
                    </View>
                {done}             
                </View>
            </KeyboardAvoidingView>
        </View>
        </TouchableWithoutFeedback>        
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,        
        paddingVertical: 25,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff'
    },
    inputActive: {        
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -10 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        marginTop: -143,
    },
    variablesContainer: {
        paddingTop: 15,
        backgroundColor: '#ffffff',
    },
    inputGroup: {
        flex: 1,
        flexDirection: 'row',        
        paddingHorizontal: 15,                
    },
    input: {
        flex: 1,
        marginVertical: 10,
        marginLeft: 10,
    },
    inputHelper: {
        marginVertical: 10, 
        marginRight: -10, 
        backgroundColor: 'red', 
        width: 35, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: Vars.secondaryBackground,
        borderColor: Vars.inputBorder,
        borderLeftWidth: Vars.borderWidth,
        borderTopWidth: Vars.borderWidth, 
        borderBottomWidth: Vars.borderWidth,
        borderTopStartRadius: Vars.borderRadius,
        borderBottomStartRadius: Vars.borderRadius,
    },
    inputHelperFont: {
        fontSize: 18,
    },  
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',       
    },
    clearAllButton: {
        paddingVertical: 3,
        paddingHorizontal: 5,
        marginRight: 15,
        borderRadius: Vars.borderRadius,
        backgroundColor: Vars.layoutBorder,
        borderWidth: Vars.borderWidth,
        borderColor: Vars.inputBorder,      
    },
    clearAllText: {
        fontWeight: '500', 
        fontSize: 12,       
    },
    doneButtonContainer: {
        flexDirection: 'row',
        paddingVertical: 7, 
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: Vars.primaryRed,
        width: '50%',
        borderRadius: Vars.borderRadius,
    },
    doneButtonText: {
        fontWeight: '700', 
        fontSize: 14, 
        color: '#ffffff'
    }
});

export default MainScreen;