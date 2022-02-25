import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

// b200c31d521d45b8aba9fe34e8c68e7d

export class News extends Component {
  static defaultProps = {
    country:"in",
    pageSize:8,
    category:'sports',
  }

 static propTypes={
   country:PropTypes.string,
   pageSize:PropTypes.number,
   category:PropTypes.string,
 }
  constructor(){
    super();
    this.state = {
      articles: [],
      loading : false,
      page : 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b200c31d521d45b8aba9fe34e8c68e7d&page=1&pageSize=${this.props.pageSize}`;
   this.setState({loading:true});
    let data = await fetch(url);
    
    let parsedData =  await data.json();
    this.state.loading = false;
    // console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults
    ,loading:false});
  }


  

  handleNextClick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b200c31d521d45b8aba9fe34e8c68e7d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

    this.setState({loading:true});
       let data = await fetch(url);
       
       let parsedData =  await data.json();
       this.setState({
         page : this.state.page+1,
         articles:parsedData.articles,
         totalResults:parsedData.totalResults,
         loading:false
         
       })
  }

  handlePrevClick = async ()=>{
    console.log('prev');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b200c31d521d45b8aba9fe34e8c68e7d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;

    this.setState({loading:true});
    let data = await fetch(url);
    
    let parsedData =  await data.json();
    this.setState({
      page : this.state.page - 1,
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
      
    })
    
}

  render() {
    return (
      <div className="container my-3">
            <h1 className='text-center' style={{margin:'30px'}}>NewsMonkey - TopHeadLines</h1>
            {this.state.loading && <Spinner/>}
            
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                 return <div className="col-md-4" key={element.url}>
                 <NewsItem title={element.title?element.title:""} description = {element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://static.toiimg.com/thumb/msid-89732972,width-1070,height-580,imgsize-850545,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} newsUrl = {element.url}/> 
                 </div>
            })}
                
                
            </div>

            <div className="container d-flex justify-content-between">
            <button disabled ={this.state.page <= 1?true:false} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>

            <button disabled = {this.state.page + 1 >(Math.ceil(this.state.totalResults/this.props.pageSize))?true:false} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &raquo;</button>
            </div>
                        
      </div>
    )
  }
}

export default News
