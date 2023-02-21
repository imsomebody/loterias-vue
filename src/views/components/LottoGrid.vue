<template>
  <div class="t-flex t-flex-row t-flex-wrap">
    <span
      class="t-w-3/12 t-lg:w-2/12 t-flex t-justify-center t-py-2"
      v-for="num of profile.maximum"
    >
      <v-btn
        class="t-w-fit t-shrink-0 rounded"
        :color="(selected || []).includes(num) ? 'primary' : 'white'"
      >
        {{ num }}
      </v-btn>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { LotteryProfile } from "@/stores/data/lotery";

const props = defineProps<{
  profile: LotteryProfile;
  selected: number[];
}>();
</script>
