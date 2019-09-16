import { Component } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

import Post from '../components/post'

export default class extends Component {
  static async getInitialProps () {
    // fetch list of posts
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_page=1'
    )
    const postList = await response.json()
    return { postList }
  }
  state={
    postList:[],
    userStreamsFormatted:""
  }

  constructor(props){
    super(props)
    this.state.postList = props.postList
  }
  async componentDidMount() {

    // setTimeout(async ()=>{

    //   const response = await fetch(
    //     'https://jsonplaceholder.typicode.com/posts?_page=1'
    //   )

    //   const postList = await response.json()

    //   this.setState({
    //     postList:[...this.state.postList.concat(postList)]
    //   })
    // },3000)

    var connect_button = new WMGConnect(".wmg-button", {});
    
    // connect_button.campaign.getTotalStreams(function(response_data){
    //     console.log(response_data);
    // });
    
    // connect_button.campaign.getStreamsUserLeaderboard(function(response_data){
    //     console.log(response_data);
    // });
    
    // connect_button.campaign.getStreamsCountryLeaderboard(function(response_data){
    //     console.log(response_data);
    // });


    connect_button.setCallback((connect_data)=>{
        // Callback code
         console.log('cb,',connect_data);
        //console.log
        if (connect_data && connect_data.user){
          this.setState({ user:connect_data.user })

          //setTimeout(()=>{
            connect_button.user.getTotalStreams((response_data)=>{
              console.log('responsuser',response_data,response_data.body.total_streams.total_formatted)
              this.setState({ userStreamsFormatted:response_data.body.total_streams.total_formatted })
            })
          //},1000)
         

        }
        
    });

  }


  render () {

    const {user,userStreamsFormatted} = this.state
    return (
      <main>
        <Head>
          <title>Home page</title>
          <script type="text/javascript" src="https://fpt.fm/app/sdk/platform.js?campaign=22146"></script>

        </Head>

        {
          !user?
          <button type="button" className="wmg-button" data-platform="spotify">Custom Spotify Button</button>
          :<>
          <h2>Welcome {user.name} ({user.city})</h2>
          <h4>Total user streams {userStreamsFormatted}</h4>
          </>

        }

        <a className="btn btn-primary" href="leaderboard">
          Leaderboard
        </a>

        {/* <h1>List of posts</h1>

          
        <section>
          {this.state.postList.map((post,idx) => (
            <Post {...post} key={idx} />
          ))}
        </section> */}
      </main>
    )
  }
}
