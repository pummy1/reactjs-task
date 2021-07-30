import { react } from "@babel/types";
import React from 'react';
import { Link } from 'react-router-dom';

class PostView extends React.Component{
    
    state={
        post_v: [],
        post_tl: [],
        post_cr: []
    }
    componentDidMount = async () => {
        var ids = this.props.match.params.id;
        
        fetch('https://jsonplaceholder.typicode.com/posts/'+ids)
            .then(res => res.json())
            .then(async(data) => {
                    this.setState({
                        post_tl: data,
                        comm_data:fetch('https://jsonplaceholder.typicode.com/users/'+data.userId)
                                    .then(res=>res.json())
                                    .then(async(result)=>{
                                        this.setState({
                                            post_cr:result,
                                            datafind:fetch('https://jsonplaceholder.typicode.com/posts/'+ids+'/comments')
                                                .then(res => res.json())
                                                .then(async(result) => {
                                                        result.map((postlist)=>{
                                                            // console.log(this.state.post_cr);
                                                            this.state.post_v.push(Object.assign({},postlist,{'username':this.state.post_cr.username,'userid':this.state.post_cr.id}));
                                                        });
                                                        this.setState({
                                    
                                                        });
                                                        // console.log(result);
                                                }),
                                        });
                                    }),
                    });
                    // console.log(data);
            });
        
        
    };

    render(){
        const { post_v,post_tl } = this.state;
        // console.log(post_v)
        return(
            <div className="row col-md-12">
                <h2>Post Title : {post_tl.title}</h2>
                {post_v.map((post,i)=><View key={i} data={post}/>)}
            </div>
        );
    }
}
class View extends React.Component{
    render(){
        return(
            <div className="col-md-3 card" style={{marginLeft:"20px",border: "1px solid gray",padding: "10px 10px"}}>
                {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Subject : {this.props.data.name}</h5>
                    <p className="card-text">Comment : {this.props.data.body}</p>
                    <p className="card-text">Email : {this.props.data.email}</p>
                    <Link to={'/'} className="btn btn-primary" style={{float:"left"}}>Back to List</Link>
                    <Link to={`/user/${this.props.data.userid}`} className="btn btn-primary" style={{marginLeft:"10px"}}>{this.props.data.username}</Link>
                </div>
            </div>
        )
    }
}

export default PostView;