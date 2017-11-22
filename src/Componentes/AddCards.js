import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import { addCard, addBoard, addList } from '../actions';
class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false
    }
  }
  render() {
    const { list, board, card, IdBoard } = this.props;
    const funcion = list ? addList : board ? addBoard : addCard;
    const parametro = board ? '' : list ? list : card;
    const NewState = () => {
      this.setState({
        add: !this.state.add
      })
    }
    return (
      <div className={list ? 'list' : ''}>
        {
          this.state.add ?
            <div className={list || board ? 'box' : ''}>
              <form onSubmit={(e) => {
                e.preventDefault();
                card ? funcion(this.input.value, IdBoard, parametro) : funcion(this.input.value, parametro);
                NewState();
              }}>
                <FormGroup>
                  <FormControl
                    componentClass="textarea"
                    placeholder="New List"
                    inputRef={ref => { this.input = ref; }}
                    onKeyDown={(e) => {
                      if (board && e.keyCode === 13) {
                        funcion(this.input.value, parametro);
                        NewState();
                      }
                    }}
                    required />
                </FormGroup>
                <div>
                  <Button type='submit' >{list ? 'Save List' : board ? 'Create Board' : 'Add'}</Button>
                  or <span className='cancel' onClick={NewState}>cancel</span>
                </div>
              </form>

            </div>
            :
            <div className={list || board ? 'box addNew' : 'addNew'} onClick={NewState}>
              "New Boards"
            </div>
        }
      </div>
    )
  }
}

export default AddButton;