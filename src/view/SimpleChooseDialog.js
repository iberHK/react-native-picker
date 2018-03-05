
import React, { Component } from 'react';

import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    FlatList
} from 'react-native';

import BaseDialog from './BaseDialog';

/**
 * 用于不跳转页面的选择
 */
class SimpleChooseDialog extends BaseDialog {

    static defaultProps = {
        items: ['a', 'b', 'c'],
        onPress: null,
        selectColor: '#ff0000',
        normalColor: '#666666',
    }

    constructor(props) {
        super(props);
    }

    renderItems() {
        return this.props.items.map((item, index) => {
            return <TouchableOpacity
                onPress={() => {
                    this.setState({ seleted: index })
                }}
                key={this.key ? item[this.key] : item}
                style={{
                    paddingLeft: this.getSize(20), paddingRight: this.getSize(20),
                    width: this.getSize(307), height: this.getSize(49),
                    justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'
                }}>
                <View style={{
                    width: this.getSize(18), height: this.getSize(18), justifyContent: 'center', alignItems: 'center',
                    borderRadius: this.getSize(18) / 2, borderColor: this.state.seleted == index ? this.props.selectColor : this.props.normalColor, borderWidth: 1, marginRight: this.getSize(20)
                }}>
                    {this.state.seleted == index ? <View style={{
                        width: this.getSize(10), height: this.getSize(10), borderRadius: this.getSize(10) / 2,
                        backgroundColor: this.props.selectColor
                    }} /> : null}
                </View>
                <Text style={{ fontSize: this.getSize(14), fontWeight: '400', color: '#333333' }}>{this.key ? item[this.key] : item}</Text>
            </TouchableOpacity>
        })
    }

    _getContentPosition() {
        return { justifyContent: 'center', alignItems: 'center' }
    }

    renderContent() {
        return <View style={{ width: this.getSize(307), backgroundColor: '#ffffff', borderRadius: this.getSize(5), alignItems: 'center', paddingTop: this.getSize(10) }}>
            {this.renderItems()}
            <TouchableOpacity
                onPress={() => {
                    this.dismiss(() => {
                        if (this.props.onPress) {
                            this.props.onPress(this.state.seleted != null ? this.state.seleted : -1);
                        }
                    });
                }}
                style={{
                    width: this.getSize(200), height: this.getSize(44),
                    backgroundColor: this.props.selectColor, borderRadius: this.getSize(5),
                    justifyContent: 'center', alignItems: 'center', marginTop: this.getSize(13), marginBottom: this.getSize(20)
                }}>
                <Text style={{ color: '#000000', fontSize: this.getSize(16), fontWeight: '400' }}>確定</Text>
            </TouchableOpacity>
        </View >
    }

}

export default SimpleChooseDialog;