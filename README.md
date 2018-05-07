# react-native-pickers
纯JS实现Picker，还是有点难度的，需要涉及到RN的性能优化（联动不能使用setState来更新）、
自定义手势、自定义点击以及动画等。<br>
其他Dialog只是因为Picker是基于项目的BaseDialog扩展来的，就一并整理发布。<br>

🤗 🤗 随手给颗星星呗，有bug或者交流，欢迎留言第一时间维护。🤗 🤗<br>

![img](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/demo2.gif?raw=true)

### 安装：
<code>yarn add react-native-pickers</code><br>
<code>yarn add react-native-svg</code><br>
<code>react-native link react-native-svg</code><br>

### 使用：

<li>AreaPicker:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>selectedValue</td>
            <td>['香港', '香港', '中西區']</td>
            <td>选中</td>
            <td rowspan="12">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/area.png?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>areaJson</td>
            <td>null</td>
            <td>地址数据源</td>
        </tr>
        <tr>
            <td>confirmText</td>
            <td>'确定'</td>
            <td>确定选择文本</td>
        </tr>
        <tr>
            <td>confirmTextSize</td>
            <td>14</td>
            <td>确定选择文本字体大小</td>
        </tr>
        <tr>
            <td>confirmTextColor</td>
            <td>'#333333'</td>
            <td>确定选择字体颜色</td>
        </tr>
        <tr>
            <td>cancelText</td>
            <td>'取消'</td>
            <td>取消选择文本</td>
        </tr>
        <tr>
            <td>cancelTextSize</td>
            <td>14</td>
            <td>取消选择文本字体大小</td>
        </tr>
        <tr>
            <td>cancelTextColor</td>
            <td>'#333333'</td>
            <td>取消选择文本字体颜色</td>
        </tr>
        <tr>
            <td>itemTextColor</td>
            <td>0x333333ff</td>
            <td>item正常颜色，仅支持<code>16进制数字</code></td>
        </tr>
        <tr>
            <td>itemSelectedColor</td>
            <td>0x1097D5ff</td>
            <td>item选择颜色，仅支持<code>16进制数字</code></td>
        </tr>
        <tr>
            <td>itemHeight</td>
            <td>40</td>
            <td>item高度</td>
        </tr>
        <tr>
            <td>onPickerCancel</td>
            <td>null</td>
            <td>取消选择回调</td>
        </tr>
        <tr>
            <td>onPickerConfirm</td>
            <td>null</td>
            <td>确认选择回调</td>
        </tr>
    </tbody>
</table>

<br>
<li>DatePicker:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>itemTextColor</td>
            <td>0x333333ff</td>
            <td>item正常颜色，仅支持<code>16进制数字</code></td>
            <td rowspan="8">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/date.png?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>itemSelectedColor</td>
            <td>0x1097D5ff</td>
            <td>item选择颜色，仅支持<code>16进制数字</code></td>
        </tr>
        <tr>
            <td>onPickerCancel</td>
            <td>null</td>
            <td>取消选择回调</td>
        </tr>
        <tr>
            <td>onPickerConfirm</td>
            <td>null</td>
            <td>确认选择回调</td>
        </tr>
        <tr>
            <td>unit</td>
            <td>['年', '月', '日']</td>
            <td>单位</td>
        </tr>
        <tr>
            <td>selectedValue</td>
            <td>[
                new Date().getFullYear() + '年', <br>
                new Date().getMonth() + 1 + '月',<br>
                new Date().getDate() + '日']
            </td>
            <td>选中</td>
        </tr>
        <tr>
            <td>startYear</td>
            <td>1990</td>
            <td>起始年份</td>
        </tr>
        <tr>
            <td>endYear</td>
            <td>new Date().getFullYear()</td>
            <td>截至年份</td>
        </tr>
        <tr>
            <td>cancelText</td>
            <td>'取消'</td>
            <td>取消选择文本</td>
        </tr>
        <tr>
            <td>cancelTextSize</td>
            <td>14</td>
            <td>取消选择文本字体大小</td>
        </tr>
        <tr>
            <td>cancelTextColor</td>
            <td>'#333333'</td>
            <td>取消选择文本字体颜色</td>
        </tr>
        <tr>
            <td>itemTextColor</td>
            <td>0x333333ff</td>
            <td>item正常颜色，仅支持<code>16进制数字</code></td>
        </tr>
        <tr>
            <td>itemSelectedColor</td>
            <td>0x1097D5ff</td>
            <td>item选择颜色，仅支持<code>16进制数字</code></td>
        </tr>
        <tr>
            <td>onPickerCancel</td>
            <td>null</td>
            <td>取消选择回调</td>
        </tr>
        <tr>
            <td>onPickerConfirm</td>
            <td>null</td>
            <td>确认选择回调</td>
        </tr>
        <tr>
            <td>confirmText</td>
            <td>'确定'</td>
            <td>确定选择文本</td>
        </tr>
        <tr>
            <td>confirmTextSize</td>
            <td>14</td>
            <td>确定选择文本字体大小</td>
        </tr>
        <tr>
            <td>confirmTextColor</td>
            <td>'#333333'</td>
            <td>确定选择字体颜色</td>
        </tr>
        <tr>
            <td>cancelText</td>
            <td>'取消'</td>
            <td>取消选择文本</td>
        </tr>
        <tr>
            <td>cancelTextSize</td>
            <td>14</td>
            <td>取消选择文本字体大小</td>
        </tr>
        <tr>
            <td>cancelTextColor</td>
            <td>'#333333'</td>
            <td>取消选择文本字体颜色</td>
        </tr>
        <tr>
            <td>itemHeight</td>
            <td>40</td>
            <td>item高度</td>
        </tr>
        <tr>
            <td>HH</td>
            <td>true</td>
            <td>是否显示小时</td>
        </tr>
        <tr>
            <td>mm</td>
            <td>true</td>
            <td>是否显示分钟</td>
        </tr>
        <tr>
            <td>xx</td>
            <td>false</td>
            <td>是否显示秒</td>
        </tr>
    </tbody>
</table>
<br>

<li>AlertDialog:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>messageText</td>
            <td>'Alert Message'</td>
            <td>消息文本</td>
            <td rowspan="10">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/AlertDialog.png?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>messageTextColor</td>
            <td>'#444444'</td>
            <td>消息文本字体颜色</td>
        </tr>
        <tr>
            <td>messageTextSize</td>
            <td>14</td>
            <td>消息文本字体大小</td>
        </tr>
        <tr>
            <td>negativeText</td>
            <td>'cancel'</td>
            <td>取消文本</td>
        </tr>
        <tr>
            <td>negativeColor</td>
            <td>'#666666'</td>
            <td>取消文本颜色</td>
        </tr>
        <tr>
            <td>negativeSize</td>
            <td>16</td>
            <td>取消文本字体大小</td>
        </tr>
        <tr>
            <td>positiveText</td>
            <td>'ok'</td>
            <td>确定文本</td>
        </tr>
        <tr>
            <td>positiveColor</td>
            <td>'#1097D5'</td>
            <td>确定文本颜色</td>
        </tr>
        <tr>
            <td>positiveSize</td>
            <td>16</td>
            <td>确定文本字体大小</td>
        </tr>
        <tr>
            <td>onPress</td>
            <td>null</td>
            <td>
                <code>positive(确定)返回true</code> or
                <code>negative(取消)返回false</code>
            </td>
        </tr>
    </tbody>
</table>

<br>
<li>SimpleItemsDialog:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>items</td>
            <td>['a', 'b', 'c']</td>
            <td>列表数据，可以string、object(需要指定itemKey)</td>
            <td rowspan="5">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/items.png?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>itemKey</td>
            <td>'key'</td>
            <td>
                当item为object时，来指定显示的属性<br>
                <code>items:[{id:0, value: 'v1'},{id:0, value: 'v1'}]</code><br>
                <code>itemKey设为'value',则等同于<code>['v1', 'v2']</code><br>
            </td>
        </tr>
        <tr>
            <td>itemStyle</td>
            <td>
                    {<br>
                        fontSize: 14,<br>
                        fontWeight: '400',<br>
                        color: '#333333'<br>
                    }
            </td>
            <td>列表文字样式</td>
        </tr>
        <tr>
            <td>cancel</td>
            <td>true</td>
            <td>是否在列表最后 增加 ‘取消’ 项</td>
        </tr>
        <tr>
            <td>cancelText</td>
            <td>'取消'</td>
            <td>取消项文本</td>
        </tr>
        <tr>
            <td>cancelTextStyle</td>
            <td>
                    {<br>
                        fontSize: 14,<br>
                        fontWeight: '400',<br>
                        color: '#999999'<br>
                    }
            </td>
            <td>取消文本字体样式</td>
        </tr>
        <tr>
            <td>onPress</td>
            <td>null</td>
            <td>
                返回选中index
            </td>
        </tr>
    </tbody>
</table>

<br>
<li>SimpleChooseDialog:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>items</td>
            <td>['a', 'b', 'c']</td>
            <td>列表数据，可以string、object<br>
                (需要指定itemKey)</td>
            <td rowspan="5">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/simplechoosedialog.png?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>itemKey</td>
            <td>'key'</td>
            <td>
                当item为object时，来指定显示的属性<br>
                <code>items:[{id:0, value: 'v1'},{id:0, value: 'v1'}]</code><br>
                <code>itemKey设为'value',则等同于<br>
                <code>['v1', 'v2']</code><br>
            </td>
        </tr>
        <tr>
            <td>itemStyle</td>
            <td>
                    {<br>
                        fontSize: 14,<br>
                        fontWeight: '400',<br>
                        color: '#333333'<br>
                    }
            </td>
            <td>列表文字样式</td>
        </tr>
        <tr>
            <td>selectColor</td>
            <td>'#1097D5'</td>
            <td>选中颜色</td>
        </tr>
        <tr>
            <td>normalColor</td>
            <td>'#666666'</td>
            <td>未选中颜色</td>
        </tr>
        <tr>
            <td>pointSize</td>
            <td>18</td>
            <td>左侧选中标识大小</td>
        </tr>
        <tr>
            <td>pointBorderRadius</td>
            <td>9</td>
            <td>左侧选中标识边框弧度</td>
        </tr>
        <tr>
            <td>confirmText</td>
            <td>'确定'</td>
            <td>确定选择文本</td>
        </tr>
        <tr>
            <td>confirmBtnColor</td>
            <td>'#1097D5'</td>
            <td>确定选择按钮颜色</td>
        </tr>
        <tr>
            <td>confirmTextColor</td>
            <td>'#ffffff'</td>
            <td>确定选择文本颜色</td>
        </tr>
        <tr>
            <td>onPress</td>
            <td>null</td>
            <td>
                返回选中index
            </td>
        </tr>
    </tbody>
</table>

<br>
<li>InputDialog:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>title</td>
            <td>'我要举报'</td>
            <td>标题文本</td>
            <td rowspan="12">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/inputdialog.png?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>titleSize</td>
            <td>16</td>
            <td>标题文本字体大小</td>
        </tr>
        <tr>
            <td>titleColor</td>
            <td>'#333333'</td>
            <td>标题文本文本颜色</td>
        </tr>
        <tr>
            <td>cancelText</td>
            <td>'返回'</td>
            <td>取消文本</td>
        </tr>
        <tr>
            <td>cancelSize</td>
            <td>14</td>
            <td>取消文本字体大小</td>
        </tr>
        <tr>
            <td>cancelColor</td>
            <td>'#333333'</td>
            <td>取消文本字体颜色</td>
        </tr>
        <tr>
            <td>btnText</td>
            <td>'提交'</td>
            <td>提交文本</td>
        </tr>
        <tr>
            <td>btnTextSize</td>
            <td>12</td>
            <td>提交文本字体大小</td>
        </tr>
        <tr>
            <td>btnTextColor</td>
            <td>'#ffffff'</td>
            <td>提交文本字体颜色</td>
        </tr>
        <tr>
            <td>btnBgColor</td>
            <td>'#1097D5'</td>
            <td>提交按钮颜色</td>
        </tr>
        <tr>
            <td>placeholder</td>
            <td>'请尽量说明问题，我们将尽快处理...'</td>
            <td>输入框提示语</td>
        </tr>
        <tr>
            <td>onSubmit</td>
            <td>null</td>
            <td>
                返回输入的文本内容
            </td>
        </tr>
        <tr><td colspan="4">InputDialog.show(text)，显示dialog，text：用于编辑时，设置前值</td></tr>
    </tbody>
</table>

<br>
<li>DownloadDialog:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>title</td>
            <td>'视频下载'</td>
            <td>标题文本</td>
            <td rowspan="9">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/downloaddialog.gif?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>titleSize</td>
            <td>16</td>
            <td>标题文本字体大小</td>
        </tr>
        <tr>
            <td>titleColor</td>
            <td>'#333333'</td>
            <td>标题文本文本颜色</td>
        </tr>
        <tr>
            <td>active</td>
            <td>false</td>
            <td>按钮是否可点击</td>
        </tr>
        <tr>
            <td>actionText</td>
            <td>'打开'</td>
            <td>按钮文本</td>
        </tr>
        <tr>
            <td>onAction</td>
            <td>null</td>
            <td>点击按钮回调</td>
        </tr>
        <tr>
            <td>totalTextColor</td>
            <td>'#666666'</td>
            <td>总数文本字体颜色</td>
        </tr>
        <tr>
            <td>totalTextSize</td>
            <td>12</td>
            <td>总数文本字体大小</td>
        </tr>
        <tr><td colspan="4">DownloadDialog.setProcess(0, '4.24MB')，设置当前进度，及下载文件总数</td></tr>
    </tbody>
</table>


<br>
<li>ToastComponent:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
            <th>截图</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>duration</td>
            <td>1500</td>
            <td>显示时长（自动隐藏）</td>
            <td rowspan="9">
                <img src="https://github.com/iberHK/react-native-pickers/blob/master/screenshot/toast1.png?raw=true"/>
            </td>
        </tr>
        <tr>
            <td>fontSize</td>
            <td>14</td>
            <td>message字体大小</td>
        </tr>
        <tr>
            <td>textColor</td>
            <td>'#ffffff'</td>
            <td>message字体颜色</td>
        </tr>
        <tr>
            <td>lineHeight</td>
            <td>20</td>
            <td>message字体行高</td>
        </tr>
        <tr>
            <td>paddingH</td>
            <td>10</td>
            <td>水平padding</td>
        </tr>
        <tr>
            <td>paddingV</td>
            <td>5</td>
            <td>上下padding</td>
        </tr>
        <tr>
            <td>borderRadius</td>
            <td>5</td>
            <td>背景圆角</td>
        </tr>
        <tr>
            <td>backgroundColor</td>
            <td>0x00000099</td>
            <td>背景颜色</td>
        </tr>
        <tr><td colspan="4">ToastComponent.show('message')，显示‘message’toast。应放在navigation同层，全局唯一</td></tr>
    </tbody>
</table>

<br>
<li>BaseDialog:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>removeSubviews</td>
            <td>true</td>
            <td>dismiss，是否回收前景控件，拓展出来的子控件，不要动态设置改属性</td>
        </tr>
        <tr>
            <td>coverClickable</td>
            <td>ture</td>
            <td>背景点击隐藏</td>
        </tr>
        <tr>
            <td>onCoverPress</td>
            <td>null</td>
            <td>点击背景，dismiss回调</td>
        </tr>
        <tr>
            <td>showAnimationType</td>
            <td>null</td>
            <td>入场动画方式 spring timing</td>
        </tr>
    </tbody>
</table>

<br>
<li>PickerView:</li>
<br>
<table>
    <thead>
        <tr>
            <th>属性</th>
            <th>默认值</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>itemTextColor</td>
            <td>0x333333ff</td>
            <td>item正常颜色，仅支持<code>16进制数字</code></td>
        </tr>
        <tr>
            <td>itemSelectedColor</td>
            <td>0x1097D5ff</td>
            <td>item选择颜色，仅支持<code>16进制数字</code></td>
        </tr>
        <tr>
            <td>itemHeight</td>
            <td>40</td>
            <td>item高度</td>
        </tr>
        <tr>
            <td>onPickerSelected</td>
            <td>null</td>
            <td>选中时回调</td>
        </tr>
        <tr>
            <td>selectedIndex</td>
            <td>0</td>
            <td>选中</td>
        </tr>
    </tbody>
</table>