# Kyoryu No Go - client

[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/goffreder/kyoryu-no-go-client/master)](https://stryker-mutator.github.io)

A basic React/Redux implementation for the game of Go, and a good excuse to exercise with Firebase, sockets and tests (aiming for 100% coverage, yay!).

Credits to:
- [React beginner tutorial: implementing the board game Go](http://cjlarose.com/2014/01/09/react-board-game-tutorial.html) by [Chris LaRose](http://cjlarose.com/) for the vanilla React implementation and tutorial.
- [Andrew Hyndman](https://github.com/ajhyndman) for the [great visuals](http://ajhyndman.github.io/go-react-redux-elm/react-redux/).
- And of course to [Create React App](https://github.com/facebook/create-react-app) for everything else.

## Unit Tests
    Test Suites: 14 passed, 14 total
    Tests:       72 passed, 72 total
    Snapshots:   15 passed, 15 total

## Code Coverage
    -----------------------|----------|----------|----------|----------|-------------------|
    File                   |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
    -----------------------|----------|----------|----------|----------|-------------------|
    All files              |      100 |      100 |      100 |      100 |                   |
     actions               |      100 |      100 |      100 |      100 |                   |
      board.js             |      100 |      100 |      100 |      100 |                   |
     components            |      100 |      100 |      100 |      100 |                   |
      ActiveColor.js       |      100 |      100 |      100 |      100 |                   |
      App.js               |      100 |      100 |      100 |      100 |                   |
      Board.js             |      100 |      100 |      100 |      100 |                   |
      BoardIntersection.js |      100 |      100 |      100 |      100 |                   |
      BoardMessage.js      |      100 |      100 |      100 |      100 |                   |
      BoardSelector.js     |      100 |      100 |      100 |      100 |                   |
      Captured.js          |      100 |      100 |      100 |      100 |                   |
      PassButton.js        |      100 |      100 |      100 |      100 |                   |
      ResetBoardButton.js  |      100 |      100 |      100 |      100 |                   |
      Stone.js             |      100 |      100 |      100 |      100 |                   |
     reducers              |      100 |      100 |      100 |      100 |                   |
      board.js             |      100 |      100 |      100 |      100 |                   |
      index.js             |      100 |      100 |      100 |      100 |                   |
    -----------------------|----------|----------|----------|----------|-------------------|

## Mutation Score

I'm just mutating reducers/selectors and action creators. Since visual components have too many mutation points (css properties, classes, etc...), it made no sense to me to test them with mutations.

    Ran 50.55 tests per mutant on average.
    ------------------|---------|----------|-----------|------------|----------|---------|
    File              | % score | # killed | # timeout | # survived | # no cov | # error |
    ------------------|---------|----------|-----------|------------|----------|---------|
    All files         |   98.40 |      168 |        17 |          3 |        0 |       0 |
     reducers         |   98.34 |      162 |        16 |          3 |        0 |       0 |
      board.js        |   98.31 |      160 |        15 |          3 |        0 |       0 |
      index.js        |  100.00 |        2 |         1 |          0 |        0 |       0 |
     actions/board.js |  100.00 |        6 |         1 |          0 |        0 |       0 |
    ------------------|---------|----------|-----------|------------|----------|---------|
