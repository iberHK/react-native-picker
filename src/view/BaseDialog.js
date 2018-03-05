
import React, { Component } from 'react';

import {
    Animated,
    TouchableOpacity,
    Keyboard
} from 'react-native';

import BaseComponent from './BaseComponent';

/**
 * Compnent基類,
 * 父類
 */
export default class BaseDialog extends BaseComponent {

    _path = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            _isShow: false
        }
    }

    isShowing() {
        return this.state._isShow;
    }

    show(callback, state = {}) {
        Keyboard.dismiss();
        this.setState({ _isShow: true, ...state }, () => {
            Animated.spring(this._path, { toValue: 1 }).start(() => {
                callback && callback();
            });
        });
    }

    dismiss(callback) {
        Animated.timing(this._path, { toValue: 0, duration: 200 }).start(() => {
            this.setState({ _isShow: false }, () => {
                callback && callback();
            });
        });
    }

    /**
     * 重写前景动画效果
     * @param {*} path 
     */
    _getContentInterpolate(path) {
        return [
            {
                translateY: path.interpolate(
                    {
                        inputRange: [0, 0.5, 1],
                        outputRange: [this.getSize(200), this.getSize(200), 0]
                    }
                )
            }
        ]
    }


    //  前景位置
    _getContentPosition() {
        return { justifyContent: 'center', alignItems: 'center' }
    }

    /**
     * 绘制前景控件
     */
    renderContent() {
        return null;
    }

    render() {
        if (this.state._isShow || (this.props && this.props.removeSubviews === false)) {
            return <Animated.View
                style={{
                    position: 'absolute', width: this.mScreenWidth, height: this.mScreenHeight,
                    backgroundColor: 0x00000050, opacity: this._path.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0, 1, 1]
                    }), ...this._getContentPosition(),
                    transform: [
                        {
                            translateX: this._path.interpolate(
                                {
                                    inputRange: [0, 0.01, 1],
                                    outputRange: [-this.mScreenWidth, 0, 0]
                                }
                            )
                        }
                    ]
                }}>
                <TouchableOpacity
                    onPress={() => {
                        if (!this.props || (this.props.bgCloseable || this.props.bgCloseable == null)) {
                            this.dismiss();
                        }
                    }}
                    style={{ position: 'absolute', width: this.mScreenWidth, height: this.mScreenHeight }} />

                <Animated.View style={{
                    opacity: this._path.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] }),
                    transform: this._getContentInterpolate(this._path),
                }}>
                    {this.renderContent()}
                </Animated.View>
            </Animated.View>
        } else {
            return null;
        }
    }
}
