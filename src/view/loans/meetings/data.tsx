import { CommitteeData, ProjectsDataI } from "./type";

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
