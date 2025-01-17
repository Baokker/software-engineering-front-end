let baseURL = process.env.VUE_APP_BASE_API;

module.exports = [
  // collect
  // add or cancel collection
  {
    url: baseURL + "/transaction/collect_transaction",
    type: "post",
    response: (config) => {
      // eslint-disable-next-line no-unused-vars
      const { id } = config.body;
      return {
        code: 20000,
        message: "okk",
      };
    },
  },
  // get transaction info
  {
    url: baseURL + "/transaction/transaction_data.*",
    type: "get",
    response: (config) => {
      // eslint-disable-next-line no-unused-vars
      const { id } = config.query;

      return {
        code: 20000,
        data: {
          contactType: "微信",
          contactNumber: "13432",

          type: "出售", // 或求购
          title: "急急急！Mac 14 pro 二手",
          authorName: "wkkk",
          avatar:
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_default_imgs/defaultImages.jpg",
          publishTime: new Date(),
          campus: "嘉定",
          price: 1111,
          collectNumber: 12,
          viewCounts: 122,
          tagId: 1,
          tagName: "苹果",
          subtagId: 2,
          subtagName: "iPhone",
          content:
            "ejhsbfjahsjajeh你说得对，但是原神前面忘了中间忘了后面忘了 集美们真的很好咱就是说赶快冲了就是说",
          imagesList: [
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/IMG_5475.jpg",
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/intro__ewz1ro7xs14y_large.jpg",
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/image-20221104145441049.png",
            "https://baokker-oss-blog-hangzhou.oss-cn-hangzhou.aliyuncs.com/cdn_for_blog/blog_imgs/image-20221115141640963.png",
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202011%2F05%2F20201105204601_8ebba.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672300539&t=f957be2e30050e7683039b7bfd247684",
            "https://img0.baidu.com/it/u=1946448131,3678705437&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500",
          ],
        },
      };
    },
  },
];
