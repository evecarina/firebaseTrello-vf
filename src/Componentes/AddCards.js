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
    const { list, board, card, boardId } = this.props;
    const funcion = list ? addList : board ? addBoard : addCard;
    const parametro = board ? '' : list ? list : card;
    const change = () => {
      this.setState({
        add: !this.state.add
      })
    }
    const holder = list ? 'Add a New List...' : board ? 'Board Name' : '';
    const message = list ? 'Add a New List...' : board ? 'Add new board...' : 'Add a New Card...';
    return (
      <div className={list ? 'list' : ''}>
        {
          this.state.add ?
            <div className={list || board ? 'box' : ''}>
              <form onSubmit={(e) => {
                e.preventDefault();
                card ? funcion(this.input.value, boardId, parametro) : funcion(this.input.value, parametro);
                change();
              }}>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl
                    componentClass="textarea"
                    placeholder={holder}
                    inputRef={ref => { this.input = ref; }}
                    onKeyDown={(e) => {
                      if (board && e.keyCode === 13) {
                        funcion(this.input.value, parametro);
                        change();
                      }
                    }}
                    required />
                </FormGroup>
                <div>
                  <Button type='submit' >{list ? 'Save List' : board ? 'Create Board' : 'Add'}</Button>
                  or <span className='cancel' onClick={change}>cancel</span>
                </div>
              </form>

            </div>
            :
            <div className={list || board ? 'box addNew' : 'addNew'} onClick={change}>
              {message}
            </div>
        }
      </div>
    )
  }
}

export default AddButton;