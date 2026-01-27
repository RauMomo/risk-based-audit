<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 tracking-wide">
          {{ t("dashboard.title") }}
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="text-center">
            <h2 class="text-2xl font-semibold text-neutral-700 mb-4">
              Welcome to Risk-Based Internal Audit System
            </h2>
            <p class="text-neutral-700 mb-8">
              Enterprise Risk Management and Internal Audit Platform
            </p>

            <div
              class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8"
            >
              <div v-for="(item, index) in menuList" :key="index">
                <UCard variant="outline">
                  <template #header>
                    <div></div>
                  </template>
                  <div class="flex items-center">
                    <div class="shrink-0">
                      <UIcon
                        :name="item.icon"
                        class="text-primary-500 size-8"
                      ></UIcon>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="card-title text-primary-800">
                          {{ item.name }}
                        </dt>
                        <dd class="card-description text-primary-800">
                          {{ item.description }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <template #footer>
                    <div class="px-5 py-3">
                      <div class="text-sm">
                        <a
                          :href="item.href"
                          class="font-medium text-primary-500 hover:text-primary-500"
                        >
                          View more
                        </a>
                      </div>
                    </div>
                  </template>
                </UCard>
              </div>
              <!-- Feature cards will go here
              <div class="bg-secondary-100 overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <UIcon name="charter" class="text-primary-500" size="32">
                      </UIcon>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          Audit Charter
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900">
                          Manage audit mandate and charter
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div class="px-5 py-3">
                  <div class="text-sm">
                    <a
                      href="/audit-charter"
                      class="font-medium text-primary-500 hover:text-primary-500"
                    >
                      View more
                    </a>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "~/composables/useI18n";
import { MenuList } from "./menu";

definePageMeta({
  middleware: "auth",
});

const { t } = useI18n();

const menuList = ref(MenuList);
</script>
