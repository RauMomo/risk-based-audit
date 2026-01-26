<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900">Risk Profile</h1>
    <div class="mt-4">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Risk ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Risk Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Risk Level
            </th>
            <th
              class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Impact Level
            </th>
            <th
              class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              scope="col"
            >
              Possibility Level
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// import {
//   getRiskLevelLabel,
//   getImpactLevelLabel,
//   getPossibilityLevelLabel,
// } from "~/utils/enumConverter";

defineProps<{
  risks: [];
}>();
</script>
