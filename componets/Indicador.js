import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    View,
    TouchableOpacity
} from 'react-native';
const Indicador = React.memo(
    (props) => {

    const onPressProp = () => {
        props.goDetails();
    }
    const onPressChartProp = () => {
        props.goChart();
    }

    return (

        <Card>
            <Card.Content>
                <TouchableOpacity onPress={onPressProp}>

                    <Title style={{ width: '80%' }}>{props.nombre}</Title>
                    <Paragraph>{props.unidad}</Paragraph>
                    <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 15, alignSelf: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={onPressChartProp}>

                            <MaterialCommunityIcons style={{ color: 'black' }} name='information-outline' size={25} />
                        </TouchableOpacity>
                        <MaterialCommunityIcons style={{ color: 'black' }} name='play' size={25} />
                    </View>
                </TouchableOpacity>
            </Card.Content>
        </Card>

    )
})


export default Indicador;