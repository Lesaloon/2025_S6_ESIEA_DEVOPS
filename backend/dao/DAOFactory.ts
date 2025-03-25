import { Model, ModelStatic } from 'sequelize';
import GenericDAO from './genericDAO';

class DAOFactory {
  private static daos: Map<string, GenericDAO<any>> = new Map();

  static getDAO<T extends Model>(model: ModelStatic<T>): GenericDAO<T> {
    const modelName = model.name;

    if (!this.daos.has(modelName)) {
      const dao = new GenericDAO<T>(model);
      this.daos.set(modelName, dao);
    }

    return this.daos.get(modelName) as GenericDAO<T>;
  }
}

export default DAOFactory;
