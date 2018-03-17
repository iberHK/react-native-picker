import React, { Component } from 'react';

import {
    View,
    Animated,
    Text,
    TouchableOpacity,
} from 'react-native';

import BaseDialog from './BaseDialog';

class DownloadDialog extends BaseDialog {

    static defaultProps = {
        title: '视频下载',
        titleColor: '#333333',
        titleSize: 14,
        active: false,
        actionText: '打开',
        onAction: null,
        totalTextColor: '#666666',
        totalTextSize: 12
    }

    process = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    /**
     * 
     * @param {*} process [0, 1]
     * @param {*} total 
     */
    setProcess(process, total) {
        if (this.state.total != total) {
            this.setState({ total });
        }
        Animated.spring(this.process, { toValue: process }).start();
    }

    renderContent() {
        return <Animated.View
            style={{
                width: this.getSize(307),
                backgroundColor: '#ffffff', borderRadius: this.getSize(5),
                marginBottom: this.getSize(30),
            }}>
            <Text style={{
                marginTop: this.getSize(15), marginLeft: this.getSize(15),
                color: this.props.titleColor, fontSize: this.props.titleSize
            }}>{this.props.title}</Text>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center', marginTop: this.getSize(25)
            }}>
                <View style={{ width: this.getSize(280), height: 4, borderRadius: 2, backgroundColor: '#d3d3d3' }} />
                <Animated.View style={{
                    width: this.process.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, this.getSize(280)]
                    }), height: 4, borderRadius: 2,
                    backgroundColor: '#1097D5',
                    position: 'absolute', left: this.getSize((307 - 280) / 2)
                }} />
            </View>
            <Text style={{
                paddingRight: this.getSize(12), textAlign: 'right', width: this.getSize(307),
                marginTop: this.getSize(5), marginBottom: this.getSize(15),
                color: this.props.totalTextColor, height: this.props.totalTextSize,
                fontSize: this.props.totalTextSize, lineHeight: this.props.totalTextSize
            }}>
                {this.state.total}
            </Text>
            <View style={{ width: this.getSize(307), height: this.mOnePixel, backgroundColor: '#e6e6e6' }} />
            <View style={{
                width: this.getSize(307), height: this.getSize(40),
                justifyContent: 'center', alignItems: 'center',
                flexDirection: 'row',
            }}>
                <TouchableOpacity
                    onPress={() => {
                        if (this.props.active) {
                            this.dismiss(() => {
                                this.process.setValue(0);
                                this.props.active = false;
                                this.props.onAction && this.props.onAction()
                            });
                        }
                    }}
                    style={{
                        width: this.getSize(307), height: this.getSize(40),
                        alignItems: 'center', justifyContent: 'center',
                    }}>
                    <Text style={{ color: '#1097D5', fontSize: this.getSize(16), opacity: this.props.active ? 1 : 0.5 }}>{this.props.actionText}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View >
    }
}

module.exports = DownloadDialog;