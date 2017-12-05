<template>
  <div id="app">
    <header class="container">
      <h1>Vue Graph Demo</h1>
      <p>Demos of graph that render by Vue.js without D3.js.</p>
    </header>

    <div class="container">
      <h2>Line chart</h2>
      <p>History of NPB's annual visitors.</p>
      <TabList :labels="tabLabels" @click-item="handleClickLineChartTabItem" />
      <ChartLine :series="lineChartHistoryList" :lines="lineChartPropsList" :xAxisLabels="lineChartXAxisLabelList" yAxisUnit="x 1000" />
    </div>

    <div class="container">
      <h2>Bar chart</h2>
      <p>Annual visitors per team</p>
      <div class="comb-tab-select">
        <TabList :labels="tabLabels" @click-item="handleClickBarChartTabItem" />
        <p class="comb-tab-select__select">
          <span>Season: </span>
          <select v-model="barChartCurrentSeason">
            <option v-for="season in seasonOptionList" :key="season" :value="season">{{season}}</option>
          </select>
        </p>
      </div>
      <ChartBar :series="barChartCurrentSeasonList" :forcedMinValue="0" :lines="barChartPropsList" yAxisUnit="x 1000" />
    </div>

    <div class="container">
      <h2>Pie chart</h2>
      <p>Annual visitors per team</p>
      <div class="comb-tab-select">
        <TabList :labels="tabLabels" @click-item="handleClickPieChartTabItem" />
        <p class="comb-tab-select__select">
          <span>Season: </span>
          <select v-model="pieChartCurrentSeason">
            <option v-for="season in seasonOptionList" :key="season" :value="season">{{season}}</option>
          </select>
        </p>
      </div>
      <ChartPie :series="pieChartCurrentSeasonList" :pies="pipeChartPropsList" />
    </div>

    <footer class="container">
      <p><a href="https://github.com/haribote/vue-graph-demo" target="_blank">Fork on GitHub</a></p>
    </footer>
  </div>
</template>

<script lang="ts" src="./app.ts"></script>

<style src="./app.css"></style>
