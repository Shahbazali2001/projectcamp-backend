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

  res.status(200).json(new ApiResponse(200, projects, "Projects Fetched"))
})

//get project by id
const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params
  const project = await Project.findById(projectId)
  if (!project) {
    throw new ApiError(404, "Project not found")
  }
  res.status(200).json(new ApiResponse(200, project, "Project Fetched"))
})

//create Project
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body
  const project = await Project.create({
    name,
    description,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  })
  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN,
  })
  res
    .status(201)
    .json(new ApiResponse(201, project, "Project created Successfully"))
})

//update project
const updateProject = asyncHandler(async (req, res) => {
  
})

//delete project
const deleteProject = asyncHandler(async (req, res) => {})
