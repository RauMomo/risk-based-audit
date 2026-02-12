<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <UCard variant="soft">
      <template #header>
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-2">
              <h1 class="text-3xl font-bold text-gray-900">
                Strategic Plan Internal Audit
              </h1>
              <p class="text-sm text-gray-600">
                5 Year Strategic Planning for Risk-Based Audit
              </p>
            </div>
            <UButton
              icon="add"
              label="Add Strategic Objective"
              variant="solid"
              color="primary"
              size="sm"
              @click="isAddModalOpen = true"
            />
          </div>
        </div>
      </template>
    </UCard>

    <!-- Year Tabs -->
    <UCard variant="soft">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Planning Period</h2>
            <p class="text-sm text-gray-600">Select strategic plan timeline</p>
          </div>
          <USelect
            v-model="selectedYear"
            :items="yearOptions"
            class="w-40"
          />
        </div>
      </template>
      <UTabs v-model="activeTab" :items="tabItems">
        <template #item="{ item }">
          <div class="space-y-4">
            <!-- Overview Statistics -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200">
                <div class="rounded-lg bg-blue-100 p-3">
                  <UIcon name="plan" class="text-blue-600 size-6" />
                </div>
                <div>
                  <p class="text-sm text-gray-600">Total Objectives</p>
                  <p class="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200">
                <div class="rounded-lg bg-green-100 p-3">
                  <UIcon name="check" class="text-green-600 size-6" />
                </div>
                <div>
                  <p class="text-sm text-gray-600">Achieved</p>
                  <p class="text-2xl font-bold text-green-600">8</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200">
                <div class="rounded-lg bg-orange-100 p-3">
                  <UIcon name="info" class="text-orange-600 size-6" />
                </div>
                <div>
                  <p class="text-sm text-gray-600">In Progress</p>
                  <p class="text-2xl font-bold text-orange-600">4</p>
                </div>
              </div>
            </div>

            <!-- Strategic Objectives Table -->
            <div class="rounded-lg border border-gray-200 bg-white">
              <UTable :data="strategicObjectives" :columns="columns">
                <template #actions-cell="{ row }">
                  <UDropdownMenu
                    :items="getRowActions(row)"
                    aria-label="Actions"
                  >
                    <UButton
                      icon="i-lucide-ellipsis-vertical"
                      color="primary"
                      variant="ghost"
                      aria-label="Actions dropdown"
                    />
                  </UDropdownMenu>
                </template>
              </UTable>
            </div>
          </div>
        </template>
      </UTabs>
    </UCard>

    <!-- Add/Edit Modal -->
    <UModal
      v-model:open="isAddModalOpen"
      :title="isEditMode ? 'Edit Strategic Objective' : 'Add Strategic Objective'"
      :ui="{
        content: 'bg-secondary-50',
        title: 'text-highlighted font-semibold text-2xl text-black',
      }"
    >
      <template #body>
        <UForm @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <UFormField label="Number" required>
              <UInput
                v-model="form.number"
                type="number"
                placeholder="1"
              />
            </UFormField>

            <UFormField
              label="Corporate Strategic Objectives"
              required
              help="Main organizational objectives aligned with audit strategy"
            >
              <UTextarea
                v-model="form.objectives"
                placeholder="e.g. Increase Revenue, Improve Efficiency, etc."
                :rows="3"
              />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="KPI" required>
                <UInput
                  v-model="form.kpi"
                  placeholder="Key Performance Indicator"
                />
              </UFormField>

              <UFormField label="Sifat Data" required>
                <USelect
                  v-model="form.sifatData"
                  :items="sifatDataOptions"
                  placeholder="Select data type"
                />
              </UFormField>
            </div>

            <UFormField
              label="Target KPI for 5 Year Period"
              required
            >
              <UTextarea
                v-model="form.targetKpi"
                placeholder="Enter target KPI values for each year"
                :rows="2"
              />
            </UFormField>

            <UFormField
              label="Internal Audit Strategic Objective"
              required
              help="How audit will support this corporate objective"
            >
              <UTextarea
                v-model="form.auditObjective"
                placeholder="Define audit's role in achieving this objective"
                :rows="3"
              />
            </UFormField>
          </div>
        </UForm>
      </template>
      <template #footer>
        <div class="flex flex-row justify-end gap-3">
          <UButton
            label="Cancel"
            variant="outline"
            color="neutral"
            @click="closeModal"
          />
          <UButton
            label="Save Objective"
            variant="solid"
            color="primary"
            @click="handleSubmit"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
});

// State
const isAddModalOpen = ref(false);
const isEditMode = ref(false);
const activeTab = ref("Q1");
const selectedYear = ref(new Date().getFullYear());

// Form Data
const form = ref({
  number: "",
  objectives: "",
  kpi: "",
  sifatData: "",
  targetKpi: "",
  auditObjective: "",
});

// Year Options
const yearOptions = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 6 }, (_, i) => ({
    value: currentYear + i,
    label: `${currentYear + i} - ${currentYear + i + 4}`,
  }));
});

// Tab Items
const tabItems = [
  { label: "Q1", value: "Q1" },
  { label: "Q2", value: "Q2" },
  { label: "Q3", value: "Q3" },
  { label: "Q4", value: "Q4" },
];

// Sifat Data Options
const sifatDataOptions = [
  { label: "Kuantitatif", value: "kuantitatif" },
  { label: "Kualitatif", value: "kualitatif" },
  { label: "Campuran", value: "campuran" },
];

// Mock Data
const strategicObjectives = ref([
  {
    id: 1,
    number: "1",
    objectives: "Enhance operational efficiency across all departments",
    kpi: "Cost reduction ratio",
    sifatData: "Kuantitatif",
    targetKpi: "15% reduction by 2027",
    auditObjective: "Review and optimize operational processes",
    status: "In Progress",
  },
  {
    id: 2,
    number: "2",
    objectives: "Strengthen internal control systems",
    kpi: "Control effectiveness score",
    sifatData: "Kuantitatif",
    targetKpi: "90% effectiveness by 2026",
    auditObjective: "Evaluate control design and implementation",
    status: "Achieved",
  },
  {
    id: 3,
    number: "3",
    objectives: "Improve risk management practices",
    kpi: "Risk response time",
    sifatData: "Kuantitatif",
    targetKpi: "48 hours average response",
    auditObjective: "Assess risk identification and mitigation",
    status: "In Progress",
  },
  {
    id: 4,
    number: "4",
    objectives: "Enhance compliance with regulations",
    kpi: "Compliance audit score",
    sifatData: "Kualitatif",
    targetKpi: "Full compliance by 2028",
    auditObjective: "Verify regulatory adherence",
    status: "In Progress",
  },
]);

// Table Columns
const columns: TableColumn[] = [
  {
    accessorKey: "number",
    header: "No.",
    cell: (row) => row.getValue(),
    meta: {
      class: {
        th: "bg-primary text-secondary-900 text-center w-16",
        td: "text-center font-semibold text-gray-900",
      },
    },
  },
  {
    accessorKey: "objectives",
    header: "Corporate Strategic Objectives",
    cell: (row) => row.getValue(),
    meta: {
      class: {
        th: "bg-primary text-secondary-900",
        td: "text-gray-700",
      },
    },
  },
  {
    accessorKey: "kpi",
    header: "KPI",
    cell: (row) => row.getValue(),
    meta: {
      class: {
        th: "bg-primary text-secondary-900",
        td: "text-gray-700",
      },
    },
  },
  {
    accessorKey: "sifatData",
    header: "Sifat Data",
    cell: (row) => row.getValue(),
    meta: {
      class: {
        th: "bg-primary text-secondary-900 text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "targetKpi",
    header: "Target KPI (5 Year)",
    cell: (row) => row.getValue(),
    meta: {
      class: {
        th: "bg-primary text-secondary-900",
        td: "text-gray-700",
      },
    },
  },
  {
    accessorKey: "auditObjective",
    header: "Audit Objective",
    cell: (row) => row.getValue(),
    meta: {
      class: {
        th: "bg-primary text-secondary-900",
        td: "text-gray-700",
      },
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const status = row.getValue();
      const color = status === "Achieved" ? "success" : "warning";
      return h("span", {
        class: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`
      }, status);
    },
    meta: {
      class: {
        th: "bg-primary text-secondary-900 text-center",
        td: "text-center",
      },
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: "actions-cell",
    meta: {
      class: {
        th: "bg-primary text-secondary-900 text-center",
        td: "text-center",
      },
    },
  },
];

const getRowActions = (row: any) => [
  {
    type: "label",
    label: "Actions",
  },
  {
    label: "Edit",
    onSelect: () => handleEdit(row.original),
  },
  {
    label: "Delete",
    onSelect: () => handleDelete(row.original.id),
  },
];

// Methods
const closeModal = () => {
  isAddModalOpen.value = false;
  isEditMode.value = false;
  form.value = {
    number: "",
    objectives: "",
    kpi: "",
    sifatData: "",
    targetKpi: "",
    auditObjective: "",
  };
};

const handleEdit = (item: any) => {
  isEditMode.value = true;
  form.value = { ...item };
  isAddModalOpen.value = true;
};

const handleDelete = (id: number) => {
  if (confirm("Are you sure you want to delete this strategic objective?")) {
    strategicObjectives.value = strategicObjectives.value.filter(
      (item) => item.id !== id
    );
  }
};

const handleSubmit = () => {
  if (isEditMode.value) {
    const index = strategicObjectives.value.findIndex(
      (item) => item.id === form.value.id
    );
    if (index !== -1) {
      strategicObjectives.value[index] = { ...form.value };
    }
  } else {
    strategicObjectives.value.push({
      ...form.value,
      id: Date.now(),
      status: "In Progress",
    });
  }
  closeModal();
};
</script>