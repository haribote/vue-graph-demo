<template>
  <div class="tab-list">
    <ul>
      <li v-for="(label, index) in labels" :key="label" :class="{ 'is-current': index === current }">
        <a href="#" @click.prevent="handleClickItem(index)">{{label}}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./tab-list.ts"></script>

<style scoped src="./tab-list.css"></style>
