<script setup lang="ts">
import { ref, type Ref } from 'vue';

import { languageDD } from '@/_mockApis/headerData';

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
  <!-- language DD -->
  <!-- ---------------------------------------------- -->
  <v-menu
    v-model="scrollDisabled"
    :close-on-content-click="false"
    @update:model-value="handleScrollDisabled"
  >
    <template #activator="{ props }">
      <v-btn icon variant="text" color="primary" v-bind="props">
        <v-avatar size="22">
          <img
            v-if="$i18n.locale === 'en'"
            :src="languageDD[0].avatar"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
          <img
            v-if="$i18n.locale === 'kr'"
            :src="languageDD[1].avatar"
            :alt="$i18n.locale"
            width="22"
            height="22"
            class="obj-cover"
          />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="200" elevation="10">
      <v-list class="theme-list">
        <v-list-item
          v-for="(item, index) in languageDD"
          :key="index"
          active-color="primary"
          :active="$i18n.locale == item.value"
          class="d-flex align-center"
          @click="() => ($i18n.locale = item.value)"
        >
          <template #prepend>
            <v-avatar size="22">
              <img
                :src="item.avatar"
                :alt="item.avatar"
                width="22"
                height="22"
                class="obj-cover"
              />
            </v-avatar>
          </template>
          <v-list-item-title class="text-subtitle-1 font-weight-regular">
            {{ item.title }}
            <span class="text-disabled text-subtitle-1 pl-2">
              ({{ item.subtext }})
            </span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>
