import { User } from "./user.model";
import { Business } from "./business.model";
import { Review } from "./review.model";

export function setupAssociations() {
  User.belongsToMany(Business, { through: "UserBusiness" });
  Business.belongsToMany(User, { through: "UserBusiness" });

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User, { foreignKey: "userId" });

  Business.hasMany(Review, { foreignKey: "businessId" });
  Review.belongsTo(Business, { foreignKey: "businessId" });
}