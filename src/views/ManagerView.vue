<template>
  <header
    class="t-flex t-flex-row t-gap-4 t-items-center t-h-fit t-w-full"
    v-if="lotto"
  >
    <img :src="lotto.icon" style="max-width: 37px; max-height: 37px" />
    <h4 class="text-h5" :class="[`text-${lotto.id}`]">{{ lotto.name }}</h4>

    <span class="t-ml-auto">
      <v-btn color="primary" @click="generate"> NOVO JOGO </v-btn>
    </span>
  </header>
  <v-expansion-panels variant="accordion" v-if="lotto">
    <v-expansion-panel title="Descrição">
      <v-expansion-panel-text>
        <div
          class="t-flex t-flex-col t-flex-wrap t-gap-1"
          v-html="lotto.profile.description"
        ></div>
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel title="Configuração da Aposta">
      <v-expansion-panel-text>
        <div class="field">
          <label>Quantidade de Números na Aposta</label>
          <v-text-field
            v-model="betSize"
            hide-details
            single-line
            type="number"
            :min="lotto.profile.minBetSize"
            :max="lotto.profile.maxBetSize"
            :disabled="lotto.profile.minBetSize === lotto.profile.maxBetSize"
          />
        </div>
        <div class="field mt-3">
          <label>Algorítmo</label>
          <v-radio-group v-model="algorithm">
            <v-radio label="Pseudoaleatório" value="random"></v-radio>
            <v-radio disabled label="Redução" value="reduce-games"></v-radio>
          </v-radio-group>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div v-if="generatedScheme.length && lotto" class="t-flex t-flex-col t-gap-1">
    <h4 class="text-h5">Desdobramento</h4>
    <div class="t-flex t-flex-row t-gap-0.5 t-flex-wrap">
      <template v-for="(num, i) in sortBy(generatedScheme)" :key="i">
        <span class="t-font-bold">{{ num }}</span>
        <span v-if="generatedScheme[i + 1]">-</span>
      </template>
    </div>
  </div>
  <div class="t-flex t-flex-col" v-if="lotto">
    <LottoGrid :selected="generatedScheme" :profile="lotto.profile" />
  </div>
</template>

<script setup lang="ts">
import type { Lottery } from "@/stores/data/lotery";
import { useManagerStore } from "@/stores/manager";
import { useRouter } from "vue-router";
import { computed, ref, onBeforeMount } from "vue";
import { createGame } from "@/stores/data/lotery";
import { sortBy } from "lodash";

import LottoGrid from "./components/LottoGrid.vue";

const router = useRouter();
const managerStore = useManagerStore();
const lotto = computed(() => managerStore.selected as Lottery);

const betSize = ref(lotto.value?.profile.minBetSize);
const generatedScheme = ref([] as number[]);
const algorithm = ref("random");

function generate() {
  generatedScheme.value = createGame(lotto.value.profile, betSize.value);
}

onBeforeMount(async () => {
  if (!lotto.value) {
    router.push({
      name: "home",
    });
  }
});
</script>
