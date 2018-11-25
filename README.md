Contract mimics that of the Prisoners's Dilemma

The contract can dynamically be set for the following scoring parameters:
- Winning Score: The score that terminates the game once a player or players has >= to that score
- Greedy Points: The score awarded to the player that 'takes' if another player 'shares'
- Mutual Points: The score awarded to both players if they both 'share'
- Mutual Greedy Points: The score awarded to both players if they both 'take'

```
+----------+----------------------+
|          |       Player 2       |
+----------+----------------------+
|          |       | Share | Take |
+          +-------+-------+------+
| Player 1 | Share | 1/1   | 5/0  |
+          +-------+-------+------+
|          | Take  | 0/5   | 0/0  |
+----------+-------+-------+------+
```
Example:
- Winning Score = 20, Greedy Points = 5, Mutual Points = 1, Mutual Greedy Points = 0
- If two players 'share' they both receive 1 point and the game progresses
- If two players 'take', they both receive 0 points and the game doesn't progress
- If either one of the players 'takes' while the other player 'shares', the person who 'shared' will receive no points while the person who 'takes' will receive 5 points
- Game ends when one of the players obtain the winning score of 20 points
- If a tie occurs no players win, the contract winner is the contract itself.
