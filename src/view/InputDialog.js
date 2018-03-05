
import React, { Component } from 'react';

import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard
} from 'react-native';

import BaseDialog from './BaseDialog';

import KeyboardSpacer from './KeyboardSpacer';

class InputDialog extends BaseDialog {

    static defaultProps = {
        removeSubviews: false,
        btnColor: '#ff0000',
        onSubmit: null
    }

    constructor(props) {
        super(props);
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    show() {
        super.show(() => {
            this.text.focus();
        }, null);
    }

    dismiss(callback) {
        this.text.blur();
        super.dismiss(callback);
    }

    renderContent() {
        return <View style={{ width: this.mScreenWidth, backgroundColor: '#f8f8f8' }}>
            <View style={{
                width: this.mScreenWidth, height: this.getSize(50),
                flexDirection: 'row', paddingLeft: this.getSize(10),
                justifyContent: 'center', alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => this.dismiss()}
                    style={{
                        position: 'absolute', left: this.getSize(10),
                        height: this.getSize(40), flexDirection: 'row',
                        justifyContent: 'center', alignItems: 'center', marginLeft: this.getSize(5)
                    }}>
                    <Text style={{ fontSize: this.getSize(14), color: '#333333', marginLeft: this.getSize(5) }}>返回</Text>
                </TouchableOpacity>
                <Text style={{ position: 'absolute', fontSize: this.getSize(16), color: '#333333', fontWeight: '600' }}>我要举报</Text>
            </View>
            <TextInput ref={ref => this.text = ref}
                style={{
                    width: this.getSize(345), marginLeft: this.getSize(15),
                    height: this.getSize(100), color: '#333333', fontSize: this.getSize(14),
                    borderWidth: 1, borderColor: '#E8EEF0', backgroundColor: '#ffffff', borderRadius: this.getSize(4),
                    paddingLeft: this.getSize(15), paddingRight: this.getSize(15), paddingTop: this.getSize(10)
                }}
                numberOfLines={4}
                multiline={true}
                value={this.state.text}
                underlineColorAndroid={'transparent'}
                placeholder={'请具体说明问题，我们将尽快处理...'}
                placeholderTextColor='#999999'
                onChangeText={(text) => {
                    this.setState({ text: text })
                }} />
            <View style={{
                width: this.mScreenWidth, height: this.getSize(48), paddingRight: this.getSize(15),
                justifyContent: 'center', alignItems: 'flex-end'
            }}>
                <TouchableOpacity
                    onPress={() => this.dismiss(() => {
                        this.props.onSubmit && this.props.onSubmit(this.state.text);
                    })}
                    style={{
                        width: this.getSize(60), height: this.getSize(28),
                        justifyContent: 'center', alignItems: 'center',
                        backgroundColor: this.props.btnColor, borderRadius: this.getSize(4)
                    }}>
                    <Text style={{ fontSize: this.getSize(12), color: '#ffffff' }}>完成</Text>
                </TouchableOpacity>
            </View>
            <KeyboardSpacer />
        </View >
    }

}

export default InputDialog;