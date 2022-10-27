import { useState, Component } from "react";
import styles from "../styles/Game.module.css";

const initialState = {
  name: null,
  totalPoints: 0,
  clicks: 0,
  showSubmitScoreForm: false,
  leaderboard: [],
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  fetchLeaderboard = async () => {
    const res = await fetch("/api/leaderboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const scores = await res.json();

    if (Array.isArray(scores)) {
      this.setState({
        ...this.state,
        leaderboard: scores.slice(0, 10),
      });
    }
  };

  componentDidMount = () => {
    this.fetchLeaderboard();
  };

  submitScore = (e) => {
    e.preventDefault();
    fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPoints: this.state.totalPoints,
        clicks: this.state.clicks,
        name: this.state.name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw "Error submitting the score. Please try again later.";
        }
      })
      .then(() => {
        this.fetchLeaderboard();
        this.resetState();
      })
      .catch((e) => {
        alert(e);
      });
  };

  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };

  roll = () => {
    if (this.isAttemptAllowed()) {
      this.setState({
        ...this.state,
        clicks: this.state.clicks + 1,
        totalPoints: this.state.totalPoints + this.calculateNextAttempt(),
      });
    }
  };

  calculateNextAttempt = () => {
    const max = 100;
    const min = -100;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  isAttemptAllowed = () => {
    return this.state.clicks < 10;
  };

  showSubmitScoreForm = () => {
    this.setState({
      ...this.state,
      showSubmitScoreForm: true,
    });
  };

  resetState = () => {
    this.setState({ ...initialState, leaderboard: this.state.leaderboard });
  };

  render() {
    return (
      <>
        <div className={styles.text}>
          Total points:{" "}
          <span data-cy="totalPoints">{this.state.totalPoints}</span>
        </div>
        <div className={styles.text}>Clicks: {this.state.clicks} / 10</div>

        {!this.state.showSubmitScoreForm && (
          <div className={styles.verticalContainer}>
            <button
              className={styles.button}
              type="button"
              onClick={this.roll}
              disabled={!this.isAttemptAllowed()}
            >
              Attempt
            </button>
            <div className={styles.horizontalContainer}>
              <button
                className={styles.button}
                type="button"
                onClick={this.showSubmitScoreForm}
                disabled={this.state.clicks == 0}
              >
                Submit score
              </button>
              <button
                className={styles.button}
                type="button"
                onClick={this.resetState}
                disabled={this.state.clicks == 0}
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {this.state.showSubmitScoreForm && (
          <form
            onSubmit={this.submitScore}
            className={styles.verticalContainer}
          >
            <input
              className={styles.nameInput}
              onChange={this.handleNameChange}
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
            <div className={styles.formActions}>
              <button type="submit" className={styles.button}>
                Submit
              </button>
            </div>
          </form>
        )}

        <div className={styles.container}>
          <h2>Leaderboard</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Clicks</th>
                <th>Total points</th>
                <th>Average points</th>
              </tr>
            </thead>
            <tbody>
              {this.state.leaderboard.map((score, index) => (
                <tr key={index} data-cy={score.name}>
                  <td>{score.name}</td>
                  <td>{score.clicks}</td>
                  <td>{score.totalPoints}</td>
                  <td>{Number(score.totalPoints) / Number(score.clicks)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Game;
