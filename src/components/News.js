import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Load from './Load';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            currentPage: 1,
            totalResults: 0
        }
        document.title = this.capitalizeFirstLetter(this.props.category) + " - NewFlick"
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    updateComp = async () => {
        this.props.setProgress(20)
        console.log(this.props.category)
        let url = `https://newsapi.org/v2/top-headlines?country=&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.currentPage}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(80);
        this.setState({
            articles: parsedData.articles
            , totalResults: parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100)
    }
    componentDidMount() {
        this.updateComp();
    }

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.currentPage+1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
       this.setState({
            articles: this.state.articles.concat(parsedData.articles)
            ,totalResults: parsedData.totalResults,
            currentPage : this.state.currentPage + 1
        })
      };

    render() {
        News.defaultProps = {
            category: "general",
            pageSize: 6
        };

        News.propTypes = {
            category: PropTypes.string,
            pageSize: PropTypes.number
        }
        return (
            <div className="container">
                <h2 className="text-center my-3">Top {this.props.category} Headlines</h2>
                <hr />
                {this.state.loading && <Load />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Load/>}
                    scrollableTarget="scrollableDiv"
                    >
                    <div style={{overflow:'hidden'}}>
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div key={element.url} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-stretch my-3">
                                <NewsItems title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 150) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
                            </div>
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
                    <hr />
            </div>
                )
    }
}

                export default News;