<script setup>
import { ref } from 'vue';
import HeartIcon from './HeartIcon.vue';
import SpinnerIcon from './SpinnerIcon.vue';

// Determines if the button is in the default/liked state.
const liked = ref(false);
// Whether there's a pending background API request.
const isPending = ref(false);
// Error message to be shown if the API request failed.
const errorMessage = ref(null);

async function likeUnlikeAction() {
  try {
    isPending.value = true;
    errorMessage.value = null;

    const response = await fetch(
      'https://questions.greatfrontend.com/api/questions/like-button',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: liked.value ? 'unlike' : 'like',
        }),
      },
    );

    if (!response.ok) {
      const res = await response.json();
      errorMessage.value = res.message;
      return;
    }

    liked.value = !liked.value;
  } finally {
    isPending.value = false;
  }
}
</script>

<template>
  <div class="button-container">
    <button
      :class="[
        'like-button',
        liked
          ? 'like-button--liked'
          : 'like-button--default',
      ]"
      :disabled="isPending"
      @click="likeUnlikeAction">
      <SpinnerIcon v-if="isPending" />
      <HeartIcon v-else />
      {{ liked ? 'Liked' : 'Like' }}
    </button>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style>
.error-message {
  font-size: 12px;
  margin-top: 8px;
}

.like-button {
  --default-color: #888;
  --active-color: red;

  align-items: center;
  border-style: solid;
  border-radius: 32px;
  border-width: 2px;
  display: flex;
  cursor: pointer;
  font-weight: bold;
  gap: 8px;
  height: 32px;
  padding: 4px 8px;
}

.like-button--default {
  background-color: #fff;
  border-color: var(--default-color);
  color: var(--default-color);
}

.like-button:hover {
  border-color: var(--active-color);
  color: var(--active-color);
}

.like-button--liked,
.like-button--liked:hover {
  background-color: var(--active-color);
  border-color: var(--active-color);
  color: #fff;
}
</style>
