
import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import AlertDialog from './view/AlertDialog';

import AreaPicker from './view/AreaPicker';

import CustomPicker from './view/CustomPicker';

import DatePicker from './view/DatePicker';

import InputDialog from './view/InputDialog';

import PickerView from './view/PickerView';

import SimpleChooseDialog from './view/SimpleChooseDialog';

import SimpleItemDialog from './view/SimpleItemDialog';

import BaseComponent from './view/BaseComponent';

export default class MainPage extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            unit: ['年', '月', '日'],
            startYear: 1900
        }
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
            {this.renderButton('AlertDialog', () => { this.AlertDialog.show() })}
            {this.renderButton('SimpleItemDialog', () => { this.SimpleItemDialog.show() })}
            {this.renderButton('SimpleChooseDialog', () => { this.SimpleChooseDialog.show() })}
            {this.renderButton('InputDialog', () => { this.InputDialog.show() })}
            {this.renderButton('最简单的自定义picker', () => { this.CustomPicker.show() })}
            {this.renderButton('行政区域picker', () => { this.AreaPicker.show() })}
            {this.renderButton('DatePicker', () => { this.DatePicker.show() })}
            {this.renderButton('DatePicker1', () => { this.DatePicker1.show() })}
            <AlertDialog onPress={(isOK) => {
                alert(isOK ? 'ok' : 'cancel');
            }} ref={ref => this.AlertDialog = ref} />
            <SimpleItemDialog ref={ref => this.SimpleItemDialog = ref}
                onPress={(which) => {
                    alert(which)
                }} />
            <SimpleChooseDialog ref={ref => this.SimpleChooseDialog = ref}
                onPress={(which) => { alert(which) }} />
            <InputDialog ref={ref => this.InputDialog = ref}
                onSubmit={(text) => { alert(text) }} />
            <CustomPicker ref={ref => this.CustomPicker = ref} />
            <AreaPicker
                onPickerCancel={() => { }}
                onPickerConfirm={(value) => {
                    alert(JSON.stringify(value));
                }}
                ref={ref => this.AreaPicker = ref} />
            <DatePicker
                unit={this.state.unit}
                startYear={this.state.startYear}
                onAcceptCallback={(value) => {
                    alert(JSON.stringify(value))
                }}
                onCancelCallback={() => {
                    alert('cancel')
                }}
                ref={ref => this.DatePicker = ref} />
            <DatePicker
                HH={false}
                mm={false}
                ss={false}
                unit={this.state.unit}
                startYear={this.state.startYear}
                onAcceptCallback={(value) => {
                    alert(JSON.stringify(value))
                }}
                onCancelCallback={() => {
                    alert('cancel')
                }}
                ref={ref => this.DatePicker1 = ref} />
        </View>
    }

}
