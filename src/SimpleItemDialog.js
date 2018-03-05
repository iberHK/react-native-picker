
import React, { Component } from 'react';

import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    FlatList
} from 'react-native';

import BaseDialog from './BaseDialog';

export default class SimpleItemDialog extends BaseDialog {

    static defaultProps = {
        items: ['a', 'b', 'c'],
        onPress: null,
        cancel: true
    }

    constructor(props) {
        super(props);
    }


    setCancelable(enable) {
        this.cancel = enable;
        return this;
    }

    renderItems() {
        return this.props.items.map((item, index) => {
            return <TouchableOpacity
                onPress={() => {
                    this.dismiss(() => {
                        if (this.props.onPress) {
                            this.props.onPress(index);
                        }
                    });
                }}
                key={this.key ? item[this.key] : item}
                style={{ width: this.mScreenWidth, height: this.getSize(49), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: this.getSize(14), fontWeight: '400', color: '#333333' }}>{this.key ? item[this.key] : item}</Text>
                <View style={{ position: 'absolute', bottom: 0, width: this.mScreenWidth, height: this.mOnePixel, backgroundColor: '#E8EEF0' }} />
            </TouchableOpacity>
        })
    }

    renderCancel() {
        return <TouchableOpacity
            onPress={() => this.dismiss()}
            style={{ width: this.mScreenWidth, height: this.getSize(49), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: this.getSize(14), fontWeight: '400', color: '#999999' }}>取消</Text>
            <View style={{ position: 'absolute', bottom: 0, width: this.mScreenWidth, height: this.mOnePixel, backgroundColor: '#E8EEF0' }} />
        </TouchableOpacity>
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    renderContent() {
        return <View style={{ width: this.mScreenWidth, backgroundColor: '#ffffff' }}>
            {this.renderItems()}
            {this.props.cancel ? this.renderCancel() : null}
        </View>
    }

}
