import React, { Component, UIManager } from 'react';

import {
    Text,
    View,
    Animated,
    TouchableOpacity
} from 'react-native';

import PickerView from './PickerView';

import BaseDialog from './BaseDialog';

class AreaPicker extends BaseDialog {

    static defaultProps = {
        removeSubviews: false,
        selectedValue: ['香港', '香港', '中西區'],
        areaJson: null,
        confirmText: '确定',
        confirmTextSize: 14,
        confirmTextColor: '#333333',
        cancelText: '取消',
        cancelTextSize: 14,
        cancelTextColor: '#333333',
        itemTextColor: 0x333333ff,
        itemSelectedColor: 0x1097D5ff,
        itemHeight: 40,
        onPickerCancel: null,
        onPickerConfirm: null
    }

    constructor(props) {
        super(props);
        this.state = {
            areaData: this.getAreaData(),
            path: new Animated.Value(0),
            ...this.formatPickerData(props.selectedValue)
        };
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    getAreaData() {
        let area = this.props.areaJson;
        let data = [];
        let len = area.length;
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }
            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    formatPickerData() {
        let province = [];
        let city = [];
        let county = [];
        let firstCity = null;
        let firstCountry = null;
        let areaData = this.getAreaData();
        areaData.map((pitem) => {
            for (let pname in pitem) {
                province.push(pname)
                if (pname == this.props.selectedValue[0]) {
                    pitem[pname].map(citem => {
                        for (let cname in citem) {
                            if (firstCity == null) {
                                firstCity = cname;
                            }
                            city.push(cname);
                            if (cname == this.props.selectedValue[1]) {
                                county = citem[cname];
                                if (firstCountry == null) {
                                    firstCountry = citem[cname][0];
                                }
                            }
                        }
                    });
                }
            }
        });

        if (county.indexOf(this.props.selectedValue[2]) == -1) {
            this.props.selectedValue[2] = firstCountry;
        }

        if (county.length == 0 && firstCity != null) {
            this.props.selectedValue[1] = firstCity;
            return this.formatPickerData();
        }

        return {
            pickerData: [province, city, county], visible: true
        };
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            let selectedIndex = 0;
            let length = item.length;
            for (let i = 0; i < length; i++) {
                if (item[i] == this.props.selectedValue[pickerId]) {
                    selectedIndex = i;
                    break;
                }
            }
            if (item && length > 0) {
                return <PickerView
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    key={'picker' + pickerId}
                    list={item}
                    onPickerSelected={(toValue) => {
                        this.props.selectedValue[pickerId] = toValue;
                        this.setState({ ...this.formatPickerData(this.props.selectedValue) });
                    }}
                    selectedIndex={selectedIndex}
                    fontSize={this.getSize(14)}
                    itemWidth={this.mScreenWidth / this.state.pickerData.length}
                    itemHeight={this.props.itemHeight} />
            } else {
                return null;
            }
        });
    }

    renderContent() {
        return <View
            style={{
                height: this.props.itemHeight * 5 + this.getSize(15) + this.getSize(44), width: this.mScreenWidth,
                backgroundColor: '#ffffff'
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
                        this.dismiss(() => {
                            this.props.onPickerCancel && this.props.onPickerCancel();
                        });
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.cancelTextSize, fontWeight: '400', color: this.props.cancelTextColor }}>{this.props.cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.dismiss(() => {
                            this.props.onPickerConfirm && this.props.onPickerConfirm(this.props.selectedValue);
                        });
                    }}
                    style={{ width: this.getSize(60), height: this.getSize(44), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: this.props.confirmTextSize, fontWeight: '400', color: this.props.confirmTextColor }}>{this.props.confirmText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

export default AreaPicker;