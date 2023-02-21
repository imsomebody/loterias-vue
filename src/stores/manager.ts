import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Lottery } from "./data/lotery";

export const useManagerStore = defineStore("managers", () => {
  const selected = ref(null as null | Lottery);

  return { selected };
});
