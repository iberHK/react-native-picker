
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
            <AlertDialog
                messageText='Alert Message'
                messageTextColor='#444444'
                messageTextSize={this.getSize(14)}
                negativeText='cancel'
                negativeColor='#666666'
                negativeSize={this.getSize(16)}
                positiveText='ok'
                positiveColor='#ff0000'
                positiveSize={this.getSize(16)}
                onPress={(isOK) => {
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
