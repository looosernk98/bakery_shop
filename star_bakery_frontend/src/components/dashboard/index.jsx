import React, { useState, Fragment } from 'react';

import DateTimeRangeSelector from '../../common/filters/date-time-range'
import Top5BranchesChart from '../top5BranchesChart/index'
import OrdersByItemTypeChart from '../ordersByItemTypeChart';
import OrdersByItemStateChart from '../ordersByItemStateChart';
import OrderTimeSeriesChart from '../orderTimeSeriesChart/index'
import * as S from './styles'

const DEFAULT_START_TIME = '2024-01-01';
const DEFAULT_END_TIME = '2024-01-30';

const Dashboard = () => {
    const [startTime, setStartTime] = useState(new Date(DEFAULT_START_TIME).toISOString());
    const [endTime, setEndTime] = useState(new Date(DEFAULT_END_TIME).toISOString());

    return(
        <Fragment>
            <h1>Dashboard</h1>
             <DateTimeRangeSelector
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
             />
            <S.MainContainer>
                <S.ChartWrapper>
                   <Top5BranchesChart startTime={startTime} endTime={endTime}/>
                </S.ChartWrapper>
                <S.ChartWrapper>
                    <OrdersByItemTypeChart startTime={startTime} endTime={endTime}/>
                </S.ChartWrapper>
                <S.ChartWrapper>
                    <OrdersByItemStateChart startTime={startTime} endTime={endTime}/>
                </S.ChartWrapper>
                <S.ChartWrapper>
                    <OrderTimeSeriesChart startTime={startTime} endTime={endTime}/>
                </S.ChartWrapper>
            </S.MainContainer>
        </Fragment>
    )
}

export default Dashboard;