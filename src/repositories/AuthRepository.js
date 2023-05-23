/**
 * Module for AuthRepository.
 *
 * @version 1.0.0
 */

import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'
import { UserModel } from '../models/UserModel.js'

/**
 * Encapsulates an Auth repository.
 */
export class AuthRepository extends MongooseRepositoryBase {
  /**
   * Initializes a new instance.
   *
   * @param {UserModel} [model=UserModel] - A class with the same capabilities as UserModel.
   */
  constructor (model = UserModel) {
    super(model)
  }
}
