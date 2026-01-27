<template>
  <UModal
    title="Delete Confirmation"
    :open="props.isOpen"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
      onClick: () => emit('update:isOpen', false),
    }"
  >
    <template #body>
      <p class="text-lg font-bold text-left text-primary-500">
        Are you sure you want to delete this item? <br />
        <h6 class="text-sm font-bold text-left text-primary-500">{{ riskName }}</h6>
      </p>
    </template>
    <template #footer>
      <div></div>
      <UButton color="error" variant="solid" @click="deleteRisk">
        Delete
      </UButton>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { useRiskProfileStore } from "~/stores/profile-risk";

const props = defineProps<{
  isOpen: boolean;
  riskName: string;
  riskId: string;
}>();

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
}>();

const riskProfileStore = useRiskProfileStore();

const deleteRisk = () => {
  riskProfileStore.deleteRiskProfile(props.riskId);
  emit("update:isOpen", false);
};
</script>
