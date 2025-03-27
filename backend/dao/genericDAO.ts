import { Model, ModelStatic, WhereOptions } from "sequelize";

class GenericDAO<T extends Model> {
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: T["_creationAttributes"]): Promise<T> {
	return this.model.create(data);
  }

  async findAll(filter: WhereOptions = {}): Promise<T[]> {
    return this.model.findAll({ where: filter });
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async update(
    id: number,
    data: Partial<T["_creationAttributes"]>
  ): Promise<T | null> {
    const instance = await this.model.findByPk(id);
    if (!instance) return null;
    return instance.update(data);
  }

  async delete(id: number): Promise<boolean> {
    const instance = await this.model.findByPk(id);
    if (!instance) return false;
    await instance.destroy();
    return true;
  }

  async findOne(filter: WhereOptions): Promise<T | null> {
	return this.model.findOne({ where: filter });
  }
}

export default GenericDAO;
export { GenericDAO };