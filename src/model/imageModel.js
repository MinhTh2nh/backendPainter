module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    image_data: {
      type: DataTypes.STRING
    },
    dateImage: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  });

  return Image;
};