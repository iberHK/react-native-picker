
import React, { Component } from 'react';

import {
    View,
    Animated,
    PanResponder
} from 'react-native';

import BaseComponent from './BaseComponent';

import Svg, {
    LinearGradient,
    Rect,
    Stop
} from 'react-native-svg';

class PickerView extends BaseComponent {

    static defaultProps = {
        itemTextColor: 0x333333ff,
        itemSelectedColor: 0x1097D5ff,
        itemHeight: 40,
        onPickerSelected: null,
        selectedIndex: 0
    }

    _previousTop = 0;

    lastTop = 0;

    constructor(props) {
        super(props);
        list = ['', ''].concat(props.list).concat(['', '']);
        this.colorPath = [];
        let length = list.length;
        for (let i = 0; i < length; i++) {
            this.colorPath.push(new Animated.Value(i == (this.props.selectedIndex + 2) ? 1 : 0));
        }
        this.path = new Animated.Value(-props.itemHeight * this.props.selectedIndex);
        this.state = {
            list: list,
            selectedIndex: props.selectedIndex,
        };
        this.maxTop = 0;
        this.maxBottom = -props.itemHeight * (list.length - 5);
        this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
        this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
        this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
        this.onPanResponderMove = this.onPanResponderMove.bind(this);
        this.onPanResponderEnd = this.onPanResponderEnd.bind(this);

        //這裏固定在屏幕底部，所以直接寫死touch區域即可。
        this.parentTopY = this.mScreenHeight - props.itemHeight * 5 - this.getSize(15);
        this.parentBottomY = this.mScreenHeight - this.getSize(15);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps) {
            list = ['', ''].concat(nextProps.list).concat(['', '']);
            listChange = JSON.stringify(list) != JSON.stringify(this.state.list);
            indexChange = nextProps.selectedIndex != this.state.selectedIndex;
            if (listChange || indexChange) {
                console.log('shouldComponentUpdate');
                this.path.setValue(-this.props.itemHeight * nextProps.selectedIndex);
                if (listChange) {
                    this.colorPath = [];
                    let length = list.length;
                    for (let i = 0; i < length; i++) {
                        this.colorPath.push(new Animated.Value(i == (nextProps.selectedIndex + 2) ? 1 : 0));
                    }
                }
                nextState.list = list;
                nextState.selectedIndex = nextProps.selectedIndex;

                this.maxTop = 0;
                this.maxBottom = -this.props.itemHeight * (list.length - 5);
                return true;
            }
        }
        return false;
    }

    //用户开始触摸屏幕的时候，是否愿意成为响应者；
    onStartShouldSetPanResponder(evt, gestureState) {
        if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
            return false;
        } else {
            this.path && this.path.removeAllListeners();
            this.path.stopAnimation();
            this.keyDown = Date.now();
            return true;
        }
    }

    //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
    onMoveShouldSetPanResponder(evt, gestureState) {
        if (evt.nativeEvent.pageY < this.parentTopY || evt.nativeEvent.pageY > this.parentBottomY) {
            return false;
        } else {
            this.path && this.path.removeAllListeners();
            this.path.stopAnimation();
            return true;
        }
    }

    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant(evt, gestureState) {
        this.lastTop = this.path._value;
    }

    // 最近一次的移动距离为gestureState.move{X,Y}
    onPanResponderMove(evt, gestureState) {
        if (global.timer != null) {
            global.timer.map(item => {
                clearTimeout(item);
            });
        }
        this._previousTop = this.lastTop + gestureState.dy;
        if (this._previousTop > 0) {
            this._previousTop = Math.min(this._previousTop, this.maxTop + this.props.itemHeight);
        } else {
            this._previousTop = Math.max(this._previousTop, this.maxBottom - this.props.itemHeight);
        }
        this.path.setValue(this._previousTop);
        if (this.previousTop) {
            this.velocity = gestureState.dy - this.previousTop;
        } else {
            this.velocity = 0;
        }
        this.previousTop = gestureState.dy;
    }

    lastEvent = null;

    lastTwoEvent = null;

    onPanResponderEnd(evt, gestureState) {
        let actionTime = Date.now() - this.keyDown;
        if (actionTime < 300 && Math.abs(gestureState.vy) < 0.1) {
            let clickPosition = -(parseInt((gestureState.y0 - this.parentTopY) / this.props.itemHeight) - 2);
            let toValue = this.path._value;
            let number = Math.round(toValue / this.props.itemHeight);
            toValue = this.props.itemHeight * number;
            toValue = toValue + (this.props.itemHeight * clickPosition);
            if (toValue > 0) {
                toValue = Math.min(toValue, this.maxTop);
            } else {
                toValue = Math.max(toValue, this.maxBottom);
            }
            if (isNaN(toValue)) {
            } else {
                //onSeleted
                Animated.timing(this.path, { toValue: toValue, duration: 200 }).start(() => {
                    this.onSeleted(Math.abs(toValue / this.props.itemHeight - 2));
                });
            }
        } else {
            this.lastTop = this._previousTop;
            let toValue = this._previousTop + gestureState.vy * this.props.itemHeight * 2;
            let number = Math.round(toValue / this.props.itemHeight);
            toValue = this.props.itemHeight * number;
            if (toValue > 0) {
                toValue = Math.min(toValue, this.maxTop);
            } else {
                toValue = Math.max(toValue, this.maxBottom);
            }
            Animated.decay(this.path, {
                velocity: gestureState.vy, //通过手势设置相关速度
                deceleration: 0.995,
            }).start(() => {
                if (this.path._value % this.props.itemHeight == 0) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                } else {
                    //慣性動畫
                    if (this.pathListener) {
                        this.path.removeListener(this.pathListener);
                        this.pathListener = null;
                        let toValue = Math.round(this.path._value / this.props.itemHeight) * this.props.itemHeight;
                        Animated.timing(this.path, {
                            toValue: toValue,
                            duration: 50
                        }).start(() => {
                            //onSeleted
                            this.onSeleted(Math.abs(toValue / this.props.itemHeight - 2));
                        });
                    }
                }
            });
            //當滾動超出上限或者下限時，接管慣性動畫
            this.pathListener = this.path.addListener((listener) => {
                if (listener.value < this.maxBottom && this.pathListener) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                    Animated.timing(this.path, { toValue: this.maxBottom }).start(() => {
                        //onSeleted
                        this.onSeleted(Math.abs(this.maxBottom / this.props.itemHeight - 2));
                    });
                } else if (listener.value > this.maxTop - this.props.itemHeight && this.pathListener) {
                    this.path.removeListener(this.pathListener);
                    this.pathListener = null;
                    Animated.timing(this.path, { toValue: this.maxTop }).start(() => {
                        //onSeleted
                        this.onSeleted(Math.abs(this.maxTop / this.props.itemHeight - 2));
                    });
                }
            });
        }
    }

    onSeleted(selectedIndex) {
        if (global.timer == null) {
            global.timer = [];
        }
        global.timer.push(setTimeout(() => {
            this.colorPath.map((item, index) => {
                if (item._value == 0 && selectedIndex == index) {
                    item.setValue(1);
                } else if (item._value == 1 && selectedIndex != index) {
                    item.setValue(0);
                }
            })
            this.props.onPickerSelected && this.props.onPickerSelected(this.state.list[selectedIndex]);
        }, 20));
    }


    componentWillMount(evt, gestureState) {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
            onPanResponderGrant: this.onPanResponderGrant,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderEnd,
            onPanResponderTerminate: this.onPanResponderEnd,
        });
    }

    renderList() {
        return this.state.list.map((item, index) => {
            return this.renderItem(item, index);
        });
    }

    renderItem(item, index) {
        return <View
            key={index}
            style={{
                width: this.props.itemWidth, height: this.props.itemHeight,
                justifyContent: 'center', alignItems: 'center'
            }}>
            <Animated.Text style={{
                color: this.colorPath[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [this.props.itemTextColor, this.props.itemSelectedColor]
                }), fontSize: this.props.fontSize ? this.props.fontSize : this.getSize(20),
                backgroundColor: 'transparent', fontWeight: 'normal'
            }}>{item}</Animated.Text>
        </View >
    }

    render() {
        return <View style={{
            width: this.props.itemWidth, height: this.props.itemHeight * 5 + this.getSize(15),
            backgroundColor: '#ffffff'
        }}>
            <View
                ref={ref => this.ref = ref}
                {...this._panResponder.panHandlers}
                style={{
                    overflow: 'hidden',
                    width: this.props.itemWidth, height: this.props.itemHeight * 5 + this.getSize(15), backgroundColor: '#ffffff'
                }}>
                <Animated.View
                    style={{
                        transform: [
                            {
                                translateY: this.path
                            }
                        ]
                    }}
                >
                    {this.renderList()}
                </Animated.View>
                <View style={{ position: 'absolute', width: this.props.itemWidth, height: this.mOnePixel, top: this.props.itemHeight * 4 / 2, backgroundColor: '#E8EEF0' }} />
                <View style={{ position: 'absolute', width: this.props.itemWidth, height: this.mOnePixel, top: this.props.itemHeight * 6 / 2, backgroundColor: '#E8EEF0' }} />
                <Svg
                    onStartShouldSetResponder={() => {
                        return false;
                    }}
                    onResponderStart={() => {
                        return false;
                    }}
                    style={{ position: 'absolute', top: 0 }}
                    height={this.props.itemHeight * 1}
                    width={this.props.itemWidth}
                >
                    <LinearGradient id="grad" x1="0" y1={this.props.itemHeight * 1} x2={0} y2="0">
                        <Stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
                        <Stop offset="1" stopColor="#ffffff" stopOpacity="1" />
                    </LinearGradient>
                    <Rect
                        x="0"
                        y="0"
                        width={this.props.itemWidth}
                        height={this.props.itemHeight * 1}
                        fill="url(#grad)"
                        clipPath="url(#clip)"
                    />
                </Svg>

                <Svg
                    onStartShouldSetResponder={() => {
                        return false;
                    }}
                    onResponderStart={() => {
                        return false;
                    }}
                    style={{ position: 'absolute', bottom: this.getSize(15) }}
                    height={this.props.itemHeight * 1}
                    width={this.props.itemWidth}
                >
                    <LinearGradient id="grad" x1="0" y1={this.props.itemHeight * 1} x2={0} y2="0">
                        <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
                        <Stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />
                    </LinearGradient>
                    <Rect
                        x="0"
                        y="0"
                        width={this.props.itemWidth}
                        height={this.props.itemHeight * 1}
                        fill="url(#grad)"
                        clipPath="url(#clip)"
                    />
                </Svg>
                <View style={{ width: this.mScreenWidth, height: this.getSize(15), bottom: 0, backgroundColor: '#ffffff', position: 'absolute' }} />
            </View>

        </View>
    }
}

export default PickerView;