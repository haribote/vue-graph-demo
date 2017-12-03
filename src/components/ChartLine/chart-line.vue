<template>
  <div class="chart-line">
    <svg :viewBox="viewBox" :width="svgWidth" :height="svgHeight">
      <g class="chart-line__y-step-line">
        <path v-for="line in yAxisLinePropsList" :key="line.y" :d="line.d" :transform="line.transform"></path>
      </g>
      <g :transform="seriesLineTransform">
        <g class="chart-line__series-line">
          <polyline v-for="line in seriesLinePropsList" :points="line.points"></polyline>
        </g>
        <g class="chart-line__series-dot">
          <g v-for="(series, i) in seriesDotPropsList" :key="i">
            <circle v-for="(dot, j) in series" :key="j" cx="0" cy="0" :transform="dot.transform"></circle>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" src="./chart-line.ts"></script>

<style scoped src="./chart-line.css"></style>
