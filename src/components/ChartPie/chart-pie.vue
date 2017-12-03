<template>
  <div class="chart-pie">
    <svg :viewBox="viewBox" :width="svgWidth" :height="svgHeight">
      <g class="chart-pie__series-pie">
        <path v-for="(pie, i) in seriesPiePropsList" :key="i" :d="pie.d" :stroke="pie.color" :transform="pie.transform"></path>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" src="./chart-pie.ts"></script>

<style scoped src="./chart-pie.css"></style>
