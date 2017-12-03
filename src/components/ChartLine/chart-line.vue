<template>
  <div class="chart-line">
    <svg :viewBox="viewBox" :width="svgWidth" :height="svgHeight">
      <g class="chart-line__y-step-line">
        <path v-for="line in yAxisLinePropsList" :key="line.y" :d="line.d" :transform="line.transform"></path>
      </g>
      <g class="chart-line__series-line" :transform="seriesLineTransform">
        <polyline v-for="line in seriesLinePropsList" :points="line.points"></polyline>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" src="./chart-line.ts"></script>

<style scoped src="./chart-line.css"></style>
