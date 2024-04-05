import React from 'react';
import MonthlyBarChart from './MonthlyBarChart';
import { DonutChartPaymentType } from './DonutChartPaymentType';
// import MonthlyBarChart from './MonthlyBarChart';


export const Chart3 = () => {
  return (
    <div>
      {/* Monthly chart
      <MonthlyBarChart /> */}
      Donut chart
      <DonutChartPaymentType/>
    </div>
  );
};
