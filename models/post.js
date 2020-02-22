'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    underscored: true,
  });
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};