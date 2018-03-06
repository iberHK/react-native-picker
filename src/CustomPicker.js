
import React, { Component } from 'react';

import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Platform,
    Dimensions,
    PixelRatio
} from 'react-native';

import BaseDialog from './view/BaseDialog';

import PickerView from './view/PickerView';

export default class CustomPicker extends BaseDialog {

    static defaultProps = {
        list: ['item0', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9'],
        list1: ['item10', 'item11', 'item12', 'item13', 'item14', 'item15', 'item16', 'item17', 'item18', 'item19']
    }

    constructor(props) {
        super(props);
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    renderContent() {
        return <View style={{
            width: this.mScreenWidth, flexDirection: 'row'
        }}>
            <PickerView
                list={this.props.list}
                onPickerSelected={(toValue) => {
                    // console.warn(toValue)
                }}
                selectedIndex={0}
                fontSize={this.getSize(14)}
                itemWidth={this.mScreenWidth / 2}
                itemHeight={this.getSize(40)} />
            <PickerView
                list={this.props.list1}
                onPickerSelected={(toValue) => {
                    // console.warn(toValue)
                }}
                selectedIndex={0}
                fontSize={this.getSize(14)}
                itemWidth={this.mScreenWidth / 2}
                itemHeight={this.getSize(40)} />
        </View>
    }

}
