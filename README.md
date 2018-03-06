# react-native-pickers
纯JS实现的React-Native 日期选择控件、地址选择控件等。

时间不多，肯定有bug，欢迎留言第一时间维护。

由于很多属性并没有封装好开放，所以暂时直接以源码形式分享，未插件化（2018年3月5日）

欢迎直接下载代码删改使用，欢迎沟通了解实现原理，有帮得上的，记得给星哦~

<table border="1 " width="200 ">
    <thead>
    <tr>
        <td colspan="4">ss</td>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td width="25%">1</td>
        <td width="25%">2</td>
        <td width="25%" rowspan="5" colspan="2">3</td>
    </tr>
    <tr>
        <td width="25%">4</td>
        <td width="25%"></td>
    </tr>
    <tr>
        <td width="25%"> 　</td>
        <td width="25%"> 　</td>
    </tr>
    <tr>
        <td width="25%"> 　</td>
        <td width="25%"> 　</td>
    </tr>
    <tr>
        <td width="25% "> 　</td>
        <td width="25% "> 　</td>
    </tr>
    </tbody>
</table>

AlertDialog:

![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/AlertDialog.png)

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
            <td>messageText</td>
            <td>'Alert Message'</td>
            <td>消息文本</td>
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

![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/items.png)


![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/choose.png)
![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/input.png)


![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/customer.png)
![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/area.png)


![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/date.png)
![image](https://github.com/iberHK/react-native-pickers/blob/master/screenshot/xxx.png)
