import moment from "moment";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Label,
  LabelList,
  Line,
  PieChart,
  Pie,
} from "recharts";

import Swal from "sweetalert2";
import { generalQuery, getGlobalSetting } from "../../api/Api";
import { CustomResponsiveContainer, nFormatter } from "../../api/GlobalFunction";
import { CS_CONFIRM_BY_CUSTOMER_DATA, CUSTOMER_REVENUE_DATA, WEB_SETTING_DATA, WeeklyClosingData } from "../../api/GlobalInterface";

const CSIssueChart = ({data}: {data: CS_CONFIRM_BY_CUSTOMER_DATA[]}) => { 
    const formatCash = (n: number) => {  
     return nFormatter(n, 2) + ((getGlobalSetting()?.filter((ele: WEB_SETTING_DATA, index: number)=> ele.ITEM_NAME==='CURRENCY')[0]?.CURRENT_VALUE ?? "USD") === 'USD'?  " $": " đ");
   };
  const labelFormatter = (value: number) => {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
    }).format(value);
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: any;
    payload?: any;
    label?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${payload[0].value.toLocaleString("en-US", {
            style: "decimal",            
          })}`} issue</p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }: {
    cx?: any;
    cy?: any;
    midAngle?: any;
    innerRadius?: any;
    outerRadius?: any;
    value?: any;
    index?: any;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = 20 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill='#8884d8'
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline='central'
        fontSize={'0.9rem'}
      >
        {data[index].CUST_NAME_KD} : (
        {value.toLocaleString("en-US", {
          style: "decimal",
        })}
        -issue
        )
      </text>
    );
  };


  
  useEffect(() => {
    
  }, []);
  const COLORS = [
    "#cc0000",
    "#cc3300",
    "#cc6600",
    "#cc9900",
    "#cccc00",
    "#99cc00",
    "#66cc00",
    "#33cc00",
    "#00cc00",
    "#00cc33",
    "#00cc66",
    "#00cc99",
    "#00cccc",
    "#0099cc",
    "#0066cc",
    "#0033cc",
    "#0000cc",
    "#3300cc",
    "#6600cc",
    "#9900cc",
    "#cc00cc",
    "#cc0099",
    "#cc0066",
    "#cc0033",
    "#cc0000",
  ];
  return (
    <CustomResponsiveContainer>
      <PieChart width={900} height={900}>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
        verticalAlign="top"
        align="center"
        iconSize={15}
        iconType="diamond"
        formatter={(value, entry) => (
          <span style={{fontSize:'0.7rem', fontWeight:'bold'}}>{value}</span>
        )}
        height={10}
        />
        <Pie
          dataKey='TOTAL'
          nameKey='CUST_NAME_KD'
          isAnimationActive={false}
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={150}
          fill='#8884d8'
          label={CustomLabel}          
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[((2 * index) % COLORS.length) * 2]}
            />
          ))}
        </Pie>
      </PieChart>
    </CustomResponsiveContainer>
  );
};
export default CSIssueChart;
