import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import ItemTab from "../ItemTab";

export default class TabItems extends Component {
    render() {
        const {styleTab, onIndexChange, routes, selectedTabItem} = this.props;
        return (
            <View style={[styles.tabItemContainer, styleTab]}>
                {
                    routes.map((e, i) => {
                        let isActive = !!(selectedTabItem && e.id === selectedTabItem);
                        return (
                            <View style={{flex:1}} key={i}>
                                <ItemTab
                                    key={i}
                                    {...this.props}
                                    text={e.name.toUpperCase()}
                                    onChangeTabView={() => onIndexChange(e, i)}
                                    isActive={isActive}/>
                            </View>
                        );
                    })
                }
            </View>
        );
    }
}
TabItems.defaultProps = {
    selectedTabItem: 1,
    routes: [],
};


TabItems.propTypes = {
    selectedTabItem: PropTypes.number,
    routes: PropTypes.array,
    styleTab: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    onIndexChange: PropTypes.func
};

