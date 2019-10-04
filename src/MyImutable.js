import React from 'react';
import {Map,fromJS,is,List} from 'immutable'

export default class MyImutable extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            rows: fromJS([
                {id: 0, platform: '11', cars: [{id: 0, num: '1'}, {id: 1, num: '2'}, {id: 2, num: '3'}]}
            ])
        }

    }
    addCar=(idx)=>{
        console.log(this.state.rows.toJS())
      const rows = this.state.rows.update(idx,(value)=>{
          console.log(value);
          return value.set('cars',value.get('cars').push(fromJS({id:value.get('cars').size===0?0:value.get('cars').last().get('id')+1,num:''})))
      })
      this.setState({rows:rows});
    }

    addRow=()=>{
      const {rows} = this.state;
      this.setState({rows:rows.push(fromJS({id:rows.size===0?0:rows.last().get('id')+1,platform:'',cars:[]}))});
    }

    deleteRow=(idx)=>{
      this.setState({rows:this.state.rows.delete(idx)});
    }

    deleteCarRow=(idx,carId)=>{
        const rows = this.state.rows.update(idx,(value)=>{
            if(value.get('cars').size > 1){
                value = value.set('cars',value.get('cars').delete(carId));
            }
            return value;
        })
        this.setState({rows:rows});
    }

    changeInput=(e,idx)=>{
        const rows = this.state.rows.update(idx,(value)=>{
            return value.set('platform',e.target.value);
        })
        this.setState({rows:rows});
    }

    changeCar=(e,idx,carIdx)=>{
        const rows = this.state.rows.update(idx,(value)=>{
            return value.set("cars",value.get('cars').update(carIdx,(value1)=>{
                return value1.set('num',e.target.value)
            }));
        });
        console.log(rows.toJS());
        this.setState({rows:rows});
        /*
        this.setState({
            rows:this.state.rows.map((info,idx1)=>idx ===idx1?
                {
                    ...info,cars:info.cars.map((car,carIdx1)=>carIdx1 === carIdx?{
                        ...car,num:e.target.value
                    }:car)
                }
                :info)
        })
         */
    }

  render() {
    const {rows:r} = this.state;
    const rows = r.toJS();
    console.log(rows);
    return (
        <div className='container border'>
            {
                rows.map((row,idx)=>{
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

