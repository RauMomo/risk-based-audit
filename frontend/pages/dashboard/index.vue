<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <UCard variant="soft">
      <template #header>
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ t("dashboard.title") }}
          </h1>
          <p class="text-sm text-gray-600">
            Enterprise Risk Management and Internal Audit Platform
          </p>
        </div>
      </template>
    </UCard>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <UCard variant="outline" class="relative overflow-hidden">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Risks</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div class="rounded-lg bg-primary-100 p-3">
              <UIcon name="info" class="text-primary-600 size-6" />
            </div>
          </div>
        </template>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-green-600">↑ 12%</span>
          <span class="text-gray-500">from last month</span>
        </div>
      </UCard>

      <UCard variant="outline">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">High Risk</p>
              <p class="text-3xl font-bold text-red-600 mt-1">5</p>
            </div>
            <div class="rounded-lg bg-red-100 p-3">
              <UIcon name="warning" class="text-red-600 size-6" />
            </div>
          </div>
        </template>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-red-600">↑ 3</span>
          <span class="text-gray-500">requires attention</span>
        </div>
      </UCard>

      <UCard variant="outline">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Audit Plans</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div class="rounded-lg bg-blue-100 p-3">
              <UIcon name="plan" class="text-blue-600 size-6" />
            </div>
          </div>
        </template>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-blue-600">2 active</span>
          <span class="text-gray-500">this quarter</span>
        </div>
      </UCard>

      <UCard variant="outline">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-3xl font-bold text-green-600 mt-1">15</p>
            </div>
            <div class="rounded-lg bg-green-100 p-3">
              <UIcon name="check" class="text-green-600 size-6" />
            </div>
          </div>
        </template>
        <div class="flex items-center gap-2 text-sm">
          <span class="text-green-600">↑ 8</span>
          <span class="text-gray-500">this month</span>
        </div>
      </UCard>
    </div>

    <!-- Quick Actions Menu -->
    <UCard variant="soft">
      <template #header>
        <div class="flex flex-col gap-1">
          <h2 class="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <p class="text-sm text-gray-600">
            Access key modules and features
          </p>
        </div>
      </template>
      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div v-for="(item, index) in menuList" :key="index">
          <NuxtLink :to="item.href">
            <UCard
              variant="outline"
              class="hover:shadow-lg transition-all duration-200 hover:border-primary-400 cursor-pointer group"
            >
              <div class="flex items-center gap-4">
                <div
                  class="rounded-lg bg-primary-100 p-3 group-hover:bg-primary-200 transition-colors"
                >
                  <UIcon :name="item.icon" class="text-primary-600 size-6" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 truncate">
                    {{ item.name }}
                  </h3>
                  <p class="text-sm text-gray-600 truncate">
                    {{ item.description }}
                  </p>
                </div>
                <UIcon
                  name="chevron-right"
                  class="text-gray-400 group-hover:text-primary-600 transition-colors"
                />
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </UCard>

    <!-- Recent Activity & Overview -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Recent Risk Profiles -->
      <UCard variant="soft">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                Recent Risk Profiles
              </h3>
              <p class="text-sm text-gray-600">Latest risk assessments</p>
            </div>
            <UButton
              icon="chevron-right"
              variant="ghost"
              color="primary"
              to="/risk-profile"
            />
          </div>
        </template>
        <div class="space-y-3">
          <div
            v-for="i in 4"
            :key="i"
            class="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-primary-300 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="rounded-full bg-primary-100 w-10 h-10 flex items-center justify-center"
              >
                <span class="text-sm font-semibold text-primary-700">{{ i }}</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">Operational Risk {{ i }}</p>
                <p class="text-sm text-gray-500">Updated 2 days ago</p>
              </div>
            </div>
            <UBadge color="warning" variant="soft">Medium</UBadge>
          </div>
        </div>
      </UCard>

      <!-- Upcoming Audits -->
      <UCard variant="soft">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Upcoming Audits</h3>
              <p class="text-sm text-gray-600">Scheduled audit activities</p>
            </div>
            <UButton
              icon="chevron-right"
              variant="ghost"
              color="primary"
              to="/strategic-audit-plan"
            />
          </div>
        </template>
        <div class="space-y-3">
          <div
            v-for="i in 4"
            :key="i"
            class="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-primary-300 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="rounded-lg bg-blue-100 w-10 h-10 flex items-center justify-center"
              >
                <UIcon name="plan" class="text-blue-600 size-5" />
              </div>
              <div>
                <p class="font-medium text-gray-900">Q{{ i }} Audit Plan</p>
                <p class="text-sm text-gray-500">Starting in {{ i * 7 }} days</p>
              </div>
            </div>
            <UBadge color="info" variant="soft">Scheduled</UBadge>
          </div>
        </div>
      </UCard>
    </div>
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
