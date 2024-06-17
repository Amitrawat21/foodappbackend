

class PhotoUploadClass {
  static uploadPhoto = async (req, res) => {
    res.json({
        success: true,
        image: req.file.filename,
      });
  };
}

export default PhotoUploadClass;



