import mongoose from "mongoose"
import {
  AvailableUserRole,
  UserRolesEnum,
} from "../../../../src/utils/constants.js"

const projectMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRole,
      default: UserRolesEnum.MEMBER,
      required: true,
    },
  },
  { timestamps: true },
)

export const ProjectMember = mongoose.model(
  "ProjectMember",
  projectMemberSchema,
)

export default ProjectMember
