import * as S from './styles.js'

const START = 'start';
// const END = 'end';

const DateTimeRangeSelector = ({
   setStartTime, 
   setEndTime,
   startTime,
   endTime,
}) => {

  const handleTimeChange = (e, key) => {
    if(key === START){
      setStartTime(new Date(e.target.value).toISOString());
    }else{
      setEndTime(new Date(e.target.value).toISOString());
    }
  }
  return (
    <>
      <S.DateTimeContainer>
       <S.DateTimeRangePicker>
        <S.Label>Select Start Time</S.Label>
         <input 
            type="datetime-local"
            id="start-time" 
            step="1" 
            // min={startTime.split('.')[0]}
            // max={endTime.split('.')[0]}
            value={startTime.split('.')[0]} 
            onChange={(e) => handleTimeChange(e,'start')}
          />
       </S.DateTimeRangePicker>
       <S.RangeDivider>To</S.RangeDivider>
       <S.DateTimeRangePicker>
        <S.Label>Select End Time</S.Label>
        <input
          type="datetime-local" 
          id="end-time" 
          step="1" 
          // min={startTime.split('.')[0]}
          // max={endTime.split('.')[0]}
          value={endTime.split('.')[0]}
          onChange={(e) => handleTimeChange(e, 'end')}
         />
       </S.DateTimeRangePicker>
    </S.DateTimeContainer>
    </>
  );
}

export default DateTimeRangeSelector;