# Kyoryu No Go - client

[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/goffreder/kyoryu-no-go-client/master)](https://stryker-mutator.github.io)

A basic React/Redux implementation for the game of Go, and a good excuse to exercise with Firebase, sockets and tests (aiming for 100% coverage, yay!).

Credits to:
- [React beginner tutorial: implementing the board game Go](http://cjlarose.com/2014/01/09/react-board-game-tutorial.html) by [Chris LaRose](http://cjlarose.com/) for the vanilla React implementation and tutorial.
- [Andrew Hyndman](https://github.com/ajhyndman) for the [great visuals](http://ajhyndman.github.io/go-react-redux-elm/react-redux/).

## TODO
- [ ] Fix percentile box-shadow for stones (either we use `react-dimensions` - which is unmaintained - and we fail the relevant test, or we use a fixed width and we lose in responsiveness)
- [ ] Fix calculation for stars (19x19 looks good, 9x9 doesn't)
