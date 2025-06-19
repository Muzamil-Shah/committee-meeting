import { CommitteeData, MyInboxI, ProjectsDataI } from "./type";

export const projectsData: ProjectsDataI[] = [
  {
    id: 1,
    builderName: "Muzamil",
    projectName: "Vipul Squre Constraction",
    projectVendors: 10,
    projectStartDate: new Date(),
    projectTotalExpences: "10 cr",
    status: "created",
    createdOn: new Date(),
  },
  ...Array(100).fill({
    id: Math?.random(),
    builderName: "Muzamil",
    projectName: "Vipul Squre Constraction",
    projectVendors: 10,
    projectStartDate: new Date(),
    projectTotalExpences: "10 cr",
    status: "created",
    createdOn: new Date(),
  }),
];

export const committeeData: CommitteeData[] = [
  {
    id: 1,
    committeeName: "Technology Advisory Board",
    committeeType: "Advisory",
    subject: "Q3 Technology Roadmap Review",
    description: "Review and approve the technology roadmap for Q3 2023",
    startDate: "2023-07-15T14:00:00",
    endDate: "2023-07-15T16:00:00",
    quorumCheck: true,
    agendaApproval: true,
    momRequiredApproval: false,
    attachments: ["roadmap.pdf", "budget.xlsx"],
    composition: [
      {
        role: "Chairperson",
        user: "Dr. Sarah Johnson",
        emailId: "sarah.johnson@example.com",
      },
      {
        role: "CTO",
        user: "Michael Chen",
        emailId: "michael.chen@example.com",
      },
      {
        role: "Lead Architect",
        user: "Emma Wilson",
        emailId: "emma.wilson@example.com",
      },
    ],
    quorum: [
      {
        role: "Chairperson",
        count: 1,
      },
      {
        role: "Technical Members",
        count: 2,
      },
    ],
  },
  {
    id: 2,
    committeeName: "Ethics Review Committee",
    committeeType: "Governance",
    subject: "New AI Ethics Guidelines",
    description: "Review proposed AI ethics guidelines for compliance",
    startDate: "2023-07-20T10:00:00",
    endDate: "2023-07-20T12:30:00",
    quorumCheck: true,
    agendaApproval: true,
    momRequiredApproval: true,
    attachments: ["ethics-guidelines.docx", "case-studies.pdf"],
    composition: [
      {
        role: "Chair",
        user: "Prof. David Miller",
        emailId: "david.miller@example.com",
      },
      {
        role: "Legal Representative",
        user: "Lisa Rodriguez",
        emailId: "lisa.rodriguez@example.com",
      },
      {
        role: "External Expert",
        user: "Dr. James Wilson",
        emailId: "james.wilson@example.com",
      },
    ],
    quorum: [
      {
        role: "Chair",
        count: 1,
      },
      {
        role: "Members",
        count: 3,
      },
    ],
  },
  {
    id: 3,
    committeeName: "Employee Wellness Task Force",
    committeeType: "Internal",
    subject: "Annual Wellness Program Planning",
    description: "Plan employee wellness initiatives for the coming year",
    startDate: "2023-08-05T09:30:00",
    endDate: "2023-08-05T11:00:00",
    quorumCheck: false,
    agendaApproval: false,
    momRequiredApproval: false,
    attachments: ["wellness-survey-results.pptx"],
    composition: [
      {
        role: "HR Lead",
        user: "Jennifer Brown",
        emailId: "jennifer.brown@example.com",
      },
      {
        role: "Employee Representative",
        user: "Robert Taylor",
        emailId: "robert.taylor@example.com",
      },
    ],
    quorum: [],
  },
];

export const users = [
  { value: 1, label: "John" },
  { value: 2, label: "Mary" },
  { value: 3, label: "David" },
  { value: 4, label: "Sarah" },
  { value: 5, label: "Michael" },
  { value: 6, label: "Emily" },
  { value: 7, label: "Robert" },
  { value: 8, label: "Jennifer" },
  { value: 9, label: "William" },
  { value: 10, label: "Jessica" },
];



export const dummyInboxData: MyInboxI[] = [];