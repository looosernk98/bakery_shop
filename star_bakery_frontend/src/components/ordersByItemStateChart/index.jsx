/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import BarChart from '../../common/barChart/index'
import { getItems } from '../../redux/actions/itemAction';


const OrdersByItemStateChart = ({ startTime, endTime}) => {
    const [orderListByItemState, setOrderListByItemState] = useState();

    const dispatch = useDispatch();
    const { ordersByItemState } = useSelector(({ itemReducer }) => itemReducer );
    
    useEffect(() => {
        dispatch(getItems({ startTime, endTime}))
    }, [startTime, endTime])

    useEffect(() => {
      if(!ordersByItemState?.length) return ;
      const mappedValues = mapWithGraphDataPoints(ordersByItemState)
      setOrderListByItemState(mappedValues)
    }, [ordersByItemState])

    const mapWithGraphDataPoints = (data) => {
      return data.map(item => ({ label: item?.state, y: Number(item?.orders)}))
    }

    return (
        <>
          <BarChart
            data={orderListByItemState} 
            title='Orders Vs Item State'
            xAxisTitle={'Item State'}
            yAxisTitle={'No. of Orders'}
           />
        </>
    )
}

export default OrdersByItemStateChart