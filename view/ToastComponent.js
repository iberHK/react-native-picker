import React, { Component } from 'react';

import {
    View,
    Text,
    Animated
} from 'react-native';

import BaseComponent from '../view/BaseComponent';

export default class ToastComponent extends BaseComponent {

    static defaultProps = {
        duration: 1500,
        textColor: '#ffffff',
        fontSize: 14,
        lineHeight: 20,
        paddingH: 10,
        paddingV: 5,
        borderRadius: 5,
        backgroundColor: 0x00000099,
    }

    opacity = new Animated.Value(0);

    leftPath = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            toastVisiable: false,
            toastText: ''
        }
    }

    show(message) {
        this.timeoutId && clearTimeout(this.timeoutId);
        this.opacity.setValue(0)
        this.setState({ toastText: message, toastVisiable: true });
        Animated.timing(this.opacity, { toValue: 1, duration: 200 }).start();
        this.timeoutId = setTimeout(() => {
            Animated.timing(this.opacity, { toValue: 0, duration: 200 }).start(() => {
                this.setState({ toastVisiable: false });
            });
        }, this.props.duration);
    }

    componentWillUnmount() {
        this.timeoutId && clearTimeout(this.timeoutId);
    }

    render() {
        if (this.state.toastVisiable) {
            return <Animated.View
                onLayout={(e) => {
                    //如果依靠父容器来定位Toast居中，
                    //在配合react-navigation设置全局单例Toast，会导致StackNavigator布局异常
                    this.leftPath.setValue((this.mScreenWidth - e.nativeEvent.layout.width) / 2);
                }}
                style={{
                    opacity: this.opacity, alignItems: 'center',
                    position: 'absolute',
                    top: this.mScreenHeight - this.getSize(300),
                    left: this.leftPath
                }}>
                <View
                    style={{
                        borderRadius: this.props.borderRadius,
                        backgroundColor: this.props.backgroundColor,
                        paddingLeft: this.props.paddingH, paddingRight: this.props.paddingH,
                        paddingTop: this.props.paddingV, paddingBottom: this.props.paddingV
                    }}>
                    <Text style={{ color: this.props.textColor, fontSize: this.props.fontSize, lineHeight: this.props.lineHeight }}>{this.state.toastText}</Text>
                </View>
            </Animated.View>
        } else {
            return null;
        }
    }
}
