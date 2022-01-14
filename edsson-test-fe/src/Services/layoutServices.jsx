import { Component } from "react";
class LayoutServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:3001/api/modelling/layout",{
        method: 'GET',
        mode:"no-cors"
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isFetching: true,
            data: result.data,
          });
        },
        (error) => {
          this.setState({
            isFetching: false,
            error,
          });
        }
      );
  }
  render() {
    const { error, isFetching, data } = this.state;
    console.log(error);
    if (error) {
      return <span>Can not get layput data: {error.message}</span>;
    } else if (!isFetching) {
      return <span>Getting Data...</span>;
    } else {
      return (
        <div>
          {data.header.map((headerItem) => {
            headerItem.rows.map((rowsCol) => {
              <div>
                {/* get first row data */}
                {rowsCol[0].map((rowsColItem) => {
                  <div>{rowsColItem.fieldId}</div>;
                })}
                {/* get second row data, here are the action button*/}

                {rowsCol[1].map((rowsColItem) => {
                  <div>
                      <input type={rowsColItem.type}>{rowsColItem.label}</input>
                  </div>;
                })}
              </div>;
            });
          })}
        </div>
      );
    }
  }
}

export default LayoutServices;
