/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { getBranches } from '../../redux/actions/branchAction';
import PieChart from '../../common/pieChart/index';

const Top5BranchesChart = ({ startTime, endTime}) => {
    const [top5Branches, setTop5Branches] = useState();

    const dispatch = useDispatch()
    const { branches: branchList } = useSelector(({ branchReducer}) => branchReducer);

    useEffect(() => {
      dispatch(getBranches({ startTime, endTime}))
    }, [startTime, endTime])

    useEffect(() => {
      if(!branchList.length) return;
      const branchesWithPercentage = getItemWithPercentage(branchList)
      setTop5Branches(branchesWithPercentage)
    }, [branchList])

    const getItemWithPercentage = (data) => {
      const totalOrders = data.reduce((acc, curr) => {
          return acc + Number(curr.orders)
        }, 0)
      const itemsWithPercentage = data.map((item) => {
        return {
            label: item?.name,
            y: ((item?.orders*100)/totalOrders).toFixed(2),
        }
      })
      return itemsWithPercentage;
    }

    return (
        <>
          <PieChart data = { top5Branches}/>
        </>
    )
}

export default Top5BranchesChart;