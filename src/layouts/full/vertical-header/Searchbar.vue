<script setup lang="ts">
import { ref } from 'vue';

import { SearchIcon } from 'vue-tabler-icons';

import { searchSugg } from '@/_mockApis/headerData';

const scrollDisabled = ref(false);
const handleMenuInput = (value: boolean) => {
  // 메뉴가 열릴 때 스크롤 비활성화
  if (value) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    // 메뉴가 닫힐 때 스크롤 활성화
    document.documentElement.style.overflow = 'auto';
  }
};
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- search1 -->
  <!-- ------------------------------------------------>
  <v-menu
    v-model="scrollDisabled"
    :close-on-content-click="false"
    @update:model-value="handleMenuInput"
  >
    <template #activator="{ props }">
      <v-btn
        icon
        class="custom-hover-primary"
        size="small"
        variant="text"
        color="primary"
        v-bind="props"
      >
        <SearchIcon stroke-width="1.5" size="20" />
      </v-btn>
    </template>
    <v-sheet width="360" elevation="10" rounded="md">
      <div class="d-flex align-center justify-space-between pa-5">
        <v-text-field
          placeholder="Search"
          color="primary"
          density="compact"
          variant="outlined"
          hide-details
        />
      </div>
      <v-divider />
      <h5 class="text-h5 mt-4 px-5 pb-4">Quick Page Links</h5>
      <perfect-scrollbar style="height: 380px">
        <v-list class="pt-0 pb-5" lines="two">
          <v-list-item
            v-for="(item, index) in searchSugg"
            :key="index"
            :value="item"
            :to="item.href"
            active-color="primary"
            class="px-5 py-2"
          >
            <h6 class="text-subtitle-1 font-weight-bold mb-1">
              {{ item.title }}
            </h6>
            <p class="text-subtitle-2 text-medium-emphasis">{{ item.href }}</p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
    </v-sheet>
  </v-menu>
</template>
