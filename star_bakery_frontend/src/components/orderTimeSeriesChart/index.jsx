/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import MultiSeriesChart from '../../common/multiSeriesChart';
import { getOrdersByTimePeriod } from '../../redux/actions/orderAction';

const OrderTimeSeriesChart = ({ startTime, endTime}) => {
  const [ordersByTimePeriodData, setOrdersByTimePeriodData] = useState();
  const [filterType, setFilterType] = useState('hour');
  const dispatch = useDispatch();
  const { orderListByTimePeriod } = useSelector(({ orderReducer}) => orderReducer);

  useEffect(() => {
    dispatch(getOrdersByTimePeriod({ startTime, endTime, filterType}))
  }, [filterType, startTime, endTime])
  
  useEffect(() => {
    if(!Object.keys(orderListByTimePeriod).length) return;
    let mappedValues = getChartMappedValues(orderListByTimePeriod)
    setOrdersByTimePeriodData(mappedValues)
  }, [orderListByTimePeriod])

  const getChartMappedValues = (data) => {
      const ordersData = {
        orders: data?.orders.map((item) => ({ x: Number(item[filterType]), y: Number(item?.order)})),
        prices: data?.price.map((item) => ({ x: Number(item[filterType]), y: Number(item?.sum)})),
      }
      return ordersData;
  }
  return(
    <>
     <MultiSeriesChart
        data1 = {ordersByTimePeriodData?.orders} 
        data2= {ordersByTimePeriodData?.prices}
        setFilterType={setFilterType}
      />
    </>
  )
}

export default OrderTimeSeriesChart;