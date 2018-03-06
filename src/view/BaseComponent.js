
import React, { Component } from 'react';

import {
    Dimensions,
    PixelRatio
} from 'react-native';

class BaseComponent extends Component {

    mScreenWidth = Dimensions.get('window').width;

    mScreenHeight = Dimensions.get('window').height;

    //最小显示单位
    mOnePixel = (PixelRatio.get() == 3 ? 2 : 1) / PixelRatio.get();

    constructor(props) {
        super(props);
    }

    /**
     * return 當前分辨率下的數值
     * @param {*} size 375标注图下的值
     */
    getSize(size) {
        return parseInt(this.mScreenWidth * size / 375);
    }

}

export default BaseComponent;
