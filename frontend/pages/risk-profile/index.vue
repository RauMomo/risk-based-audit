<template>
  <UCard variant="soft">
    <template #header>
      <div class="flex flex-row items-stretch justify-between gap-8">
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-gray-900">Risk Profile</h1>
          <h6>
            Daftar risiko prioritas perusahaan dengan tingkat dampak dan
            kemungkinan
          </h6>
        </div>
        <div class="self-start">
          <UButton
            label="Tambah Risiko"
            variant="solid"
            color="primary"
            size="sm"
            @click="isAddRiskProfileFormOpen = true"
          >
          </UButton>
        </div>
      </div>
    </template>
    <div class="relative flex flex-col gap-4">
      <h5>Matriks Resiko</h5>
      <UTable :data="data" :columns="columns"> </UTable>
    </div>
    <template #footer>
      <div class="relative flex flex-col gap-4">
        <h5>List Resiko</h5>
        <UTable :data="riskData" :columns="priorityRiskListColumn"> </UTable>
      </div>
    </template>
  </UCard>
  <AddRiskProfileForm v-model:isOpen="isAddRiskProfileFormOpen" />
  <DeleteConfirmationRiskItem
    v-model:isOpen="isDeleteRiskProfileModalOpen"
    v-model:riskName="selectedRiskName"
    v-model:riskId="selectedRiskId"
  />
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import AddRiskProfileForm from "~/components/risk-profile/AddRiskProfileForm.vue";
import DeleteConfirmationRiskItem from "~/components/risk-profile/DeleteConfirmationRiskItem.vue";
import { useRiskProfileStore, type RiskListItem } from "~/stores/profile-risk";

const props = defineProps<{
  risks: [];
}>();

const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UButton = resolveComponent("UButton");

const { copy } = useClipboard();
const toast = useToast();

const riskProfileStore = useRiskProfileStore();

const isAddRiskProfileFormOpen = ref(false);
const isDeleteRiskProfileModalOpen = ref(false);

// Use store data instead of local refs
const data = computed(() => riskProfileStore.getRiskMatrix);
const riskData = computed(() => riskProfileStore.getRiskList);

const selectedRiskName = ref("");
const selectedRiskId = ref("");

// Fetch risk profiles on mount
onMounted(async () => {
  await riskProfileStore.fetchRiskProfiles();
});

const color = {
  Low: "successLight" as const,
  "Low to Moderate": "successDark" as const,
  Moderate: "warningLight" as const,
  "Moderate to High": "warningDark" as const,
  High: "error" as const,
};

const getRiskCellValue = (risk: any) => {
  var selectedColor = Object.entries(color).find(([key, value]) => {
    var clearedKey = risk.getValue().replace(/\s+\d+$/, "");
    return clearedKey === key;
  })?.[1];

  return h(
    UBadge,
    { class: "capitalize", variant: "soft", color: selectedColor },
    () => risk.getValue(),
  );
};

const deleteRisk = (id: string) => {
  selectedRiskId.value = id;
  isDeleteRiskProfileModalOpen.value = true;
};

const columns: TableColumn<Object>[] = [
  {
    accessorKey: "name",
    header: "Impact/Likelihood",
    cell: (risk: any) => {
      return risk.getValue();
    },
    meta: {
      class: {
        th: "text-center font-semibold bg-primary text-secondary-900",
        td: "text-center font-semibold bg-primary text-secondary-900 bg-primary",
      },
    },
  },
  {
    accessorKey: "riskId1",
    header: "1 Sangat Rendah",
    cell: getRiskCellValue,
    meta: {
      class: {
        th: "text-center font-semibold bg-primary text-secondary-900",
        td: "text-center font-semibold [&:nth-child(2):has(td:nth-child(2))]:bg-primary ",
      },
    },
  },
  {
    accessorKey: "riskId2",
    header: "2 Rendah",
    cell: getRiskCellValue,
    meta: {
      class: {
        th: "text-center font-semibold bg-primary text-secondary-900",
      },
    },
  },
  {
    accessorKey: "riskId3",
    header: "3 Moderat",
    cell: getRiskCellValue,
    meta: {
      class: {
        th: "text-center font-semibold bg-primary text-secondary-900",
      },
    },
  },
  {
    accessorKey: "riskId4",
    header: "4 Tinggi",
    cell: getRiskCellValue,
    meta: {
      class: {
        th: "text-center font-semibold bg-primary text-secondary-900",
      },
    },
  },
  {
    accessorKey: "riskId5",
    header: "5 Sangat Tinggi",
    cell: getRiskCellValue,
    meta: {
      class: {
        th: "text-center font-semibold bg-primary text-secondary-900",
      },
    },
  },
];

const priorityRiskListColumn: TableColumn<RiskListItem>[] = [
  {
    accessorKey: "risk_id",
    header: "Risk ID",
    cell: (risk: any) => {
      return risk.getValue();
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 px-6 py-3 text-left text-xs leading-4 font-medium bg-gray-50 text-gray-500 uppercase tracking-wider",
      },
    },
  },
  {
    accessorKey: "risk_name",
    header: "Risk Name",
    cell: (risk: any) => {
      return risk.getValue();
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 px-6 py-3 text-left text-xs leading-4 font-medium bg-gray-50 text-gray-500 uppercase tracking-wider",
      },
    },
  },
  {
    accessorKey: "risk_category",
    header: "Risk Category",
    cell: (risk: any) => {
      return risk.getValue();
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 px-6 py-3 text-left text-xs leading-4 font-medium bg-gray-50 text-gray-500 uppercase tracking-wider",
      },
    },
  },
  {
    accessorKey: "impact_level",
    header: "Impact Level",
    cell: (risk: any) => {
      return risk.getValue();
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 px-6 py-3 text-left text-xs leading-4 font-medium bg-gray-50 text-gray-500 uppercase tracking-wider",
      },
    },
  },
  {
    accessorKey: "possibility_level",
    header: "Possibility Level",
    cell: (risk: any) => {
      return risk.getValue();
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 px-6 py-3 text-left text-xs leading-4 font-medium bg-gray-50 text-gray-500 uppercase tracking-wider",
      },
    },
  },
  {
    accessorKey: "risk_level",
    header: "Risk Level",
    cell: (risk: any) => {
      return risk.getValue();
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 px-6 py-3 text-left text-xs leading-4 font-medium bg-gray-50 text-gray-500 uppercase tracking-wider",
      },
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: "end",
          },
          items: getRowItems(row),
          "aria-label": "Actions dropdown",
        },
        () =>
          h(UButton, {
            icon: "i-lucide-ellipsis-vertical",
            color: "primary",
            variant: "ghost",
            "aria-label": "Actions dropdown",
          }),
      );
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 px-6 py-3 text-center mx-auto text-xs leading-4 font-medium bg-gray-50 text-gray-500 uppercase tracking-wider",
        td: "px-8",
      },
    },
  },
];

function getRowItems(row: any) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Copy Risk ID",
      onSelect() {
        copy(row.original.risk_id);

        toast.add({
          title: "Risk ID copied to clipboard!",
          color: "success",
          icon: "i-lucide-circle-check",
        });
      },
    },
    {
      type: "separator",
    },
    {
      label: "Details",
    },
    {
      label: "Delete",
      onSelect() {
        selectedRiskName.value = row.original.risk_name;
        deleteRisk(row.original.risk_id);
      },
    },
  ];
}
</script>
