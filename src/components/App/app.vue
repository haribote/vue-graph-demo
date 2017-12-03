<template>
  <div id="app">
    <header class="container">
      <h1>Vue Graph Demo</h1>
      <p>Demos of graph that render by Vue.js without D3.js.</p>
    </header>

    <div class="container">
      <h2>Line chart</h2>
      <p>History of NPB's annual visitors.</p>
      <TabList :labels="lineChartTabLabels" @click-item="handleClickLineChartTabItem" />
      <ChartLine :series="lineChartHistoryList" :lines="lineChartPropsList" :xAxisLabels="lineChartXAxisLabelList" yAxisUnit="x 1000" />
    </div>

    <div class="container">
      <h2>Bar chart</h2>
      <p>Under constructing...</p>
    </div>

    <div class="container">
      <h2>Pie chart</h2>
      <p>Under constructing...</p>
    </div>

    <footer class="container">
      <p><a href="https://github.com/haribote/vue-graph-demo" target="_blank">Fork on GitHub</a></p>
    </footer>
  </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style src="./app.css"></style>
