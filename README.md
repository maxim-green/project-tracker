# Project tracker web app

## API

### User
#### User registration
#### `POST: /user/registration`
#### User login
#### `POST: /user/login`
#### Authorization check
#### `GET: /user/auth`
#### Refresh user tokens
#### `POST: /user/refresh-tokens`
#### Get all projects where auth user is lead
#### `GET: /user/project/lead`
#### Get all projects where auth user is member
#### `GET: /user/project/member`
#### Get all issues where auth user is reporter
#### `GET: /user/issue/reporter`
#### Get all issues where auth user is assignee
#### `GET: /user/issue/assignee`

### Project
#### Create new project
#### `POST: /project`
#### Get project by projectId
#### `GET: /project/:id`
#### Edit project by projectId
#### `PUT: /project/:id`
#### Delete project by projectId
#### `DELETE: /project/:id`
#### Get all issues within a project
#### `GET: /project/:id/issue`
#### Post new issue within a project
#### `POST: /project/:id/issue`
#### Get projects possible statuses
#### `GET: /project/:id/status`
#### Add possible status to project
#### `POST: /project/:id/status`
#### Get projects tags
#### `GET: /project/:id/tag`
#### Add new tag to project
#### `POST: /project/:id/tag`
#### Get project lead
#### `GET: /project/:id/lead`
#### Get project members
#### `GET: /project/:id/member`
#### Add member to project
#### `POST: /project/:id/member/:userId`

### Status
#### Get status
#### `GET: /status/:id`
#### Edit status
#### `PUT: /status/:id`
#### Delete status
#### `DELETE: /status/:id`
#### Get all issues with status
#### `GET: /status/:id/issue`

### Issue
#### Get issue by id
#### `GET: /issue/:id`
#### Edit issue by id
#### `PUT: /issue/:id`
#### Delete issue by id
#### `DELETE: /issue/:id`
#### Get comments of issue
#### `GET: /issue/:id/comment`
#### Add comment to issue
#### `POST: /issue/:id/comment`
#### Get all issue tags
#### `GET: /issue/:id/tag`
#### Add tag to issue
#### `POST: /issue/:id/tag`
#### Delete tag from issue
#### `DELETE: /issue/:id/tag/:id`
#### Get all attachments of issue
#### `GET: /issue/:id/attachment`
#### Add attachment to issue
#### `POST: /issue/:id/attachment`

### Tag
#### Get tag info
#### `GET: /tag/:id`
#### Get tag info
#### `PUT: /tag/:id`
#### Delete tag
#### `DELETE: /tag/:id`
#### Get all issues with tag
#### `GET: /tag/:id/issue`

### Comment
#### Get comment info
#### `GET: /comment/:id`
#### Edit comment
#### `PUT: /comment/:id`
#### Delete comment
#### `DELETE: /comment/:id`
#### Get comment reactions
#### `GET: /comment/:id/reaction`
#### Add comment reaction
#### `POST: /comment/:id/reaction`

### Reaction
#### Change reaction
#### `PUT: /reaction/:id`
#### Delete reaction
#### `DELETE: /reaction/:id`

### Attachment
#### Delete attachment
#### `DELETE: /attachment/:id`

