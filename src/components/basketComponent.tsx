import React from 'react';
import { View, Text } from 'react-native';

const BasketComponent = (props: { name: any }) => (
    <View>
        <Text>{props.name}</Text>
    </View>
);

export default BasketComponent;
