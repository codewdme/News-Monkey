import React, { Component } from "react";
import NewsItem from "./NewsItem";
import imageWoman from "../Assets/imageWoman.jpg";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log("this is the props");
    console.log(this.props);
    this.state = {
      articles: [],
      loading: false,
      page: 0,
      totalResults: 0,
    };
  }

  // async updateNews() {
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=d00b1087302a4403a3cb3fec207ccbf8&pageSize=${this.props.pageSize}&page=${this.state.page}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();

  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  // }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  async componentDidMount() {
    this.fetchMoreData();
  }

  fetchMoreData = async () => {
    setTimeout(async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
        this.props.category
      }&apiKey=d00b1087302a4403a3cb3fec207ccbf8&pageSize=${
        this.props.pageSize
      }&page=${this.state.page + 1}`;

      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
      });
    }, 700);
  };

  render() {
    // if (this.state.loading) {
    //   return (
    //     <>
    //       <Loading />
    //     </>
    //   );
    // } else {
    return (
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-2xl text-center pt-10 font-bold ">
          News Top Headlines
        </h1>
        {this.state.loading && <Loading />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="grid grid-cols-3 gap-8 p-14">
            {this.state.articles.map((element) => {
              return (
                <div key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                      element.urlToImage ? element.urlToImage : imageWoman
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>

        {/* pagination */}

        {/* <div className="flex p-8">
            <button
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>

            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
              }
              onClick={this.handleNextClick}
              className="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </div> */}
      </div>
    );
  }
}
// }
