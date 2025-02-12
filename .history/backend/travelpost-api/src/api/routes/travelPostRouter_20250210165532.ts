
// route to get all posts based on a tag id
router
  .route('/bytag/:tag_id')
  .get(
    param('tag_id').isInt({min: 1}).toInt(),
    validationErrors,
    getPostsByTagId,
  );
