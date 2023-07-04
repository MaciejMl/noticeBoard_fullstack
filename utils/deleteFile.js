const fs = require('fs');

const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error('An error occurred while deleting the uploaded file: ', err);
  }
};

module.exports = deleteFile;
