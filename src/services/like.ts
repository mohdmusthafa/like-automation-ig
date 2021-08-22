export const like = async (media: any, ig: any) => {
  try {
    let { status } = await ig.media.like({
      mediaId: media.id,
      moduleInfo: { module_name: "feed_timeline" },
      d: 0,
    });
    return status;
  } catch (error) {
    throw error;
  }
};