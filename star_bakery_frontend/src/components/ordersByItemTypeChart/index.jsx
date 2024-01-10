/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import BarChart from '../../common/barChart/index'
import { getOrders } from '../../redux/actions/orderAction';

const OrdersByItemTypeChart = ({ startTime, endTime}) => {
    const [itemOrdersList, setItemOrdersList] = useState();

    const dispatch = useDispatch();
    const { ordersByItem } = useSelector(({ orderReducer }) => orderReducer );
    
    useEffect(() => {
        dispatch(getOrders({ startTime, endTime}))
    }, [startTime, endTime])

    useEffect(() => {
      if(!ordersByItem.length) return ;
      const mappedValues = mapWithGraphDataPoints(ordersByItem)
      setItemOrdersList(mappedValues)
    }, [ordersByItem])

    const mapWithGraphDataPoints = (data) => {
      return data.map(item => ({ label: item?.name, y: Number(item?.total)}))
    }

    return (
        <>
          <BarChart 
            data={itemOrdersList} 
            title='Orders Divided by Each Item Type'
            xAxisTitle={'Item type'}
            yAxisTitle={'No. of Orders'}
           />
        </>
    )
}

export default OrdersByItemTypeChart