const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  avatarUrl: { type: DataTypes.STRING }
}, {paranoid: true});

const Project = sequelize.define('project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
}, {paranoid: true});

const Status = sequelize.define('status', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
});

const Issue = sequelize.define('issue', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING, allowNull: true, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
}, {paranoid: true});

const Tag = sequelize.define('tag', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
});

const Comment = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
});

const Reaction = sequelize.define('reaction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  emoji: { type: DataTypes.STRING, allowNull: false },
});

const Attachment = sequelize.define('attachment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  thumbnailUrl: { type: DataTypes.STRING },
  fileUrl: { type: DataTypes.STRING, allowNull: false },
});

const ProjectMember = sequelize.define('projectMember', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const IssueTag = sequelize.define('issueTag', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Project, { as: 'lead', foreignKey: 'leadId' });
Project.belongsTo(User, { as: 'lead', foreignKey: 'leadId' });
Project.belongsTo(User,
  { as: 'defaultAssignee', foreignKey: 'defaultAssigneeId' });

User.belongsToMany(Project, { through: ProjectMember, as: 'member' });
Project.belongsToMany(User, { through: ProjectMember, as: 'member' });
ProjectMember.belongsTo(User);

User.hasMany(Issue, { as: 'reporter', foreignKey: 'reporterId' });
Issue.belongsTo(User, { as: 'reporter', foreignKey: 'reporterId' });
Issue.belongsTo(User, { as: 'assignee', foreignKey: 'assigneeId' });

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Reaction);
Reaction.belongsTo(User);

User.hasMany(Attachment);
Attachment.belongsTo(User);

Project.hasMany(Issue);
Issue.belongsTo(Project);

Project.hasMany(Status);
Status.belongsTo(Project);

Project.hasMany(Tag);
Tag.belongsTo(Project);

Status.hasMany(Issue);
Issue.belongsTo(Status);

Issue.hasMany(Issue, { foreignKey: 'parentIssueId' });
Issue.belongsTo(Issue, { as: 'parentIssue', foreignKey: 'parentIssueId' });

Issue.hasMany(Comment);
Comment.belongsTo(Issue);

Issue.hasMany(Attachment);
Attachment.belongsTo(Issue);

Issue.belongsToMany(Tag, { through: IssueTag, as: 'tags' });
Tag.belongsToMany(Issue, { through: IssueTag, as: 'issues' });
IssueTag.belongsTo(Tag);

Comment.hasMany(Reaction);
Reaction.belongsTo(Comment);


module.exports = {
  User,
  Project,
  Status,
  Issue,
  Tag,
  Comment,
  Reaction,
  Attachment,
  ProjectMember,
  IssueTag
};
