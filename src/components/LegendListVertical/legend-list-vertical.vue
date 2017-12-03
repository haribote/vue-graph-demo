<template>
  <div class="legend-list">
    <ul>
      <li v-for="item in series" :key="item.id" v-if="item.isVisible">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <rect width="16" height="16" :fill="item.color" transform="translate(4 4)"></rect>
        </svg>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./legend-list-vertical.ts"></script>

<style scoped src="./legend-list-vertical.css"></style>
