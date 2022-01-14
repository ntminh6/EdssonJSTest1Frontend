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
            label: "",
          }]
        }]
      }
    },
    isFetchingDocDef: false,
    dataDocDef: {
      fields: [{
        _id: "",
        label: "",
        name: "",
        type: "",
        maxLength: 0
      }]
    }
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
  getListDocumentDefine() {
    axios.get(`http://127.0.0.1:3001/api/modelling/document-definitions`)
      .then(res => {
        let datas = res.data;
        this.setState({
          isFetchingDocDefg: true,
          dataDocDef: datas,
        });
      })
      .catch(error => {
        this.setState({
          isFetchingDocDefg: false,
          error,
        });
      });
  }


  renderFeild(colObject) {
    console.log(`colObject`, colObject)
    if (colObject.type === 'field') {
      return (
        <div>colObject.type</div>
      )
    } else {  
      return (
        <div>
          <input type={colObject.type} id="btnType" value={colObject.label}></input>
        </div>
      );
    }
  }


  async componentDidMount() {
    await this.getListLayout();
    await this.getListDocumentDefine();
  }


  render() {
    const { error, isFetching, data } = this.state;
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
                this.renderFeild(rowsColItem)
              )
            )
          }
        </div>
      );
    }
  }
}

export default LayoutServices;
