import React from 'react';
import { Card, Title, ActivityIndicator, Colors } from 'react-native-paper';
import axios from 'axios';
import DetailListChart from '../componets/DetailListChart';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts'
import {
    StyleSheet,
    View
} from 'react-native';
import { getHumanDate, formatNumber, Symbol } from '../Utils';

const Grafico = ({ navigation, route }) => {

    const [showLoading, setShowLoading] = React.useState(true);
    const [indicador, setIndicador] = React.useState();
    const [data, setData] = React.useState([]);

    let e = route.params.indicador;

    const contentInset = { top: 20, bottom: 20 }

    React.useEffect(() => {
        navigation.setOptions({ title: e.nombre });
        axios.get('https://mindicador.cl/api/' + e.codigo)
            .then(function (response) {
                let data = response.data;

                setIndicador(data.serie);
                setShowLoading(false);

            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    React.useEffect(() => {

        let array = [];
        if (indicador) {

            for (let index = 10; index >= 0; index--) {
                const element = indicador[index];
                array.push(element.valor);
            }
            
            setData(array);
        }

    }, [indicador]);

    return (

        <Card>
            <Card.Content>

                {showLoading ?
                    <ActivityIndicator animating={true} color={Colors.red800} />

                    :
                    <>
                        <Title style={styles.title}>{Symbol(e.unidad_medida)} {formatNumber(indicador[0].valor, 2)}</Title>
                        <DetailListChart valueLeft={'Nombre'} valueRight={e.nombre} />
                        <DetailListChart valueLeft={'Fecha'} valueRight={getHumanDate(indicador[0].fecha)} />
                        <DetailListChart valueLeft={'Unidad de Medida'} valueRight={e.unidad_medida} />

                        <View style={{ height: 200, flexDirection: 'row' }}>
                            <YAxis
                                data={data}
                                contentInset={contentInset}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={10}
                                formatLabel={(value) => `${Symbol(e.unidad_medida)} ${formatNumber(value, 0)}`}
                            />

                            <LineChart
                                style={{ flex: 1, marginLeft: 16 }}
                                data={data}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                                contentInset={contentInset}
                            >
                                <Grid />
                            </LineChart>

                        </View>

                    </>
                }


            </Card.Content>
        </Card>

    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 35,
        width: '100%',
        padding: 10
    }
});

export default Grafico