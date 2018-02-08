
import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import BaseComponent from './BaseComponent';

import CustomPicker from './CustomPicker';

import AreaPicker from './AreaPicker';

import TimePicker from './TimePicker';

export default class MainPage extends BaseComponent {

    constructor(props) {
        super(props);
    }

    renderButton(text, callback) {
        return <TouchableOpacity
            onPress={callback.bind(this)}
            style={{
                borderColor: '#999999', borderWidth: this.mOnePixel,
                padding: this.getSize(10), backgroundColor: '#cccccc',
                borderRadius: this.getSize(4), marginBottom: this.getSize(20)
            }}>
            <Text>{text}</Text>
        </TouchableOpacity >
    }

    initTimerPickSource() {
        let unit = ['年', '月', '日'];
        let years = [];
        let months = [];
        let days = [];
        let hours = [];
        let minutes = [];
        for (let i = 0; i < new Date().getFullYear() + 1 - new Date('1917-01-01').getFullYear(); i++) {
            years.push(i + new Date('1917-01-01').getFullYear() + unit[0]);
        }
        for (let i = 1; i < 13; i++) {
            months.push(i + unit[1]);
        }
        for (let i = 0; i < 24; i++) {
            hours.push((Array(2).join(0) + i).slice(-2) + unit[3]);
        }
        for (let i = 1; i < 32; i++) {
            days.push(i + unit[2]);
        }
        for (let i = 1; i < 61; i++) {
            minutes.push(i + unit[4]);
        }
        return [years, months, days];
    }

    render() {
        return <View style={{
            width: this.mScreenWidth, height: this.mScreenHeight,
            backgroundColor: '#f9fafb', justifyContent: 'center', alignItems: 'center'
        }}>
            {this.renderButton('最简单的自定义picker', () => { this.CustomPicker.show() })}
            {this.renderButton('行政区域picker', () => { this.AreaPicker.show(this.seletedArea) })}
            {this.renderButton('TimePicker', () => { this.TimePicker.show() })}
            <CustomPicker ref={ref => this.CustomPicker = ref} />
            <AreaPicker
                onPickerCancel={() => { console.warn('行政区域picker-取消') }}
                onPickerConfirm={(value) => { this.seletedArea = value; console.warn(JSON.stringify(value)) }}
                ref={ref => this.AreaPicker = ref} />
            <TimePicker
                ref={ref => this.TimePicker = ref} />
        </View>
    }

}
