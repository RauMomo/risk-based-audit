// Common utility types

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface SelectOption {
  label: string
  value: string | number
}

export interface DateRange {
  start: string
  end: string
}

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}
