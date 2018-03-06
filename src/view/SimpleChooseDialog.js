
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
        itemKey: 'key',
        itemStyle: {
            fontSize: 14,
            fontWeight: '400',
            color: '#333333'
        },
        selectColor: '#1097D5',
        normalColor: '#666666',
        pointSize: 18,
        pointBorderRadius: 9,
        confirmText: '确定',
        confirmBtnColor: '#1097D5',
        confirmTextColor: '#ffffff',
        onPress: null,
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
                    width: this.props.pointSize, height: this.props.pointSize,
                    justifyContent: 'center', alignItems: 'center', marginRight: this.getSize(20),
                    borderRadius: this.props.pointBorderRadius, borderWidth: 1,
                    borderColor: this.state.seleted == index ? this.props.selectColor : this.props.normalColor,
                }}>
                    {this.state.seleted == index ? <View style={{
                        width: this.props.pointSize * 0.6, height: this.props.pointSize * 0.6,
                        borderRadius: this.props.pointBorderRadius * 0.6,
                        backgroundColor: this.props.selectColor
                    }} /> : null}
                </View>
                <Text style={[this.props.itemStyle, this.state.seleted == index ? { color: this.props.selectColor } : {}]}>{typeof item == 'string' ? item : item[this.props.itemKey]}</Text>
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
                    backgroundColor: this.props.confirmBtnColor, borderRadius: this.getSize(5),
                    justifyContent: 'center', alignItems: 'center', marginTop: this.getSize(13), marginBottom: this.getSize(20)
                }}>
                <Text style={{ color: this.props.confirmTextColor, fontSize: this.getSize(16), fontWeight: '400' }}>{this.props.confirmText}</Text>
            </TouchableOpacity>
        </View >
    }

}

export default SimpleChooseDialog;