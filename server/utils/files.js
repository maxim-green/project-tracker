const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class fileUtils {
  async saveStaticFile (file, filePath = '') {
    if (!file) return file
    const extension = file.name.match(/\..+$/)[0];
    let filename = uuid.v4() + extension;
    const dir = path.resolve(__dirname, '..', 'static', filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
    file.mv(path.resolve(__dirname, '..', 'static', filePath, filename));
    return `/${filePath ? filePath + '/' : ''}${filename}`;
  };

  async deleteStaticFile (filePath) {
    const fullFilePath = path.resolve(__dirname, '..', 'static', filePath);
    if (fs.existsSync(fullFilePath)) {
      fs.unlinkSync(fullFilePath);
    }
  };
}

module.exports = new fileUtils();
