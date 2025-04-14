<script setup>
const props = defineProps({
  url: String,
  title: String,
  by: String,
  time: Number,
});
</script>

<template>
  <div class="post" role="listitem">
    <h2 class="post__title">
      <a
        v-if="props.url"
        :href="props.url"
        target="_blank"
        rel="noopener">
        {{ props.title }}
      </a>
      <span v-if="!props.url">{{ props.title }}</span>
    </h2>
    <p class="post__metadata">
      By {{ props.by }} &middot;{{ ' ' }}
      {{ new Date(time * 1000).toLocaleString() }}
    </p>
  </div>
</template>

<style>
.post {
  background-color: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 16px;
  display: grid;
  row-gap: 8px;
}

.post__title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
}

.post__metadata {
  font-size: 14px;
  color: #444;
}
</style>
