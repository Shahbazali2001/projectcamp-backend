import mongoose from "mongoose"
import { User } from "./../../models/user.models"
import { Project } from "../../models/project.models"
import { ProjectMember } from "../../models/projectmember.models"
import { ProjectNote } from "../../models/note.models"
import { Task } from "../../models/task.models"
import { Subtask } from "../../models/subtask.models"

import { AvailableUserRole, UserRolesEnum } from "../../utils/user-constants.js"

import { ApiResponse } from "../../utils/api-response.js"
import { ApiError } from "../../utils/api-error.js"
import { asyncHandler } from "../../utils/async-handler.js"

// get all projects
const getProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "project",
        pipeline: [
          {
            $lookup: {
              from: "projectmember",
              localField: "_id",
              foreignField: "project",
              as: "projectMember",
            },
          },
          {
            $addFields: {
              members: {
                $size: "$projectMember",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$project",
    },
    {
      $project: {
        project: {
          _id: 1,
          name: 1,
          description: 1,
          members: 1,
          createdAt: 1,
          updatedAt: 1,
        },
        role: 1,
        _id: 0,
      },
    },
  ])

  res.status(200).json(new ApiResponse(projects))
})
