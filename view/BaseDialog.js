
import React, { Component } from 'react';

import {
    Animated,
    TouchableOpacity,
    Platform
} from 'react-native';

import BaseComponent from './BaseComponent';

export default class BaseDialog extends BaseComponent {

    static defaultProps = {
        removeSubviews: true,   //隐藏时，是否回收前景控件，false 更流畅，true：初始化更快，dismiss后就回收
        coverClickable: true,
        onCoverPress: null,
        showAnimationType: 'spring'
    }

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
        this.setState({ _isShow: true, ...state }, () => {
            if (!this.props.showAnimationType || this.props.showAnimationType == 'spring') {
                Animated.spring(this._path, { toValue: 1 }).start(() => {
                    callback && callback();
                });
            } else {
                Animated.timing(this._path, { toValue: 1 }).start(() => {
                    callback && callback();
                });
            }
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


    /**
     * 前景位置
     */
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
                    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
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
                        if (!this.props || (this.props.coverClickable || this.props.coverClickable == null)) {
                            this.dismiss(this.props.onCoverPress);
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
