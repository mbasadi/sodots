import React from 'react';
import { connect } from 'react-redux';
import { Sodo, newgame, selecteditem } from '../actions';
import { StoreState } from '../reducers';
import '../assets/styles/game.scss';

interface AppProps {
  Sodos: Sodo;

  newgame: typeof newgame;
  selecteditem: typeof selecteditem;
}

interface AppState {
  move: number;
  result: string;
}

class game extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { move: 0, result: 'Not Win Yet "Kale Kiri"' };
  }
  onItemClick = (id: number, sodo: Sodo): void => {
    this.props.selecteditem(id - 1, sodo);
    this.setState({ move: this.props.Sodos.move });
    if (this.props.Sodos.result) {
      this.setState({ result: 'You Win bitch' });
    }
  };
  gameBoard(sodo: Sodo): JSX.Element[] {
    return this.props.Sodos.id.map((id) => {
      return (
        <div
          className="card"
          key={id}
          onClick={() => this.onItemClick(id, sodo)}
        >
          {sodo.title[id - 1]}
        </div>
      );
    });
  }
  onNewGameClick = (sodo: Sodo): void => {
    this.props.newgame(sodo);
    this.setState({ move: 0 });
  };
  render() {
    return (
      <div>
        <div className="gameBoard">{this.gameBoard(this.props.Sodos)}</div>
        <div className="game">
          <div onClick={() => this.onNewGameClick(this.props.Sodos)}>
            New Game Pofiuz
          </div>
          <div>Move By Pofiu={this.state.move}</div>
          <div>result Pofiuz={this.state.result}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Sodos }: StoreState): { Sodos: Sodo } => {
  return { Sodos };
};

export const Game = connect(mapStateToProps, { newgame, selecteditem })(game);
