import React from 'react';
import { Card, ActivityIndicator, Colors } from 'react-native-paper';
import {
    FlatList
} from 'react-native';
import axios from 'axios';
import IndicadorList from '../componets/IndicadorList';

const Detalle = ({ navigation, route }) => {

    const [showLoading, setShowLoading] = React.useState(true);
    const [indicador, setIndicador] = React.useState([]);

    let e = route.params.indicador;


    React.useEffect(() => {
        navigation.setOptions({ title: e.nombre });
        axios.get('https://mindicador.cl/api/' + e.codigo)
            .then(function (response) {
                let data = response.data;

                setShowLoading(false);
                setIndicador(data.serie);

            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    return (

        <Card>
            <Card.Content>

                { showLoading ?
                <ActivityIndicator animating={true} color={Colors.red800} />
                
                :

                <FlatList

                    data={indicador}
                    renderItem={({ item }) => {
                        return <IndicadorList key={item.key} item={{...item, unidad_medida: e.unidad_medida}}/>;
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                }


            </Card.Content>
        </Card>

    )
}


export default Detalle;