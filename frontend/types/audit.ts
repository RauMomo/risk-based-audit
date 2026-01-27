// Audit Types

export enum AuditType {
  ASSURANCE = 'assurance',
  SPECIAL = 'special',
  SPECIFIC_REASON = 'specific_reason',
  INVESTIGATION = 'investigation'
}

export enum AuditStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  FIELDWORK = 'fieldwork',
  REPORTING = 'reporting',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface AuditPlan {
  id: string
  year: number
  activities: AuditActivity[]
  createdAt: string
  updatedAt: string
}

export interface AuditActivity {
  id: string
  type: AuditType
  title: string
  subject: string
  auditUniverse: string
  justification: string
  purpose: string
  focus: string
  scheduleStart: string
  scheduleEnd: string
  teamSize: number
  totalManDays: number
  teamLeader: string
  status: AuditStatus
}

export interface AuditAssignment {
  id: string
  activityId: string
  letterNumber: string
  teamMembers: AuditTeamMember[]
  auditPurpose: string
  scope: string
  period: string
  chiefAuditorExecutive: string
  issueDate: string
}

export interface AuditTeamMember {
  name: string
  role: string
  scheduleStart: string
  scheduleEnd: string
}

export interface AuditFinding {
  id: string
  auditId: string
  title: string
  description: string
  severity: FindingSeverity
  recommendation: string
  status: FindingStatus
  responsiblePerson: string
  dueDate: string
  createdAt: string
  updatedAt: string
}

export enum FindingSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum FindingStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}

export interface AuditCharter {
  id: string;
  title: string;
  version: string;
  date: string; // ISO Date string (YYYY-MM-DD)
  uploadedBy: string;
  approvedBy: string;
  isActive: boolean;
  fileName?: string;
  fileUrl?: string; // Simulasi URL file
  fileSize?: string;
}

export interface CharterFormState {
  title: string;
  version: string;
  date: string;
  uploadedBy: string;
  approvedBy: string;
  isActive: boolean;
  file: File | null;
}