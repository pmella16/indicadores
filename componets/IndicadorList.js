import React from 'react';
import { DataTable } from 'react-native-paper';

import { getHumanDate, formatNumber, Symbol } from '../Utils';

const IndicadorList = props => {

  let { fecha, valor, unidad_medida } = props.item;


  return (

    <DataTable.Row>
      <DataTable.Cell>{getHumanDate(fecha)}</DataTable.Cell>
      <DataTable.Cell numeric>{Symbol(unidad_medida)} {formatNumber(valor, 2)}</DataTable.Cell>
    </DataTable.Row>
  )
}


export default IndicadorList;