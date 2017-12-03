<template>
  <div class="chart-bar">
    <p class="chart-bar__unit">{{yAxisUnit}}</p>
    <svg :viewBox="viewBox" :width="svgWidth" :height="svgHeight">
      <g class="chart-bar__y-step-line">
        <path v-for="line in yAxisLinePropsList" :key="line.y" :d="line.d" :transform="line.transform"></path>
      </g>
      <g class="chart-bar__y-label">
        <g :transform="yAxisLabelTransform">
          <text x="0" y="0" v-for="label in yAxisLabelPropsList" :key="label.value" :transform="label.transform">{{label.value}}</text>
        </g>
      </g>
      <g :transform="seriesLineTransform">
        <g class="chart-bar__series-bar">
          <path v-for="(line, i) in seriesLinePropsList" :key="i" :d="line.d" :stroke="line.color" :transform="line.transform"></path>
        </g>
      </g>
      <g class="chart-bar__x-label">
        <g :transform="seriesLineTransform">
          <text x="0" y="0" v-for="label in xAxisLabelPropsList" :key="label.value" :transform="label.transform">{{label.value}}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" src="./chart-bar.ts"></script>

<style scoped src="./chart-bar.css"></style>
