import React, { Component, UIManager } from 'react';

import {
    Text,
    View,
    Animated,
    TouchableOpacity
} from 'react-native';

import PickerView from './PickerView';

import BaseDialog from './BaseDialog';

import TimeUtils from './TimeUtils';

export default class DatePicker extends BaseDialog {

    static defaultProps = {
        unit: ['年', '月', '日'],
        selectedValue: [new Date().getFullYear() + '年', new Date().getMonth() + 1 + '月', new Date().getDate() + '日'],
        startYear: 1990,
        endYear: new Date().getFullYear(),
        removeSubviews: false,
        pickerCancelBtnText: '取消',
        pickerAcceptBtnText: '确定',
        itemHeight: 40,
        onCancelCallback: null,
        onAcceptCallback: null
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            path: new Animated.Value(0),
            pickerCancelBtnText: '取消',
            ...this.initTimeList()
        };
    }

    initTimeList() {
        let unit = this.props.unit;
        let years = [];
        let months = [];
        let days = [];
        let hours = [];
        let minutes = [];

        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear + unit[0]);
        }

        let selectedYear = years[0];
        if (this.props.selectedValue) {
            selectedYear = this.props.selectedValue[0];
        }
        selectedYear = selectedYear.substr(0, selectedYear.length - unit[0].length);
        for (let i = 1; i < 13; i++) {
            months.push(i + unit[1]);
        }

        let selectedMonth = months[0];
        if (this.props.selectedValue) {
            selectedMonth = this.props.selectedValue[1];
        }
        selectedMonth = selectedMonth.substr(0, selectedMonth.length - unit[1].length);

        let dayCount = TimeUtils.getDaysInOneMonth(selectedYear, selectedMonth);
        for (let i = 1; i <= dayCount; i++) {
            days.push(i + unit[2]);
        }

        let selectedDay = days[0];
        if (this.props.selectedValue) {
            selectedDay = this.props.selectedValue[2];
        }
        selectedDay = selectedDay.substr(0, selectedDay.length - unit[2].length);
        return {
            pickerData: [years, months, days],
            selectedIndex: [
                years.indexOf(selectedYear + unit[0]),
                months.indexOf(selectedMonth + unit[1]),
                days.indexOf(selectedDay + unit[2]) == -1 ? days.length - 1 : days.indexOf(selectedDay + unit[2])]
        };
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            if (item) {
                return <PickerView
                    key={'picker' + pickerId}
                    list={item}
                    onPickerSelect={(toValue) => {
                        //是否联动的实现位置
                        this.props.selectedValue[pickerId] = toValue;
                        this.setState({ ...this.initTimeList() });
                    }}
                    selectedIndex={this.state.selectedIndex[pickerId]}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length}
                    itemHeight={this.props.itemHeight} />
            }
        });
    }

    renderContent() {
        return <View
            style={{
                height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44), width: this.mScreenWidth,
            }}>
            <View style={{ width: this.mScreenWidth, height: this.props.itemHeight * 5 + this.getSize(15), flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                {this.renderPicker()}
            </View>
            <View style={{
                width: this.mScreenWidth, height: this.getSize(44),
                backgroundColor: '#ffffff', flexDirection: 'row',
                justifyContent: 'space-between', position: 'absolute', top: 0
            }}>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss();
                        this.state.onPickerCancel && this.state.onPickerCancel(this.props.selectedValue);
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.getSize(16), fontWeight: '400', color: '#333333' }}>{this.props.pickerCancelBtnText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss();
                        this.state.onPickerConfirm && this.state.onPickerConfirm(this.props.selectedValue);
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.getSize(16), fontWeight: '400', color: '#333333' }}>{this.props.pickerAcceptBtnText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}