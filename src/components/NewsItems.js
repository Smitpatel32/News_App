import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imgurl, newsurl,author,date,source} = this.props;
        return (
            <>
                <div className="card text-start">
                    <div>
                    <span class="badge text-bg-light "style={{position:'absolute',top:"1px",right:"1px"}}>{source.name}</span>
                    <img src={imgurl ? imgurl : "https://cdn.drlinkcheck.com/blog/404-not-found.png"} className="card-img-top fit-cover w-100" alt="Not found" />
                    </div>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text m-2">{(!description)?"Sorry Description not found." : description}...</p>
                        <p className="card-text"><small className="text-body-secondary"> ~By {(author)?author :"Unknown"}</small>
                        <br/>
                        <small className="text-body-secondary"> ~On {(date)?new Date(date).toDateString():"Unknown"}</small></p>
                        <a href={newsurl} target="_blank" className="btn btn-danger 
                        mt-auto align-self-center">Read More</a>
                    </div>

                </div>
            </>
        )
    }
}

export default NewsItems
