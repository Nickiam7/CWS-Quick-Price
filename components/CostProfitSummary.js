import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Vars from '../constants/Variables';
import GlobalStyles from '../constants/GlobalStyles';

const CostProfitSummar = (props) => {
    return (
        <View style={styles.summaryContainer}>
            <View>
                <Text style={GlobalStyles.sectionHeading}>Cost / Profit Summary</Text>
            </View>
            <View style={styles.flexRow}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Cost of Bottle</Text>
                    <Text style={styles.info}>
                        ${props.costOfBottle}
                    </Text>
                </View>
            </View>
            <View style={styles.flexRow}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Landed Cost</Text>
                    <Text style={styles.info}>
                        ${props.landedCost}
                    </Text>
                </View>
            </View>
            <View style={styles.flexRow}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Sell to Distributor</Text>
                    <Text style={styles.info}>
                        ${props.sellToDistributor}
                    </Text>
                </View>
            </View>
            <View style={styles.flexRow}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Distributor Sell to Retail</Text>
                    <Text style={styles.info}>
                        ${props.distributorPrice}
                    </Text>
                </View>
            </View>
            <View style={styles.flexRow}>
                <View style={[styles.infoBox, {borderBottomWidth: 0}]}>
                    <Text style={styles.infoLabel}>Retail Sell to Consumer</Text>
                    <Text style={styles.info}>
                        ${props.retailPrice}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    summaryContainer: {
        marginTop: -145,
        paddingTop: 15,
        backgroundColor: '#ffffff',
        borderRadius: Vars.borderRadius,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 0.3,
    },      
    infoBox: {
        height: 50,        
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderBottomWidth: Vars.borderWidth,
        borderBottomColor: '#f5f5f5',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
    },
    info: {        
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: Vars.primaryRed,
    }
});

export default CostProfitSummar;