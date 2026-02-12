<template>
  <div class="p-6 max-w-7xl mx-auto space-y-8">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Audit Charter
        </h1>
        <p class="text-gray-500 text-sm mt-1">
          Governance foundation document management.
        </p>
      </div>
      <button
        @click="showModal = true"
        class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
      >
        <span class="text-xl">+</span> Add Charter
      </button>
    </div>

    <div v-if="store.activeCharter" class="relative group">
      <div
        class="absolute -inset-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
      ></div>
      <div
        class="relative dark:bg-secondary-200 rounded-xl p-8 border border-primary-200 dark:border-primary-200 shadow-xl"
      >
        <div class="flex justify-between items-start">
          <div>
            <span
              class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 mb-4 inline-block"
            >
              CURRENTLY ACTIVE
            </span>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {{ store.activeCharter.title }}
            </h2>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span class="flex items-center gap-1"
                >Tanggal : {{ store.activeCharter.date }}</span
              >
              <span class="flex items-center gap-1"
                >Dokumen : {{ store.activeCharter.fileName }}</span
              >
            </div>

            <div
              class="grid grid-cols-2 gap-8 mb-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
            >
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">
                  Uploaded By
                </p>
                <p class="font-medium">{{ store.activeCharter.uploadedBy }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400 uppercase tracking-wider">
                  Approved By
                </p>
                <p class="font-medium">{{ store.activeCharter.approvedBy }}</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <button
              @click="handleEdit(store.activeCharter)"
              class="w-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 py-2 mb-12 rounded-lg text-sm font-medium transition"
            >
              Edit Data
            </button>
            <div
              class="flex items-center bg-gray-100 dark:bg-gray-700 p-8 rounded-lg min-w-[120px]"
            >
              <UIcon name="charter" class="text-primary-500" size="32"></UIcon>
              <a
                href="#"
                class="text-primary-600 hover:underline text-sm font-medium m-2"
                >Download</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-secondary-50 border-l-4 border-secondary-400 p-4">
      <p class="text-secondary-700">
        ⚠️ Belum ada Audit Charter yang aktif. Silakan upload dokumen baru.
      </p>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 my-8"></div>

    <div>
      <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Non-Active Charter
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="charter in store.historyCharters"
          :key="charter.id"
          class="bg-secondary-100 dark:bg-gray-800 p-10 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition opacity-75 hover:opacity-100 cursor-pointer"
        >
          <div class="flex justify-between items-start mb-4">
            <span class="text-xs text-gray-500">{{ charter.date }}</span>
          </div>
          <h4 class="font-bold text-gray-900 dark:text-white truncate mb-4">
            {{ charter.title }}
          </h4>
          <p class="text-xs text-gray-600">
            Uploaded By : {{ charter.uploadedBy }}
          </p>
          <p class="text-xs text-gray-600 mb-4">
            Approved By : {{ charter.approvedBy }}
          </p>
          <div
            class="flex justify-between items-center text-xs border-t pt-4 dark:border-gray-700"
          >
            <span class="text-gray-600">{{ charter.fileName }}</span>
            <div class="flex gap-3">
              <button
                @click="handleEdit(charter)"
                class="w-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 p-2 rounded-lg text-sm font-medium transition"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <p
        v-if="store.historyCharters.length === 0"
        class="text-gray-400 italic text-sm"
      >
        No history available.
      </p>
    </div>

    <Teleport to="body">
      <div
        v-if="showModal"
        class="relative z-[9999]"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"
        ></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <div
              class="relative transform overflow-hidden rounded-lg bg-secondary-100 dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <form @submit.prevent="handleSubmit">
                <div
                  class="bg-secondary-50 dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                >
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4"
                    id="modal-title"
                  >
                    Upload New Charter
                  </h3>

                  <div class="space-y-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >Judul Dokumen</label
                      >
                      <input
                        v-model="form.title"
                        required
                        type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                        placeholder="e.g. Internal Audit Charter 2026"
                      />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Versi (Auto)</label
                        >

                        <div
                          class="mt-1 block w-full rounded-md border border-gray-200 bg-gray-200 p-2 text-gray-600 sm:text-sm font-bold"
                        >
                          <span v-if="isEditing">{{ form.version }}</span>
                          <span v-else class="text-primary-600"
                            >v{{ store.nextVersion }}</span
                          >
                        </div>
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Tanggal</label
                        >
                        <input
                          v-model="form.date"
                          required
                          type="date"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                        />
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Diupload Oleh</label
                        >
                        <input
                          v-model="form.uploadedBy"
                          required
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 sm:text-sm p-2 border"
                          readonly
                        />
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >Disetujui Oleh</label
                        >
                        <input
                          v-model="form.approvedBy"
                          required
                          type="text"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border"
                          placeholder="e.g. Audit Committee"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >Status</label
                      >
                      <div class="flex items-center gap-4">
                        <label class="inline-flex items-center">
                          <input
                            type="radio"
                            v-model="form.isActive"
                            :value="true"
                            class="form-radio text-primary-600"
                          />
                          <span
                            class="ml-2 text-sm text-gray-700 dark:text-gray-300"
                            >Active</span
                          >
                        </label>
                        <label class="inline-flex items-center">
                          <input
                            type="radio"
                            v-model="form.isActive"
                            :value="false"
                            class="form-radio text-gray-600"
                          />
                          <span
                            class="ml-2 text-sm text-gray-700 dark:text-gray-300"
                            >Inactive (Archive)</span
                          >
                        </label>
                      </div>
                    </div>

                    <div>
                      <label
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >File Charter (PDF/DOCX)</label
                      >
                      <div
                        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 transition"
                      >
                        <div class="space-y-1 text-center">
                          <svg
                            class="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label
                              for="file-upload"
                              class="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                class="sr-only"
                                @change="handleFileChange"
                                accept=".pdf,.docx,.doc"
                              />
                            </label>
                            <p class="pl-1">or drag and drop</p>
                          </div>
                          <p class="text-xs text-gray-500">
                            PDF, DOCX up to 5MB
                          </p>
                          <p
                            v-if="form.file"
                            class="text-sm text-green-600 font-bold mt-2"
                          >
                            Selected: {{ form.file.name }}
                          </p>
                        </div>
                      </div>
                      <p v-if="errorMsg" class="text-red-500 text-xs mt-1">
                        {{ errorMsg }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-secondary-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                >
                  <button
                    type="submit"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Upload Charter
                  </button>
                  <button
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="closeModal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useCharterStore } from "~/stores/charter";
import type { CharterFormState } from "~/types/audit";

// Meta & Stores
definePageMeta({
  layout: "default",
  // middleware: 'auth' // Aktifkan jika middleware auth sudah siap
});

const store = useCharterStore();

// Modal State
const showModal = ref(false);
const errorMsg = ref("");

const isEditing = ref(false);
const editingId = ref<string | null>(null);

const isAddRiskProfileFormOpen = ref(false);

// Form State
const form = reactive<CharterFormState>({
  title: "",
  version: "", // Tidak perlu diisi user
  date: new Date().toISOString().split("T")[0] || "",
  uploadedBy: "Dimas (HIA)",
  approvedBy: "",
  isActive: true,
  file: null,
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  // Ambil file dengan aman menggunakan optional chaining
  // target.files?[0] akan return 'File | undefined'
  const file = target.files?.[0];

  // GUARD CLAUSE (PENTING):
  // Jika file undefined, langsung berhenti.
  // Setelah baris ini, TypeScript tahu 'file' pasti bertipe 'File' (bukan undefined).
  if (!file) return;

  // --- Mulai Validasi ---

  // Validasi Ukuran (Max 5MB)
  // Sekarang 'file.size' aman diakses karena file dijamin ada
  if (file.size > 5 * 1024 * 1024) {
    errorMsg.value = "File terlalu besar! Maksimal 5MB.";
    form.file = null;
    // Reset input value agar user bisa pilih file ulang
    target.value = "";
    return;
  }

  // Validasi Tipe
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  if (!allowedTypes.includes(file.type)) {
    errorMsg.value = "Format file tidak valid. Gunakan PDF atau DOCX.";
    form.file = null;
    target.value = "";
    return;
  }

  // Jika lolos semua audit
  errorMsg.value = "";
  form.file = file;
};

// Submit Handler
const handleSubmit = () => {
  // Validasi File: Wajib jika mode ADD, Opsional jika mode EDIT
  if (!isEditing.value && !form.file) {
    errorMsg.value = "Mohon upload file charter.";
    return;
  }

  if (isEditing.value && editingId.value) {
    // MODE EDIT
    store.updateCharter(editingId.value, { ...form });
    alert("Audit Charter berhasil diperbarui!");
  } else {
    // MODE ADD
    store.addCharter({ ...form });
    alert("Audit Charter berhasil diupload!");
  }

  closeModal();
};

const closeModal = () => {
  showModal.value = false;
  errorMsg.value = "";
  isEditing.value = false; // Reset mode edit
  editingId.value = null;

  // Reset Form
  form.title = "";
  form.version = "";
  form.date = new Date().toISOString().split("T")[0] || "";
  form.approvedBy = "";
  form.isActive = false;
  form.file = null;
};

const handleEdit = (charter: any) => {
  isEditing.value = true;
  editingId.value = charter.id;
  showModal.value = true;

  // Isi form dengan data lama
  form.title = charter.title;
  form.version = charter.version;
  form.date = charter.date;
  form.uploadedBy = charter.uploadedBy;
  form.approvedBy = charter.approvedBy;
  form.isActive = charter.isActive;
  form.file = null; // Reset file input karena file tidak wajib diisi saat edit

  // Reset error
  errorMsg.value = "";
};
</script>
