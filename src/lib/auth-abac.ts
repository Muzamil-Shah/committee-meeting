import { User } from "../contexts/user-context"
import { buildersData } from "../view/loans/fna/data"
import { BuildterDataI } from "../view/loans/fna/type"
import { ProjectsDataI } from "../view/loans/meetings/type"



type Role = "User" | "MRO" | "HOD" | 'APP1' | 'APP2' | 'DMD' | "NFA" | "Admin"

export const userRole = {
  admin: "Admin",
  user: "User",
  mro: "MRO",
  hod: 'HOD',
  app1:  "MRO Approver Level 1",
  app2: "MRO Approver Level 2",
  dmd : "DMD",
  fna:"NFA"
}

const keyConveter = {
  "User": "User",
  "MRO": "MRO",
  'HOD': "HOD",
  "MRO Approver Level 1": "APP1",
  "MRO Approver Level 2": "APP2",
  "DMD":"DMD",
  "NFA":"NFA"
}


// type User = { blockedBy: string[]; roles: Role[]; id: string }

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean)

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
    }>
  }>
}

type Permissions = {
  builder: {
    dataType: BuildterDataI
    action: "view" | "create" | "update" | "delete" | 'action' | 'acknowledge' | 'reject' | 'submit' | 'approve' | 'query'
  }
  projects: {
    dataType: ProjectsDataI
    action: "view" | "create" | "update" | "delete" | 'action' | 'acknowledge' | 'reject' | 'submit' | 'approve' | 'query'
  }
  
}

const ROLES = {
  APP2: {
    builder: {
      view: true,
      create: true,
      update: true,
    },
    projects: {
      view: true,
      create: true,
     
    },
    
  },
  APP1: {
    builder: {
      view: true,
      create: true,
     

    },
    projects: {
      view: true,
      create: true,
     
    },
    
  },
  HOD: {
    builder: {
      view: true,
      create: true,
      
     
    },
    projects: {
      view: true,
      create: true,
      
    },
    
  },
  MRO: {
    builder: {
      view: true,
      create: true,
      
    },
    projects: {
      view: true,
      create: true,
      
     
      
    },
    
  },
  Admin: {
    builder: {
      view: true,
      create: true,
      },
    projects: {
      view: true,
      create: true,
     },
    
  },
  DMD: {
    builder: {
      view: true,
      create: true,
      
    },
    projects: {
      view: true,
      create: true,
      
    },
    
  },
  NFA: {
    builder: {
      view: true,
      create: true,
     
    },
    projects: {
      view: true,
      create: true,
      
    },
    
  },
  User: {
    builder: {
      view: true,
      create: true,
     },
    projects: {
      view: true,
      create: true,

    },
    
  },
} as const satisfies RolesWithPermissions

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) {
  
  return Array(1).fill(keyConveter[user.role! as keyof typeof keyConveter]).some(role => {
    
    const permission = (ROLES as RolesWithPermissions)[role as keyof typeof ROLES][resource]?.[action]
    if (permission == null) return false

    if (typeof permission === "boolean") return permission
    return data != null && permission(user, data)
  })
}

// USAGE:
const user: User = {role: "User" ,username: 'ali',token:'sd'}


// Can create a comment
hasPermission(user, "builder", "create")

// Can view the `todo` Todo
hasPermission(user, "builder", "view", buildersData[0])


