
/**
 * get posts based on a tag id
 * @param req
 * @param res
 * @param next
 */

const getPostsByTagId = async (
  req: Request<{tag_id: string}>,
  res: Response<TravelPost[]>,
  next: NextFunction,
) => {
  try {
    const files = await fetchPostsByTagId(Number(req.params.tag_id));
    res.json(files);
  } catch (error) {
    next(error);
  }
};
