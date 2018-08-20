
import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Modal
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
    AlertDialog,
    DownloadDialog,
    ToastComponent
} from 'react-native-pickers';

import AreaJson from './Area.json';

export default class MainPage extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            unit: ['年', '月', '日'],
            startYear: 1900,
            active: false,
            modalVisible: false
        }
    }

    startDownload() {
        let count = 0;
        this.setState({ active: false })
        this.interval = setInterval(() => {
            if (count > 100) {
                //下载完成
                this.setState({ active: true })
                clearInterval(this.interval);
                return;
            }
            this.DownloadDialog.setProcess(count / 100, '4.23MB');
            count++;
            count++;
        }, 100);
    }

    renderButton(text, callback) {
        return <TouchableOpacity
            onPress={callback.bind(this)}
            style={{
                width: this.getSize(180), height: this.getSize(35),
                justifyContent: 'center', alignItems: 'center',
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
            <View style={{ width: this.mScreenWidth, height: 60, backgroundColor: 0x00000030 }} />
            <View style={{ flex: 1, width: this.mScreenWidth, justifyContent: 'center', alignItems: 'center' }}>
                {this.renderButton('AlertDialog', () => { this.AlertDialog.show() })}
                {this.renderButton('SimpleItemsDialog', () => { this.SimpleItemsDialog.show() })}
                {this.renderButton('SimpleChooseDialog', () => { this.SimpleChooseDialog.show() })}
                {this.renderButton('InputDialog', () => { this.InputDialog.show() })}
                {this.renderButton('最简单的自定义picker', () => { this.CustomPicker.show() })}
                {this.renderButton('行政区域picker', () => { this.AreaPicker.show() })}
                {this.renderButton('DatePicker', () => { this.DatePicker.show() })}
                {this.renderButton('DatePicker1', () => { this.DatePicker1.show() })}
                {this.renderButton('实现全屏覆盖', () => { console.log('xxxxx'); this.setState({modalVisible: true}, ()=>{this.SimpleChooseDialog1.show();}); })}
                {this.renderButton('下载进度', () => {
                    this.DownloadDialog.show();
                    this.startDownload();
                })}
                {this.renderButton('showToast', () => {
                    this.ToastComponent.show('给个星星呗~')
                })}
                <AlertDialog
                    showAnimationType='timing'
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
                <DownloadDialog
                    active={this.state.active}
                    onAction={() => { alert('打开') }}
                    onCoverPress={() => { this.interval && clearInterval(this.interval) }}
                    ref={ref => this.DownloadDialog = ref} />
                <ToastComponent ref={ref => this.ToastComponent = ref} />
            </View>
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    
                }}
            >
                <SimpleChooseDialog ref={ref => this.SimpleChooseDialog1 = ref}
                    onCoverPress={()=>{
                        this.setState({modalVisible: false});
                    }}
                    onPress={(which) => {  
                        console.log(which);
                        this.setState({modalVisible: false});
                    }} />
            </Modal>
        </View>
    }

}
