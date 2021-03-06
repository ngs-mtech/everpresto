import moment from 'moment';

const TextHelper = {

  truncateString(string, length) {
    if (string.length > length) return `${string.slice(0, length)}...`;
    return string;
  },

  truncateImageFilename(filename) {
    const filenamePreview = filename.substring(0, 7);
    const filenameExtension = filename.substring(filename.lastIndexOf('.') + 1);
    return `${filenamePreview} ... ${filenameExtension}`;
  },

  pluralize(count, singular, plural) {
    if (count === 1) return `${count} ${singular}`;
    return `${count} ${plural}`;
  }

}

export default TextHelper;