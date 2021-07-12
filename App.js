import React from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios'
import Indicador from './componets/Indicador';
import Geolocation from '@react-native-community/geolocation';
import { ActivityIndicator, Colors } from 'react-native-paper';
const App = ({navigation}) => {

  const [showLoading, setShowLoading] = React.useState(true);
  const [indicadores, setIndicadores] = React.useState([]);

  const goDetails = (item) => {
   navigation.navigate('Detalle', { indicador: item });
  }

  const goChart = (item) => {
   navigation.navigate('Grafico', { indicador: item });
  }

  React.useEffect(() => {

    let res = [];

    axios.get('https://mindicador.cl/api')
      .then(function (response) {
        let data = response.data;
        res.push(data.bitcoin);
        res.push(data.tasa_desempleo);
        res.push(data.libra_cobre);
        res.push(data.tpm);
        res.push(data.imacec);
        res.push(data.utm);
        res.push(data.ipc);
        res.push(data.euro);
        res.push(data.dolar_intercambio);
        res.push(data.dolar);
        res.push(data.ivp);
        res.push(data.uf);
        setShowLoading(false);
        setIndicadores(res);

      })
      .catch(function (error) {
        console.log(error);
      });

      Geolocation.getCurrentPosition(info => console.log(info));
      
  }, []);

  return (
  <>
    { showLoading ?
      <ActivityIndicator animating={true} color={Colors.red800} />
      
      :

        <FlatList

          data={indicadores}
          renderItem={({ item }) => {
            return <Indicador key={item.key} nombre={item.nombre} unidad={item.unidad_medida} goDetails={() => goDetails(item)} goChart={() => goChart(item)} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
    }
    
 </>
  );
};

const styles = StyleSheet.create({

});

export default App;
