
import React, { Component } from 'react';

import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    FlatList
} from 'react-native';

import BaseDialog from './BaseDialog';

export default class AlertDialog extends BaseDialog {

    static defaultProps = {
        messageText: 'Alert Message',
        negativeText: 'cancel',
        positiveText: 'ok',
        onPress: null
    }

    constructor(props) {
        super(props);
    }

    _getContentPosition() {
        return { justifyContent: 'center', alignItems: 'center' }
    }

    renderContent() {
        return <View style={{
            height: this.getSize(150), width: this.getSize(307),
            backgroundColor: '#ffffff', borderRadius: this.getSize(6)
        }}>
            <View style={{
                width: this.getSize(307), flex: 1, paddingLeft: this.getSize(15), paddingRight: this.getSize(15),
                justifyContent: 'center', alignItems: 'center'
            }}>
                <Text style={{ fontSize: this.getSize(14), fontWeight: '100', color: '#444444', lineHeight: this.getSize(20), textAlign: 'center' }}>{this.props.messageText}</Text>
            </View>
            <View style={{ width: this.getSize(307), height: 0.5, backgroundColor: '#e6e6e6' }} />
            <View style={{
                height: this.getSize(45),
                width: this.getSize(307),
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => {
                            if (this.props.onPress) {
                                this.props.onPress(true);
                            }
                        });
                    }}
                    style={{
                        flex: 1, height: this.getSize(45),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                    <Text style={{ color: this.mHeaderColor, fontSize: this.getSize(16) }}>{this.props.positiveText}</Text>
                </TouchableOpacity>
                <View style={{
                    height: this.getSize(28), width: this.mOnePixel, backgroundColor: '#e6e6e6'
                }} />
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => {
                            if (this.props.onPress) {
                                this.props.onPress(false);
                            }
                        });
                    }}
                    style={{
                        flex: 1, height: this.getSize(45),
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                    <Text style={{ color: '#979797', fontSize: this.getSize(16) }}>{this.props.negativeText}</Text>
                </TouchableOpacity>
            </View>
        </View >
    }

}
