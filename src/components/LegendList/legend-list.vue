<template>
  <div class="legend-list">
    <ul>
      <li v-for="item in series" :key="item.id" v-if="item.isVisible">
        <svg viewBox="0 0 32 24" width="32" height="24">
          <path d="M0,12.5 H32" :stroke="item.color"></path>
        </svg>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./legend-list.ts"></script>

<style scoped src="./legend-list.css"></style>
