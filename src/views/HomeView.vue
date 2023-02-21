<template>
  <section class="t-flex t-flex-col t-gap-3 t-grow-1">
    <header>
      <p>
        Utilize essa ferramenta para gerar apostas prontas para as principais
        Loterias.
      </p>
      <p class="t-font-bold mt-3">Selecione a Loteria desejada:</p>
    </header>
    <v-list>
      <v-list-subheader>
        <a
          href="https://www.loteriasonline.caixa.gov.br/silce-web/#/termos-de-uso"
          >Caixa Econômica Federal</a
        >
      </v-list-subheader>

      <v-list-item
        v-for="(item, i) in getLottos"
        :key="i"
        :value="item"
        :disabled="working"
        active-color="primary"
        @click="selectLotto(item)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon" v-if="!item.iconType"></v-icon>
          <img style="max-width: 23px" :src="item.icon" v-else />
        </template>

        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item>
    </v-list>
    <v-row class="t-mt-auto t-grow-0">
      <v-col class="t-flex" cols="12">
        <v-btn
          :disabled="working || !managerStore.selected"
          @click="send()"
          color="primary"
          class="t-ml-auto"
          >Criar</v-btn
        >
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { useManagerStore } from "@/stores/manager";
import { useRouter } from "vue-router";

import { lotteries, type Lottery } from "@/stores/data/lotery";
import { computed, ref, unref } from "vue";

const router = useRouter();
const managerStore = useManagerStore();
const getLottos = computed(() => lotteries);

const working = ref(false);

function selectLotto(value: Lottery) {
  if (unref(managerStore.selected)?.name === value.name) {
    managerStore.selected = null;
    return;
  }

  managerStore.selected = value;
}

function send(delay = 910) {
  working.value = true;

  setTimeout(() => {
    router.push({
      name: "manager",
    });

    working.value = false;
  }, delay);
}
</script>

<style>
.v-list-item__prepend {
  margin-right: 0.8rem !important;
}
</style>
