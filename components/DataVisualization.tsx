import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Svg, { Path, Rect, Line, Circle } from 'react-native-svg';
import { colors, typography, spacing, borderRadius, shadows } from '@/utils/theme';
import { weeklyHealthData } from '@/utils/mockData';
import * as shape from 'd3-shape';

interface DataVisualizationProps {
  data: {
    days: string[];
    heartRate: number[];
    steps: number[];
    calories: number[];
    sleep: number[];
    water: number[];
    stress: number[];
  };
  selectedMetric: 'heartRate' | 'steps' | 'calories' | 'sleep' | 'water' | 'stress';
  title: string;
  subtitle?: string;
}

export default function DataVisualization({
  data = weeklyHealthData,
  selectedMetric = 'heartRate',
  title,
  subtitle,
}: DataVisualizationProps) {
  const metricData = data[selectedMetric];
  const days = data.days;
  
  // Define chart dimensions
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - spacing.md * 2 - spacing.md * 2; // Account for container padding and card padding
  const chartHeight = 180;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 20;
  const availableWidth = chartWidth - paddingLeft;
  const availableHeight = chartHeight - paddingBottom - paddingTop;
  
  // Calculate scales
  const barWidth = (availableWidth / metricData.length) * 0.6;
  const barSpacing = (availableWidth / metricData.length) - barWidth;
  
  // Calculate the max value for the y-axis scale
  const maxValue = Math.max(...metricData) * 1.2; // Add 20% padding on top
  
  // Get color based on metric
  const getMetricColor = () => {
    switch (selectedMetric) {
      case 'heartRate':
        return colors.error[500];
      case 'steps':
        return colors.secondary[500];
      case 'calories':
        return colors.warning[500];
      case 'sleep':
        return colors.accent[500];
      case 'water':
        return colors.primary[500];
      case 'stress':
        return colors.error[400];
      default:
        return colors.primary[500];
    }
  };
  
  // Get label for the y-axis based on metric
  const getYAxisLabel = () => {
    switch (selectedMetric) {
      case 'heartRate':
        return 'BPM';
      case 'steps':
        return 'Steps';
      case 'calories':
        return 'Cal';
      case 'sleep':
        return 'Hours';
      case 'water':
        return 'Liters';
      case 'stress':
        return 'Level';
      default:
        return '';
    }
  };
  
  // Generate line path using d3-shape
  const generateLinePath = () => {
    const line = shape
      .line()
      .x((d, i) => paddingLeft + i * (barWidth + barSpacing) + barWidth / 2)
      .y((d) => paddingTop + availableHeight - (d / maxValue) * availableHeight)
      .curve(shape.curveCatmullRom.alpha(0.5));
    
    return line(metricData as any);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Y-axis */}
          <Line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + availableHeight}
            stroke={colors.neutral[300]}
            strokeWidth={1}
          />
          
          {/* X-axis */}
          <Line
            x1={paddingLeft}
            y1={paddingTop + availableHeight}
            x2={chartWidth}
            y2={paddingTop + availableHeight}
            stroke={colors.neutral[300]}
            strokeWidth={1}
          />
          
          {/* Y-axis grid lines and labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
            const y = paddingTop + availableHeight - tick * availableHeight;
            const label = Math.round(maxValue * tick);
            
            return (
              <React.Fragment key={i}>
                <Line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke={colors.neutral[200]}
                  strokeWidth={1}
                  strokeDasharray="4,4"
                />
                <Text
                  x={paddingLeft - 5}
                  y={y}
                  fontSize={10}
                  textAnchor="end"
                  fill={colors.neutral[500]}
                >
                  {label}
                </Text>
              </React.Fragment>
            );
          })}
          
          {/* Draw bars */}
          {metricData.map((value, i) => {
            const x = paddingLeft + i * (barWidth + barSpacing);
            const y = paddingTop + availableHeight - (value / maxValue) * availableHeight;
            const height = (value / maxValue) * availableHeight;
            
            return (
              <Rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={height}
                fill={getMetricColor() + '80'} // Add transparency
                rx={4}
              />
            );
          })}
          
          {/* Draw line */}
          <Path
            d={generateLinePath() || ''}
            stroke={getMetricColor()}
            strokeWidth={3}
            fill="none"
          />
          
          {/* Draw data points */}
          {metricData.map((value, i) => {
            const x = paddingLeft + i * (barWidth + barSpacing) + barWidth / 2;
            const y = paddingTop + availableHeight - (value / maxValue) * availableHeight;
            
            return (
              <Circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill={colors.white}
                stroke={getMetricColor()}
                strokeWidth={2}
              />
            );
          })}
          
          {/* X-axis labels */}
          {days.map((day, i) => {
            const x = paddingLeft + i * (barWidth + barSpacing) + barWidth / 2;
            
            return (
              <Text
                key={i}
                x={x}
                y={paddingTop + availableHeight + 15}
                fontSize={10}
                textAnchor="middle"
                fill={colors.neutral[500]}
              >
                {day}
              </Text>
            );
          })}
          
          {/* Y-axis label */}
          <Text
            x={10}
            y={paddingTop + availableHeight / 2}
            fontSize={10}
            textAnchor="middle"
            fill={colors.neutral[500]}
            rotation={-90}
            originX={10}
            originY={paddingTop + availableHeight / 2}
          >
            {getYAxisLabel()}
          </Text>
        </Svg>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricsScrollContainer}
      >
        <MetricButton
          label="Heart Rate"
          value={`${Math.round(
            metricData.reduce((acc, val) => acc + val, 0) / metricData.length
          )} BPM`}
          active={selectedMetric === 'heartRate'}
          color={colors.error[500]}
        />
        <MetricButton
          label="Steps"
          value={`${Math.round(
            metricData.reduce((acc, val) => acc + val, 0) / metricData.length
          ).toLocaleString()}`}
          active={selectedMetric === 'steps'}
          color={colors.secondary[500]}
        />
        <MetricButton
          label="Calories"
          value={`${Math.round(
            metricData.reduce((acc, val) => acc + val, 0) / metricData.length
          ).toLocaleString()}`}
          active={selectedMetric === 'calories'}
          color={colors.warning[500]}
        />
        <MetricButton
          label="Sleep"
          value={`${(
            metricData.reduce((acc, val) => acc + val, 0) / metricData.length
          ).toFixed(1)} h`}
          active={selectedMetric === 'sleep'}
          color={colors.accent[500]}
        />
      </ScrollView>
    </View>
  );
}

interface MetricButtonProps {
  label: string;
  value: string;
  active: boolean;
  color: string;
  onPress?: () => void;
}

function MetricButton({ label, value, active, color, onPress }: MetricButtonProps) {
  return (
    <View 
      style={[
        styles.metricButton, 
        active && { backgroundColor: color + '15', borderColor: color }
      ]}
    >
      <Text style={[styles.metricButtonLabel, active && { color }]}>{label}</Text>
      <Text style={[styles.metricButtonValue, active && { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...shadows.md,
    marginBottom: spacing.md,
  },
  headerContainer: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    marginTop: spacing.xs / 2,
  },
  chartContainer: {
    marginBottom: spacing.md,
  },
  metricsScrollContainer: {
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  metricButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    minWidth: 100,
  },
  metricButtonLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[500],
    marginBottom: spacing.xs / 2,
  },
  metricButtonValue: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
});