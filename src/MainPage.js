
import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    BaseComponent,
    BaseDialog,
    AreaPicker,
    CustomPicker,
    DatePicker,
    InputDialog,
    PickerView,
    SimpleChooseDialog,
    SimpleItemsDialog,
    AlertDialog
} from 'react-native-pickers';

import AreaJson from './Area.json';

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
            {this.renderButton('SimpleItemsDialog', () => { this.SimpleItemsDialog.show() })}
            {this.renderButton('SimpleChooseDialog', () => { this.SimpleChooseDialog.show() })}
            {this.renderButton('InputDialog', () => { this.InputDialog.show() })}
            {this.renderButton('最简单的自定义picker', () => { this.CustomPicker.show() })}
            {this.renderButton('行政区域picker', () => { this.AreaPicker.show() })}
            {this.renderButton('DatePicker', () => { this.DatePicker.show() })}
            {this.renderButton('DatePicker1', () => { this.DatePicker1.show() })}
            <AlertDialog
                onPress={(isOK) => {
                    alert(isOK ? 'ok' : 'cancel');
                }} ref={ref => this.AlertDialog = ref} />
            <SimpleItemsDialog
                items={[{ value: 1 }, { value: 2 }, { value: 3 }]}
                itemKey='value'
                ref={ref => this.SimpleItemsDialog = ref}
                onPress={(which) => {
                    alert(which)
                }} />
            <SimpleChooseDialog ref={ref => this.SimpleChooseDialog = ref}
                onPress={(which) => { alert(which) }} />
            <InputDialog ref={ref => this.InputDialog = ref}
                onSubmit={(text) => { alert(text) }} />
            <CustomPicker ref={ref => this.CustomPicker = ref} />
            <AreaPicker
                areaJson={AreaJson}
                onPickerCancel={() => { }}
                onPickerConfirm={(value) => {
                    alert(JSON.stringify(value));
                }}
                ref={ref => this.AreaPicker = ref} />
            <DatePicker
                unit={this.state.unit}
                startYear={this.state.startYear}
                onPickerConfirm={(value) => {
                    alert(JSON.stringify(value))
                }}
                onPickerCancel={() => {
                    alert('cancel')
                }}
                ref={ref => this.DatePicker = ref} />
            <DatePicker
                HH={false}
                mm={false}
                ss={false}
                unit={this.state.unit}
                startYear={this.state.startYear}
                onPickerConfirm={(value) => {
                    alert(JSON.stringify(value))
                }}
                onPickerCancel={() => {
                    alert('cancel')
                }}
                ref={ref => this.DatePicker1 = ref} />
        </View>
    }

}
