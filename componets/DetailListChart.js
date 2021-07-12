import React from 'react';
import { DataTable } from 'react-native-paper';


const DetailListChart = React.memo(
    (props) => {



    return (

        <DataTable.Row>
            <DataTable.Cell>{props.valueLeft}</DataTable.Cell>
            <DataTable.Cell>{props.valueRight}</DataTable.Cell>
        </DataTable.Row>
    )
})


export default DetailListChart;