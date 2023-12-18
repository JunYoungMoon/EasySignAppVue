<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { SearchIcon } from 'vue-tabler-icons';

import { searchSugg } from '@/_mockApis/headerData';

/** State property to control scrolling */
const scrollDisabled: Ref<boolean> = ref(false);

/**
 * Function to handle scrolling behavior based on the provided boolean value.
 * @param v - A boolean value indicating whether scrolling should be disabled or enabled.
 *            When true, scrolling is disabled; when false, scrolling is enabled.
 */
const handleScrollDisabled = (v: boolean): void => {
  // Disable scrolling when the menu opens
  if (v) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    // Enable scrolling when the menu is closed
    document.documentElement.style.overflow = 'auto';
  }
};
</script>
<template>
  <!-- ---------------------------------------------- -->
  <!-- Searchbar -->
  <!-- ------------------------------------------------>
  <v-menu
    v-model="scrollDisabled"
    :close-on-content-click="false"
    @update:model-value="handleScrollDisabled"
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
