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
} from "recharts";
import Swal from "sweetalert2";
import { generalQuery } from "../../api/Api";
import {
  CustomResponsiveContainer,
  nFormatter,
} from "../../api/GlobalFunction";
import { CS_CONFIRM_TRENDING_DATA, DailyData } from "../../api/GlobalInterface";
const CSDailyConfirm = ({
  dldata,
  processColor,
  materialColor,
}: { dldata: CS_CONFIRM_TRENDING_DATA[], processColor: string, materialColor: string }) => {
  const formatCash = (n: number) => {
    return nFormatter(n, 1);
  };
  const labelFormatter = (value: number) => {
    return formatCash(value);
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
        <div
          className='custom-tooltip'
          style={{
            backgroundImage: "linear-gradient(to right, #ccffff, #00cccc)",
            padding: 20,
            borderRadius: 5,
          }}
        >
          <p>Ngày {label}:</p>
          <p className='label'>
            CMS: {`${payload[1].value.toLocaleString("en-US")}`} issues
          </p>
          <p className='label'>
            CUSTOMER: {`${payload[2].value.toLocaleString("en-US")}`} issues
          </p>
          <p className='label'>
            TOTAL: {`${payload[0].value.toLocaleString("en-US")}`} issues
          </p>
        </div>
      );
    }
    return null;
  };
  useEffect(() => { }, []);
  return (
    <CustomResponsiveContainer>
      <ComposedChart
        width={500}
        height={300}
        data={dldata}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' className='chartGrid' />
        <XAxis dataKey='CONFIRM_DATE' height={40} tick={{ fontSize: '0.7rem' }}>
          <Label value='Ngày tháng' offset={0} position='insideBottom' style={{ fontWeight: 'normal', fontSize: '0.7rem' }} />
        </XAxis>
        <YAxis
          yAxisId='left-axis'
          label={{
            value: "NG Rate",
            angle: -90,
            position: "insideLeft",
            fontSize: '0.7rem'
          }}
          tick={{ fontSize: '0.7rem' }}
          tickFormatter={(value) =>
            new Intl.NumberFormat("en", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value)
          }
          tickCount={7}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          align="center"
          iconSize={15}
          iconType="diamond"
          formatter={(value, entry) => (
            <span style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>{value}</span>
          )} />
        <Line
          yAxisId='left-axis'
          type='monotone'
          dataKey='TOTAL'
          stroke='green'
          label={{ position: "top", formatter: labelFormatter, fontSize: '0.7rem', fontWeight: 'bold', color: 'black' }}
        />
        <Bar
          stackId='a'
          yAxisId='left-axis'
          type='monotone'
          dataKey='C'
          stroke='white'
          fill={processColor}
        /* label={{ position: "insideTop", formatter: labelFormatter, fontSize:'0.7rem', fontWeight:'bold', color:'black' }}     */
        >
          <LabelList dataKey="C" position="inside" formatter={labelFormatter} fontSize={"0.7rem"} />
        </Bar>
        <Bar
          stackId='a'
          yAxisId='left-axis'
          type='monotone'
          dataKey='K'
          stroke='white'
          fill={materialColor}
        /* label={{ position: "insideTop", formatter: labelFormatter,fontSize:'0.7rem', fontWeight:'bold', color:'black' }}    */
        >
          <LabelList dataKey="K" position="inside" formatter={labelFormatter} fontSize={"0.7rem"} />
        </Bar>
      </ComposedChart>
    </CustomResponsiveContainer>
  );
};
export default CSDailyConfirm;
