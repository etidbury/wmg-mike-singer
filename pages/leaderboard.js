import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

export default class extends Component {
  // static async getInitialProps ({ query }) {
  //   // fetch single post detail
  //   const response = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts/1`
  //   )
  //   const post = await response.json()
  //   return { ...post }
  // }

  state={
    totalStreamsFormatted:"",
    streamsLeaderboard:[],
    isLoadingLeaderboard:true,
    isLoadingTotalStreams:true
  }

  componentDidMount(){
    console.log('props',this.props)

    var connect_button = new WMGConnect(".wmg-button", {});
    
    connect_button.campaign.getTotalStreams((response_data)=>{
        console.log(response_data);


        this.setState({
          totalStreamsFormatted: response_data.body.total_streams.total_formatted,
          isLoadingTotalStreams:false
        })
    });
    
    connect_button.campaign.getStreamsUserLeaderboard((response_data)=>{
        console.log(response_data);

        this.setState({
          streamsLeaderboard: response_data.body,
          isLoadingLeaderboard:false
        })

        
    });
    
  }

  render () {

    const { 
        totalStreamsFormatted,
       streamsLeaderboard,
       isLoadingTotalStreams,
       isLoadingLeaderboard
      } = this.state

    return (
      <main className="container">
         <Head>
          <title>Leaderboard</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>

          <script type="text/javascript" src="https://fpt.fm/app/sdk/platform.js?campaign=22146"></script>
        </Head>

        <Link href='/'>
          <a>Go back to home</a>
        </Link>

        <h4>Total streams {
              !isLoadingTotalStreams? totalStreamsFormatted:""
            }</h4>

        <table>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                No. streams
              </th>
            </tr>
          </thead>
          <tbody>

            {
              streamsLeaderboard.map((stream,idx)=>{
                return <tr key={idx}>
                    <td>{stream.name}</td>
                    <td>{stream.total_streams}</td>
                  </tr>
              })
            }
           
          </tbody>
        </table>

       
      </main>
    )
  }
}
