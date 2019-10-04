import React from 'react';

export default class App extends React.Component {

    state = {
        rows:[
            {id:0,platform:'11',cars:[{id:0,num:'1'},{id:1,num:'2'},{id:2,num:'3'}]}
        ]
    }

    addCar=(idx)=>{
      const {rows} = this.state;
      const row = rows[idx];
      let id = 0;
      const cars = [...row.cars];
      if(row.cars.length > 0) {
          id= row.cars[row.cars.length-1].id+1;
          cars.push({id,num:''});
      }else {
          cars.push({id:0,num:''});
      }
      this.setState({
          rows: rows.map((info, idx_) => idx_ === idx ? ({id: row.id, platform: row.platform, cars}) : info)
      });
    }

    addRow=()=>{
      const {rows} = this.state;
      let idx = 0;
      if(rows.length > 0) {
          idx= rows[rows.length-1].id+1;
      }
      const newRows = [...rows];
      newRows.push({id:idx,platform:'',cars:[]});
      this.setState({rows:newRows});
    }

    deleteRow=(idx)=>{
      this.setState({
          rows: this.state.rows.filter((info,i)=>i!==idx)
      });
    }

    deleteCarRow=(idx,carId)=>{
        if(this.state.rows[idx].cars.length>1){
            this.setState({
                rows: this.state.rows.map((info,i)=>i!==idx?info:
                    {...info,cars:info.cars.filter((car,cIdx)=>cIdx!==carId)}
                )
            });
        }
    }

    changeInput=(e,idx)=>{
        this.setState({
            rows:this.state.rows.map((info,idx1)=>idx ===idx1?{
                ...info,platform:e.target.value
            }:info)
        })
    }

    changeCar=(e,idx,carIdx)=>{
        this.setState({
            rows:this.state.rows.map((info,idx1)=>idx ===idx1?
                {
                    ...info,cars:info.cars.map((car,carIdx1)=>carIdx1 === carIdx?{
                        ...car,num:e.target.value
                    }:car)
                }
                :info)
        })
    }

  render() {
    return (
        <div className='container border'>
            {
                this.state.rows.map((row,idx)=>{
                    return (
                        <div className='row border' key={row.id}>
                            <div className="col-3">{row.id}</div>
                            <div className='col-3 border'>
                                <div className='form-group'>
                                    <input type="text" className='form-control' value={row.platform} onChange={(e)=>this.changeInput(e,idx)}/>
                                </div>
                            </div>
                            <div className='col-3 border'>
                                {
                                    row.cars.map((car,carId)=>{
                                        return (
                                            <div className="row" key={car.id}>
                                                <div className='form-inline'>
                                                    <input type='text' className='form-control' value={car.num} onChange={(e)=>this.changeCar(e,idx,carId)}/>
                                                    <button type="button" className="btn btn-primary" onClick={()=>this.deleteCarRow(idx,carId)}>X</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="row">
                                    <button className="btn btn-primary" onClick={()=>this.addCar(idx)}>ADD</button>
                                </div>
                            </div>
                            <div className="col-3">
                                <button className="btn btn-primary" onClick={()=>this.deleteRow(idx)}>삭제</button>
                            </div>
                        </div>
                    )
                })
            }
            <div className="row border">
                    <button className='btn btn-primary' onClick={this.addRow}>ADD</button>
            </div>
        </div>
    );
  }
}

