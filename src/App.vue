<template>
  <v-layout style="min-height: 100vh; max-height: 100vh">
    <v-app-bar title="Gerenciador de Apostas"></v-app-bar>

    <v-main class="t-flex">
      <v-container fluid class="t-grow-1 t-flex t-flex-col t-gap-4">
        <RouterView />
      </v-container>
    </v-main>

    <v-footer v-if="false" class="t-bottom-0 t-w-full t-static">
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          Copyright &copy; {{ new Date().getFullYear() }} —
          <strong>Davi Viana</strong>
        </v-col>
        <v-col class="text-center mt-1" cols="12">
          <a href="#" class="t-text-blue-300">Como os números são decididos?</a>
        </v-col>
      </v-row>
    </v-footer>
  </v-layout>
</template>
