export interface CommitteeMember {
  role: string;
  user: string;
  emailId: string;
}

export interface QuorumRequirement {
  role: string;
  count: number;
}

export interface CommitteeData {
  id:number;
  committeeName: string;
  committeeType: string;
  subject: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  quorumCheck: boolean;
  agendaApproval: boolean;
  momRequiredApproval: boolean;
  attachments: string[];
  composition: CommitteeMember[];
  quorum: QuorumRequirement[];
}

