import React,{Component} from "react";
import Child1 from "./Child1";
import FileUpload from "./fileupload";
class App extends Component {
  constructor(props){
    super(props);
    this.state = {data:[]}
  }
  
  set_data = (csv_data) => {
    console.log("Received CSV Data:", csv_data);
    this.setState({ data: csv_data });
  };
  
  render(){
    return(
   <div>
    <FileUpload set_data={this.set_data}></FileUpload>
      <Child1 csv_data={this.state.data}></Child1>
      {console.log(this.state.data)}
    </div>
    
  )
  };
}

export default App;
