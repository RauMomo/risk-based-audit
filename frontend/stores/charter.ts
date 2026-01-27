// stores/charter.ts
import { defineStore } from 'pinia'
import type { AuditCharter, CharterFormState } from '~/types/audit'

export const useCharterStore = defineStore('charter', () => {
  // Mock Data Awal (Supaya tampilan tidak kosong saat dijalankan)
  const charters = ref<AuditCharter[]>([
    {
      id: '1',
      title: 'Internal Audit Charter 2025',
      version: '1.0',
      date: '2025-01-01',
      uploadedBy: 'Dimas (HIA)',
      approvedBy: 'Board of Directors',
      isActive: false,
      fileName: 'audit-charter-v1.0_2025.pdf',
      fileSize: '2.5 MB'
    },
    {
      id: '2',
      title: 'Financial Audit Charter 2025 ',
      version: '1.1',
      date: '2025-02-15',
      uploadedBy: 'Dimas (HIA)',
      approvedBy: 'Audit Committee',
      isActive: false, // Ini yang akan tampil besar
      fileName: 'audit-charter-v1.1_2025.pdf',
      fileSize: '3.1 MB'
    },
    {
      id: '3',
      title: 'Operasional Audit Charter 2025',
      version: '1.2',
      date: '2025-03-11',
      uploadedBy: 'Dimas (HIA)',
      approvedBy: 'Audit Committee',
      isActive: false, // Ini yang akan tampil besar
      fileName: 'audit-charter-v1.2_2025.pdf',
      fileSize: '3.1 MB'
    },
    {
      id: '4',
      title: 'RBIA Audit Charter 2025',
      version: '1.3',
      date: '2025-05-21',
      uploadedBy: 'Dimas (HIA)',
      approvedBy: 'Audit Committee',
      isActive: true, // Ini yang akan tampil besar
      fileName: 'audit-charter-v1.3_2025.pdf',
      fileSize: '3.1 MB'
    }
  ])

  // Getters
  const activeCharter = computed(() => charters.value.find(c => c.isActive))
  const historyCharters = computed(() => charters.value.filter(c => !c.isActive).sort((a, b) => b.version.localeCompare(a.version)))

  // Actions
  const addCharter = (form: CharterFormState) => {
    // Logic: Jika upload baru aktif, non-aktifkan charter yang lama
    if (form.isActive) {
      charters.value.forEach(c => c.isActive = false)
    }

    // Logic: Naming Convention -> audit-charter-v{version}_{year}.{ext}
    const year = new Date(form.date).getFullYear()
    const fileExt = form.file?.name.split('.').pop() || 'pdf'
    const generatedFileName = `audit-charter-v${form.version}_${year}.${fileExt}`

    const newCharter: AuditCharter = {
      id: Date.now().toString(),
      title: form.title,
      version: form.version,
      date: form.date,
      uploadedBy: form.uploadedBy,
      approvedBy: form.approvedBy,
      isActive: form.isActive,
      fileName: generatedFileName,
      fileSize: form.file ? `${(form.file.size / 1024 / 1024).toFixed(2)} MB` : '0 MB',
      fileUrl: '#' 
    }

    // Masukkan ke array (unshift agar di paling atas list jika masuk history)
    charters.value.unshift(newCharter)
  }

  const updateCharter = (id: string, form: CharterFormState) => {
    const index = charters.value.findIndex(c => c.id === id)
    if (index === -1) return

    // 1. Jika status diubah jadi Active, matikan yang lain
    if (form.isActive) {
      charters.value.forEach(c => c.isActive = false)
    }

    // 2. Cek apakah ada file baru? // Ambil referensi data lama
    const existingCharter = charters.value[index]!
    let updatedFileName = charters.value[index]?.fileName
    let updatedFileSize = charters.value[index]?.fileSize

    if (form.file) {
      const year = new Date(form.date).getFullYear()
      const fileExt = form.file.name.split('.').pop() || 'pdf'
      updatedFileName = `audit-charter-v${form.version}_${year}.${fileExt}`
      updatedFileSize = `${(form.file.size / 1024 / 1024).toFixed(2)} MB`
    }

    // 3. Update Data
    charters.value[index] = {
      ...charters.value[index], // Ambil data lama
      id: existingCharter.id,
      title: form.title,
      version: form.version,
      date: form.date,
      uploadedBy: form.uploadedBy,
      approvedBy: form.approvedBy,
      isActive: form.isActive,
      fileName: updatedFileName,
      fileSize: updatedFileSize
    }
    
    // Sort ulang history jika perlu (opsional)
  }

  return {
    charters,
    activeCharter,
    historyCharters,
    addCharter,
    updateCharter 
  }
  
})