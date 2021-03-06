import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { withStatus } from "../extensions/with-status"
import { User } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    id: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    role: types.optional(types.string, ''),
    createdAt: types.optional(types.string, ''),
    updatedAt: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .actions((self) => ({
    saveUser: (newUser: User) => {
      self.id = newUser.id;
      self.email = newUser.email;
      self.role = newUser.role;
      self.createdAt = newUser.createdAt;
      self.updatedAt = newUser.updatedAt;
    },

    resetUser: () => {
      self.id = '';
      self.email = '';
      self.role = '';
      self.createdAt = '';
      self.updatedAt = '';
    }
  }))
  .actions((self) => ({
    getUser: () => {
      return {
        id: self.id,
        email: self.email,
        role: self.role,
        createdAt: self.createdAt,
        updatedAt: self.updatedAt,
      }
    },
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
