import React from 'react';
import { connect } from 'react-redux';
import { Sodo, newgame, selecteditem, keyboardmove } from '../actions';
import { StoreState } from '../reducers';
import 'antd/dist/antd.css';
import { Button, Result, Col } from 'antd';
import '../assets/styles/game.scss';
const style = { background: '#023', padding: '8px 0' };

interface AppProps {
  SoDos: Sodo;

  newgame: typeof newgame;
  selecteditem: typeof selecteditem;
  keyboardmove: typeof keyboardmove;
}

interface AppState {
  move: number;
  result: string;
}

class game extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { move: 0, result: 'Not Win Yet "Kale Kiri"' };
    this.onKeyPressed = this.onKeyPressed.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPressed);
  }

  onKeyPressed = (e: any) => {
    this.props.keyboardmove(this.props.SoDos, e.keyCode);
    this.setState({ move: this.props.SoDos.move });
    if (this.props.SoDos.result) {
      this.setState({ result: 'You Win bitch' });
    } else {
      this.setState({ result: 'Not Win Yet "Kale Kiri"' });
    }
  };
  onItemClick = (id: number, SoDo: Sodo): void => {
    this.props.selecteditem(id - 1, SoDo);
    this.setState({ move: this.props.SoDos.move });
    if (this.props.SoDos.result) {
      this.setState({ result: 'You Win bitch' });
    } else {
      this.setState({ result: 'Not Win Yet "Kale Kiri"' });
    }
  };
  gameBoard(SoDo: Sodo): JSX.Element[] {
    return this.props.SoDos.id.map((id) => {
      if (SoDo.title[id - 1] !== 0) {
        return (
          <Col key={id} span={6}>
            {SoDo.title[id - 1]}
          </Col>
        );
      } else {
        return (
          <Col key={id} span={6} style={style}>
            {' '}
          </Col>
        );
      }
    });
  }
  onNewGameClick = (SoDo: Sodo): void => {
    this.props.newgame(SoDo);
    this.setState({ move: 0 });
  };
  render() {
    return (
      <div>
        <div
          className="gameBoard"
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
            this.onKeyPressed(event)
          }
        >
          {this.gameBoard(this.props.SoDos)}
        </div>
        <div className="game">
          <Button
            type="primary"
            onClick={() => this.onNewGameClick(this.props.SoDos)}
          >
            NEW GAME
          </Button>
          <div>Move By Pofiu={this.state.move}</div>
          <Result title={this.state.result} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ SoDos }: StoreState): { SoDos: Sodo } => {
  return { SoDos };
};

export const Game = connect(mapStateToProps, {
  newgame,
  selecteditem,
  keyboardmove,
})(game);
