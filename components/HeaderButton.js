import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';

const CustomHeaderButton = (props) => (
    <HeaderButton
    {...props}
    IconComponent={MaterialIcons}
    iconSize={22}
    color="white"
    />
);

export default CustomHeaderButton;
