import { Component } from "react";
import axios from 'axios';
import DisplayLayout from '../Components/displayLayout'
class LayoutServices extends Component {
  state = {
    isFetching: false,
    data: {
      header: {
        rows: [{
          columns: [{
            type: "",
            fieldId: "",
            actionType: "",
            label: ""
          }]
        }]
      }
    },
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isFetching: false,
  //     data: {
  //       header: {
  //         rows: [{
  //           columns: [{
  //             type:"",
  //             fieldId:"",
  //             actionType:"",
  //             label:""
  //           }]
  //         }]
  //       }
  //     },
  //   };
  // }

  getListLayout() {
    axios.get(`http://127.0.0.1:3001/api/modelling/layout`)
      .then(res => {
        let datas = res.data;
        this.setState({
          isFetching: true,
          data: datas,
        });
      })
      .catch(error => {
        this.setState({
          isFetching: false,
          error,
        });
      });
  }

  
  renderFeild(type) {
    console.log(`type`, type)
    if (type === 'field') {
      return (
          <div>type</div>
          
      )
    } else {
      return (
        <div>
          {/* <input type={type}> hahahah</input> */}
        </div>
      );
    }
  }


  async componentDidMount() {
    await this.getListLayout();
  }


  render() {
    const { error, isFetching, data } = this.state;
    // console.log(data);
    // console.log(data.header.rows[0]);
    if (error) {
      return <span>Can not get layput data: {error.message}</span>;
    } else if (!isFetching) {
      return <span>Getting Data...</span>;
    } else {
      const allLayout = data.header.rows.map((rows, index) => <DisplayLayout key={index} rows={rows} />);
      return (
        <div>
          {
            data.header.rows.map((rowsCol, index) => 
                rowsCol.columns.map((rowsColItem) => 
                  this.renderFeild(rowsColItem.type)
                )
            )
          }
          <div>asdasd</div>
        </div>
      );
    }
  }
}

export default LayoutServices;
