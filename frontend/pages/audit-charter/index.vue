<template>
  <div class="max-w-full mx-auto space-y-8">

    <UCard v-if="store.activeCharter" class="bg-white relative group" variant="soft">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Active Audit Charter</h1>
          <UButton 
            label="Add Charter"
            @click="showModal = true"
            color="primary"
            icon="add"
          > 
          </UButton>
        </div>
        
        <div class="border-t border-gray-400 dark:border-gray-700 my-4"></div>
          
        <div class="flex justify-between items-start">
          <div>
            <UBadge
              label="CURRENTLY ACTIVE"
              class="px-2.5 py-0.5 mb-4 rounded inline-block"
              size="xl"
              color="success"
            >
            </UBadge>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {{ store.activeCharter.title }}
            </h2>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <UBadge
                class="rounded inline-block"
                size="lg"
                color="error"
              >
               v{{ store.activeCharter.version }}
              </UBadge>
              <UIcon name="calendar" size="md" class="text-primary-400"></UIcon>
              <span class="flex items-center gap-1">{{ store.activeCharter.date }}</span>
              <UIcon name="charter" size="md" class="text-primary-400"></UIcon>
              <span class="flex items-center gap-1">{{ store.activeCharter.fileName }}</span>
            </div>
            
            <UBadge 
              size="xl"
              class="grid grid-cols-2 bg-gray-50 gap-8 mb-6 p-4 rounded-lg">
              <div>
                <p class="text-xs text-gray-600 uppercase tracking-wider">Uploaded By</p>
                <p class="font-medium text-black">{{ store.activeCharter.uploadedBy }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-600 uppercase tracking-wider">Approved By</p>
                <p class="font-medium text-black">{{ store.activeCharter.approvedBy }}</p>
              </div>
            </UBadge>
          </div>
          
        </div>
        <div class="sm:flex sm:flex-row-reverse gap-4">
          <UButton
            icon="download"
            size="md" 
            color="primary" 
            variant="solid" 
          >
              Download
          </UButton>  
          <UButton
              label="Edit" 
              @click="handleEdit(store.activeCharter)"
              color="primary"
              icon="edit"
              variant="outline"
          >
          </UButton>
        </div> 
    </UCard>
    
    <UCard v-else class="bg-secondary-50 border-l-4 border-secondary-400 p-4">
      <div class="flex justify-between items-center">
        <UIcon name="warning" size="lg" class="text-warning-600"></UIcon>
        <p class="text-secondary-700">Belum ada Audit Charter yang aktif. Silakan upload dokumen baru.</p>
        <UButton 
          label="Add Charter"
          @click="showModal = true"
          color="primary"
          icon="add"
        > 
        </UButton>
      </div>
    </UCard>

    <div>
      
      <UCard class="bg-white relative group" variant="soft">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">History Audit Charter</h3>
        <UTable
          :data="store.historyCharters"    
          :columns="columns"
          :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'Belum ada data rencana audit.' }"
          class="w-full text-sm text-left"
        >
          <template #version-data="{ row }">
            <span class="font-bold text-gray-800 dark:text-gray-200">{{ row.original.version }}</span>
          </template>
          <template #title-data="{ row }">
            <span class="font-bold text-gray-800 dark:text-gray-200">{{ row.original.title }}</span>
          </template>
          <template #date-data="{ row }">
            <span class="font-bold text-gray-800 dark:text-gray-200">{{ row.original.date }}</span>
          </template>
          <template #approvedBy-data="{ row }">
            <span class="font-bold text-gray-800 dark:text-gray-200">{{ row.original.approvedBy }}</span>
          </template>
          <template #uploadedBy-data="{ row }">
            <span class="font-bold text-gray-800 dark:text-gray-200">{{ row.original.uploadedBy }}</span>
          </template>
          <template #fileName-cell="{ row }">  
            <UButton 
              icon="download"
              color="primary" 
              size="md"
            >
              {{ row.original.fileName }}
            </UButton>  
          </template>
          <template #actions-cell="{ row }">
            <div class="flex justify-end">
              <UButton
                label="Edit"
                size="md"
                color="primary"
                variant="outline"
                icon="edit"
                @click="handleEdit(row.original)"
              />
            </div>
          </template>

        </UTable>
      </UCard>

      <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard
          color="primary"
          v-for="charter in store.historyCharters" 
          :key="charter.id"
          class="p-4 rounded-lg hover:shadow-md transition opacity-75 hover:opacity-100 cursor-pointer"
        >
          <div class="flex justify-between items-start mb-4">
            <span class="text-xs text-gray-500">{{ charter.date }}</span>
          </div>
          <h4 class="font-bold text-gray-900 dark:text-white truncate mb-4">{{ charter.title }}</h4>
          <p class="text-xs text-gray-600">Uploaded By : {{ charter.uploadedBy }}</p>
          <p class="text-xs text-gray-600 mb-4">Approved By : {{ charter.approvedBy }}</p>
          <div class="flex justify-between items-center text-xs border-t pt-4 dark:border-gray-700">
            <span class="text-gray-600">{{ charter.fileName }}</span>
              <UButton
                label="Edit"
                color="primary" 
                @click="handleEdit(charter)" 
                class="p-2 rounded-lg text-sm font-medium transition"
                icon="edit"
                >
              </UButton>
          </div>
        </UCard>
      </div>
      <p v-if="store.historyCharters.length === 0" class="text-gray-400 italic text-sm">No history available.</p> -->
    </div>

      <Teleport to="body">
        <div v-if="showModal" class="relative z-[9999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-secondary-100 dark:bg-secondary-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <UForm @submit.prevent="handleSubmit">
                            <div class="bg-secondary-50 dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div class="flex justify-between items-center">
                                <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4" id="modal-title">
                                    Upload New Charter
                                </h3>
                                <UIcon name="close" @click="closeModal" class="text-primary-400 hover:text-primary-600 text-2xl">&times;</UIcon>
                              </div>

                              <div class="space-y-4">
                                <UFormField
                                  label="Judul Dokumen"
                                  class="block text-sm font-medium"
                                  size="lg"
                                >
                                  <UInput 
                                  v-model="form.title" 
                                  required 
                                  type="text"
                                  name="title" 
                                  id="title"
                                  class="mt-1 block w-full rounded-md sm:text-sm p-2" 
                                  placeholder="e.g. Internal Audit Charter 2026"
                                  />
                                </UFormField>

                                <div class="grid grid-cols-2 gap-4">
                                
                                <UFormField
                                  label="Versi (Auto)"
                                  class="block text-sm font-medium"
                                  size="lg"
                                >
                                  <div class="mt-1 block w-full rounded-md border border-gray-200 bg-gray-200 p-2 text-gray-600 sm:text-sm font-bold">
                                    <span v-if="isEditing">{{ form.version }}</span>
                                    <span v-else class="text-primary-600">v{{ store.nextVersion }}</span>
                                  </div>
                                </UFormField>

                                <UFormField
                                  label="Tanggal"
                                  class="block text-sm font-medium"
                                  size="lg"
                                >
                                    <UInput
                                      v-model="form.date" 
                                      required 
                                      type="date" 
                                      class="mt-1 block w-full rounded-md sm:text-sm"
                                    />
                                </UFormField>
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                <UFormField
                                  label="Diupload Oleh"
                                  class="block text-sm font-medium "
                                  size="lg"
                                >
                                  <div class="mt-1 block w-full rounded-md border border-gray-200 bg-gray-200 p-2 text-gray-600 sm:text-sm font-bold">
                                    <span>{{ form.uploadedBy }}</span>
                                  </div>
                                </UFormField>

                                <UFormField
                                  label="Disetujui Oleh"
                                  class="block text-sm font-medium"
                                  size="lg"
                                >
                                  <UInput 
                                    v-model="form.approvedBy" 
                                    required 
                                    type="text" 
                                    class="mt-1 block w-full rounded-md sm:text-sm"
                                    placeholder="e.g. Audit Committee"
                                  />
                                </UFormField>
                                </div>

                                <UFormField
                                  label="Status"
                                  class="block text-sm font-medium"
                                  size="lg"
                                >
                                  
                                  <div class="flex items-center gap-4">
                                      <label class="inline-flex items-center">
                                      <input type="radio" v-model="form.isActive" :value="true" class="form-radio text-primary-600">
                                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                                      </label>
                                      <label class="inline-flex items-center">
                                      <input type="radio" v-model="form.isActive" :value="false" class="form-radio text-primary-600">
                                      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                                      </label>
                                  </div>
                                </UFormField>

                                <UFormField 
                                  label="Upload File Charter (PDF/DOCX)" 
                                  :error="errorMsg" 
                                  class="block text-sm font-medium"
                                  size="lg"
                                >
                                  <UInput 
                                    type="file" 
                                    icon="i-heroicons-paper-clip"
                                    @change="handleFileChange"
                                    accept=".pdf,.docx,.doc"
                                    class="w-full"
                                  />
                                  
                                  <div v-if="form.file" class="mt-2 flex items-center gap-2 text-sm text-primary-600 bg-primary-50 p-2 rounded">
                                    <UIcon name="i-heroicons-document" />
                                    <span class="font-bold">{{ form.file.name }}</span>
                                  </div>
                                </UFormField>

                                <!-- <UFileUpload
                                  label="Upload file (PDF/DOCX)"
                                  :error="errorMsg"
                                  description="PDF or DOCX (max. 2MB)"
                                  layout="list"
                                  multiple
                                  :interactive="false"
                                  class="w-full"
                                >
                                  <template #actions="{ open }">
                                    <UButton
                                      label="Select images"
                                      icon="i-lucide-upload"
                                      color="neutral"
                                      variant="outline"
                                      @click="open()"
                                    />
                                  </template>

                                  <template #files-bottom="{ removeFile, files }">
                                    <UButton
                                      v-if="files?.length"
                                      label="Remove all files"
                                      color="neutral"
                                      @click="removeFile()"
                                    />
                                  </template>
                                </UFileUpload> -->
                              </div>
                            </div>
                            <div class="bg-secondary-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <UButton 
                                type="submit"
                                color="primary" 
                                class="w-full inline-flex justify-center rounded-md px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm"
                                label="Submit"
                              >
                              </UButton>
                            </div>
                        </UForm>
                    </div>
                </div>
            </div>
        </div>
    </Teleport> 
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { useCharterStore } from '~/stores/charter'
import type { AuditCharter, CharterFormState } from '~/types/audit'

// Meta & Stores
definePageMeta({
  layout: 'default',
  // middleware: 'auth' // Aktifkan jika middleware auth sudah siap
})

const store = useCharterStore()

// Modal State
const showModal = ref(false)
const errorMsg = ref('')

const isEditing = ref(false)
const editingId = ref<string | null>(null)

const columns: TableColumn<AuditCharter>[] = [
  { accessorKey: 'version', header: 'Version' },
  { accessorKey: 'title', header: 'Charter Name' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'approvedBy', header: 'Approved By' },
  { accessorKey: 'uploadedBy', header: 'Uploaded By' },
  { accessorKey: 'fileName', header: 'Actions' },
  { accessorKey: 'actions', header: '' }
]

// Form State
const form = reactive<CharterFormState>({
  title: '',
  version: '', // Tidak perlu diisi user
  date: new Date().toISOString().split('T')[0] || '', 
  uploadedBy: 'Dimas (HIA)', 
  approvedBy: '',
  isActive: true,
  file: null
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  
  // Ambil file dengan aman menggunakan optional chaining
  // target.files?[0] akan return 'File | undefined'
  const file = target.files?.[0]

  // GUARD CLAUSE (PENTING):
  // Jika file undefined, langsung berhenti.
  // Setelah baris ini, TypeScript tahu 'file' pasti bertipe 'File' (bukan undefined).
  if (!file) return

  // --- Mulai Validasi ---

  // Validasi Ukuran (Max 5MB)
  // Sekarang 'file.size' aman diakses karena file dijamin ada
  if (file.size > 5 * 1024 * 1024) {
    errorMsg.value = 'File terlalu besar! Maksimal 5MB.'
    form.file = null
    // Reset input value agar user bisa pilih file ulang
    target.value = '' 
    return
  }

  // Validasi Tipe
  const allowedTypes = [
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword'
  ]
  
  if (!allowedTypes.includes(file.type)) {
    errorMsg.value = 'Format file tidak valid. Gunakan PDF atau DOCX.'
    form.file = null
    target.value = ''
    return
  }

  // Jika lolos semua audit
  errorMsg.value = ''
  form.file = file
}

// Submit Handler
const handleSubmit = () => {
  // Validasi File: Wajib jika mode ADD, Opsional jika mode EDIT
  if (!isEditing.value && !form.file) {
    errorMsg.value = 'Mohon upload file charter.'
    return
  }

  if (isEditing.value && editingId.value) {
    // MODE EDIT
    store.updateCharter(editingId.value, { ...form })
    alert('Audit Charter berhasil diperbarui!')
  } else {
    // MODE ADD
    store.addCharter({ ...form })
    alert('Audit Charter berhasil diupload!')
  }
  
  closeModal()
}

const closeModal = () => {
  showModal.value = false
  errorMsg.value = ''
  isEditing.value = false // Reset mode edit
  editingId.value = null
  
  // Reset Form
  form.title = ''
  form.version = ''
  form.date = new Date().toISOString().split('T')[0] || ''
  form.approvedBy = ''
  form.isActive = false
  form.file = null
}

const handleEdit = (charter: any) => {
  isEditing.value = true
  editingId.value = charter.id
  showModal.value = true
  
  // Isi form dengan data lama
  form.title = charter.title
  form.version = charter.version
  form.date = charter.date
  form.uploadedBy = charter.uploadedBy
  form.approvedBy = charter.approvedBy
  form.isActive = charter.isActive
  form.file = null // Reset file input karena file tidak wajib diisi saat edit
  
  // Reset error
  errorMsg.value = ''
}
</script>