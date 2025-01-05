import { NewsArticle } from "@/interface/post";
import CopyIcon from "@/public/icons/CopyIcon";
import FacebookIcon from "@/public/icons/FacebookIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";
import timestampToBangleDateWithTime from "@/utils/timestampToBangleDateWithTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import AddCard from "../common/addCard/AddCard";
import LatestNewsHorizontal from "../common/latestNews/LatestNewsHorizontal";
import timestampToEnglishDateWithTime from "@/utils/timestampToBangleDateWithTime";

import instance from "@/utils/instance";

import VideoEmbed from "@/components/VideoEmbed";

import "@/app/singleNewsDetails.css";
import "@/app/commentlist.css";
import date_output_bn from "@/utils/datetime";
import NewsWithLatest from "../home/newsWithLatest/NewsWithLatest";
import TopNews from "./TopNews";

interface Comment {
  comments: string;
  com_username: string;
  created_at: string; // You might want to use a Date object here
}

interface CommentListProps {
  comments: Comment[];
}

interface Tag {
  tag: string;
}

interface SingleNews {
  id: number;
  title: string;
  stitle: string;
  encode_title: string;
  image_thumb: string;
  image_large: string;
  slug: string;
  news: string;
  video: string;
  category_name: string;
  category: string;
  reporter: string;
  reporter_image: string;
  post_date: string;
  publish_date: string;
  datetime_format: string;
  time_stamp: number;
  tags: Tag[];
  relatedPost: NewsArticle[];
  ads?: any;
  image_title?: string,
  is_on_print_media?: number
}

const SingleNewsDetails = ({
  data,
  clss,
}: {
  data: SingleNews;
  clss?: string;
}) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [hostName, setHostName] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentUsername, setCommentUsername] = useState("");
  const [commentSuccessText, setCommentSuccessText] = useState<String | null>("");
  const [commentErrorText, setCommentErrorText] = useState<String | null>("");

  const get_comments = () => {
    if (!data.id) {
      console.warn('cannot fetch comments, post id not available');
      return;
    }
    try {
      instance.get('/comment' + '?post_id=' + data.id).then(resp => {
        setComments(resp.data.data);
      }).catch((error) => console.error(error));
    } catch (error: any) {
      console.log(error);
    } finally { }
  };

  // useEffect(() => get_comments(), [data.id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id } = data;
    try {
      const { data } = await instance.post('/comment', { 'comment_text': commentText, 'post_id': id, 'username': commentUsername });
      if (data.code === 200) {
        setCommentSuccessText("comment success");
        setCommentErrorText("");
        setCommentText('');
        setCommentUsername('');

        get_comments();
      }
    } catch (error: any) {
      console.log(error);
      setCommentErrorText(error.message);
      setCommentSuccessText("");
    } finally {

    }
  };

  const {
    id,
    title,
    stitle,
    encode_title,
    image_thumb,
    image_large,
    image_title,
    slug,
    news,
    video,
    reporter,
    reporter_image,
    post_date,
    publish_date,
    category_name,
    category,
    time_stamp,
    tags,
    relatedPost,
    is_on_print_media
  } = data;

  // split news with <p/>

  useEffect(() => {
    const currentUrl = window.location.href;
    const hostUrl = window.location.host;
    // Scroll to the top of the page

    setHostName(hostUrl);
    setCurrentUrl(currentUrl);
  }, []);

  return (
    <div className={clss}>

      <div className="container px-4 mx-auto print:px-0">

        <div className={`${data.ads.news_view_31 ? "mb-4" : ""}`}>
          <AddCard imgPath={data.ads.news_view_31} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 print:!block">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3 lg:after:w-[1px] lg:after:h-full dark:after:bg-[var(--border-dark)] print:!col-span-12 print:after:bg-transparent">
            <article>
              <div className="mb-3">
                <nav className="print:hidden pb-2">
                  <ol className="w-fit flex items-center gap-1 text-sm border-b border-[var(--border-color)] dark:border-[var(--border-dark)]">
                    <li>
                      <Link
                        className="block text-[var(--gray-1)] dark:text-[var(--slate)]"
                        href={`/${category?.toLowerCase()}`}
                      >
                        {category_name}
                      </Link>
                    </li>
                  </ol>
                </nav>
                <h2 style={{ fontSize: "1.2em" }} className="my-1">{stitle}</h2>
                <h1 style={{ fontWeight: "bold" }} className="text-[var(--dark)] text-3xl lg:text-4xl leading-[40px] lg:leading-[50px] mb-6 dark:text-white print:dark:text-[var(--dark)] print:text-2xl print:mb-2">
                  {title}
                </h1>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-top-3 dark:after:bg-[var(--border-dark)] print:after:bg-transparent">
                  <div className="w-full md:w-1/2">
                    <div className="flex flex-row gap-2 items-center text-[var(--dark)] text-sm dark:text-white print:dark:text-[var(--dark)]">
                      <Image
                        alt={title}
                        loading="lazy"
                        width={192}
                        height={192}
                        decoding="async"
                        className="w-9 h-9 rounded-full author-image print:hidden"
                        src={reporter_image}
                      />
                      <div className="flex flex-col">
                        <div><span>{reporter}</span><span className="ml-1">|</span><span className="ml-1">{is_on_print_media === 1 ? "প্রিন্ট সংস্করণ" : "অনলাইন সংস্করণ"}</span></div>
                        {/* <div>{timestampToEnglishDateWithTime(time_stamp)}</div> */}
                        <div>{date_output_bn(publish_date)}</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 print:hidden flex items-center whitespace-nowrap justify-start md:justify-end min-h-[40px] md:min-h-[48px] select-none">
                    <div className="flex items-center">
                      <FacebookShareButton
                        url={`${hostName}/${category}/${encode_title}`}
                        title={title}
                        quote={stitle}
                        className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                      >
                        <FacebookIcon />
                      </FacebookShareButton>

                      <WhatsappShareButton
                        url={`${hostName}/${category}/${encode_title}`}
                        title={title}
                        className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                      >
                        <WhatsAppIcon />
                      </WhatsappShareButton>

                      <TwitterShareButton
                        url={`${hostName}/${category}/${encode_title}`}
                        title={title}
                        className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border"
                      >
                        <svg
                          className="w-4 h-4 fill-black dark:fill-white"
                          viewBox="0 0 512 512"
                        >
                          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                        </svg>
                      </TwitterShareButton>

                      <div
                        className="flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 bg-[var(--slate)] dark:bg-[var(--gray-1)] dark:text-white rounded-md items-center"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${hostName}/${category}/${encode_title}`
                          )
                        }
                      >
                        <CopyIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clss">
                {video ? (
                  // <iframe
                  //   className="aspect-video h-auto w-full"
                  //   width={200}
                  //   height={113}
                  //   src={youtube_embedded_video_url(video)}
                  //   title={title}
                  //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  // ></iframe>

                  <VideoEmbed videoUrl={video} title={title} />
                ) : (
                  <figure>
                    <Image
                      alt={title}
                      width={1200}
                      height={675}
                      decoding="async"
                      className="w-full h-auto"
                      src={image_large}
                    />
                    <div className="text-center post_image_title bg_lite border_bottom py-1 mb-1">{image_title}</div>
                  </figure>
                )}
              </div>
              <div className="text-[var(--dark)] mt-3 text-xl leading-8 print:leading-7 dark:text-white break-words print:dark:text-[var(--dark)] print:text-base">
                <div>
                  <strong style={{ display: "none" }}>{stitle}</strong>

                  <div className="my-3 flex flex-col">
                    <div
                      className="[&>p]:mt-5 news_details"
                      dangerouslySetInnerHTML={{ __html: news }}
                    />
                  </div>
                </div>
              </div>
            </article>

            <div className="print:hidden gap-3 py-3 flex flex-wrap">
              {tags.map((singleTag) => {
                const { tag } = singleTag;
                return (
                  <Link
                    key={tag}
                    className="bg-[var(--slate-2)] dark:bg-[var(--gray-2)] text-sm leading-none text-[var(--dark)] p-2 dark:text-white       text-center flex items-center"
                    href={`/topic/${tag}`}
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>

            <div>

              <div className="container mt-5 comment-section" style={{ display: "none" }}>

                <div className="row justify-content-center">
                  <div className="comment-list-container">
                    <h2>Comments</h2>
                    {comments.length === 0 ? (
                      <p className="no-comments">No comments yet.</p>
                    ) : (
                      <ul className="comment-list">
                        {comments.map((comment: Comment, index) => (
                          <li key={index} className="comment">
                            <div className="comment-header">
                              <span className="comment-author">{comment.com_username}</span>
                              <span className="comment-date">{comment.created_at}</span>
                            </div>
                            <div className="comment-body">
                              <p>{comment.comments}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="comment-form-container">
                  <h2>Leave a Comment</h2>
                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <div className="form-group">
                      <textarea
                        className="form-control comment-textarea"
                        placeholder="Write your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={5} // Adjust number of rows as needed
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control comment-username"
                        placeholder="Your Name"
                        value={commentUsername}
                        onChange={(e) => setCommentUsername(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary comment-submit-btn">
                      Submit Comment
                    </button>

                    {commentSuccessText && <div className="message message-success">{commentSuccessText}</div>}
                    {commentErrorText && <div className="message message-danger">{commentErrorText}</div>}

                  </form>
                </div>

              </div>
            </div>

            <div className="container mx-auto print:hidden">
              <div className="relative mt-6 mb-6 before:absolute before:bg-[var(--border-color)] before:w-full before:h-[1px] before:left-0 before:-top-3 after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:left-0 after:-bottom-2 print:hidden dark:before:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)]">
                <p className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
                  এই বিভাগের আরও সংবাদ
                </p>
              </div>

              {/* Latest news here */}
              {/* <LatestNewsHorizontal /> */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:after:[&>*:nth-last-child(-n+2)]:h-0 lg:after:[&>*:nth-last-child(-n+2)]:h-full lg:after:[&>*:nth-child(3)]:w-0 lg:after:[&>*]:w-[1px] after:[&>*:last-child]:w-0 after:[&>*]:h-[1px] lg:after:[&>*]:h-full print:hidden dark:after:[&>*]:bg-[var(--border-color)]">
                {relatedPost?.slice(0, 3)?.map((post) => {
                  const {
                    news_id,
                    post_title,
                    image_thumb,
                    image_alt,
                    category,
                    encode_titl,
                  } = post;

                  return (
                    <div
                      key={news_id}
                      className="col-span-12 md:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3"
                    >
                      <Link
                        className="group"
                        href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                      >
                        <div className="ml-2 lg:ml-0 mb-2 overflow-hidden float-right relative">
                          <div>
                            <Image
                              alt={post_title}
                              width={330}
                              height={186}
                              decoding="async"
                              className="w-[124px] h-auto lg:w-full lg:h-auto object-cover group-hover:scale-105 duration-700 ease-out"
                              src={image_thumb}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <h2 className="text-lg text-[var(--dark)] group-   dark:text-white">
                          {post_title}
                        </h2>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 xl:col-span-3 print:hidden">
            <div className="xl:sticky xl:top-[4rem]">
              {/* <div className={`${data.ads.news_view_31 ? "" : "h-[250px]"}`}>
                <AddCard imgPath={data.ads.news_view_31} />
              </div> */}

              <TopNews count={10}/>

              <div className="mb-3">
                <div className="mt-3 mb-3 border-[var(--border-color)] border-t-[1px] border-b-[1px] dark:border-[var(--border-dark)]">
                  <h4 className="text-[var(--primary)] text-xl md:text-2xl py-2 dark:text-[var(--primary)]">
                    এ সম্পর্কিত আরও খবর
                  </h4>
                </div>
                <div className="last:[&>*]:mb-0 after:last:[&>*]:h-0">
                  {relatedPost.map((post) => {
                    const {
                      news_id,
                      post_title,
                      image_thumb,
                      image_alt,
                      category,
                      encode_titl,
                    } = post;
                    return (
                      <div
                        key={news_id}
                        className="after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 dark:after:bg-[var(--border-dark)] group relative"
                      >
                        <div className="flex mb-6">
                          <div className="mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)] w-full">
                            <Link
                              className="group"
                              href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                            >
                              <div className="md:hidden ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative">
                                <div>
                                  <Image
                                    alt={image_alt}
                                    width={330}
                                    height={186}
                                    decoding="async"
                                    className="w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out"
                                    src={image_thumb}
                                  />
                                </div>
                              </div>
                              <h3 className="text-lg text-[var(--dark)] grou;p-   dark:text-white">
                                {post_title}
                              </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 dark:after:bg-[var(--border-dark)] before:h-px before:-top-3 before:bg-[var(--border-color)] dark:before:bg-[var(--border-color)] before:absolute before:w-full">
                    <div className="w-full flex items-center justify-center">
                      <div
                        className={`${data.ads.news_view_32 ? "" : "h-[250px]"
                          }`}
                      >
                        <AddCard imgPath={data.ads.news_view_32} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNewsDetails;
