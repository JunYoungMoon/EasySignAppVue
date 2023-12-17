<script setup lang="ts">
import { ref } from 'vue';

import { languageDD } from '@/_mockApis/headerData';

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
  <!-- language DD -->
  <!-- ---------------------------------------------- -->
  <v-menu
    v-model="scrollDisabled"
    :close-on-content-click="false"
    location="bottom"
    @update:model-value="handleMenuInput"
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
